import React, {useEffect, useState} from 'react';
import CategoryCard from "../components/CategoryCard";
import {baseUrl} from "../utilis/webinfo";
import ItemCard from "../components/ItemCard";
import { Dialog } from 'primereact/dialog';
import {Chip} from "primereact/chip";
// import {Paginator, PaginatorPageChangeEvent} from 'primereact/paginator';
// import FoodsContainer from "../components/FoodsContainer";

interface ContainsSizeList {
    discount_amount: number,
    food_item_id: number,
    id: number,
    price: number,
    size: string,
}
interface SelectedItem{
    id: number;
    description: string;
    food_photo_url: string;
    cooking_time: number;
    name: string;
    contains_size_list?: {
        discount_amount:number,
        food_item_id: number,
        id: number,
        price: number,
        size: string,
    }[];
}
interface FoodList {
    id: number,
    description: string,
    food_photo_url: string,
    cooking_time: number,
    name: string,
    // contains_size_list?: ContainsSizeList[]
    contains_size_list?: any
}

interface FoodCategory {
    id: number;
    name: string;
    description: string;
    categoryphotourl: string;
    food_list: FoodList[];
};
const Home = () => {
    const [foodCategory, setFoodCategory] = useState<FoodCategory[]>([])
    const [filteredFoodLists, setFilteredFoodLists] = useState<FoodList[]>([]);
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [modalData, setModalData] = useState<SelectedItem|null>(null);
    useEffect(() => {
        fetch(`${baseUrl.url}/api/food_category?page=0&size=100`, {
            method: 'GET',
            headers: {
                "Authorization": `${baseUrl.token}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setFoodCategory(data.data.items);
                const foodLists: FoodList[] = data?.data?.items.reduce(
                    (acc: any, category: any) => acc.concat(category.food_list),
                    [] as FoodList[]
                );
                setFilteredFoodLists(foodLists);
            });
    }, []);

    // console.log(foodCategory);

    const handleSetCategoryWiseData =(categoryId: number )=>{
        for(const selectedCategoryData of foodCategory){
          if(selectedCategoryData.id == categoryId){
              setFilteredFoodLists(selectedCategoryData.food_list);
          }
        }
    }

    const handleShowModal = (selectedFood: SelectedItem) =>{
        setVisibleModal(true);
        setModalData(selectedFood)
        console.log(modalData);
    }


    return (
        <div className="card ">
            <h1>Categories</h1>
            <div className={"flex flex-wrap gap-4 py-4"}>
                {
                    foodCategory.map(item => <CategoryCard key={item.id} name={item.name} description={item.description}
                                                           imgUrl={item.categoryphotourl} id={item.id} onSetCategoryWiseData={handleSetCategoryWiseData}/>
                    )
                }
            </div>

            <h1>Food Items</h1>
            <div className={"flex flex-wrap gap-4 py-4"}>
                {
                    filteredFoodLists.length> 0 ?
                        filteredFoodLists.map(foodItem => <ItemCard key={foodItem.id} item={foodItem} onShowModal={handleShowModal}  />)
                        : <h5>No Food Items Found</h5>

                    // filteredFoodLists.map(foodItem => <ItemCard key={foodItem.id} item={foodItem} onShowModal={handleShowModal}  />)
                }
            </div>

            <Dialog  visible={visibleModal} maximizable onHide={() => {if (!visibleModal) return; setVisibleModal(false); }}>
                <img className={"h-20rem border-round-lg"} alt="Card" src={`${baseUrl.url}/${modalData?.food_photo_url}`} />
                <div className={"h-13rem flex flex-column "}>
                    <h5>{modalData?.name}</h5>
                    <div className="flex align-items-center justify-content-between pb-5">
                        <Chip className={"bg-blue-100"} label={`${modalData?.cooking_time} min`} icon={"pi pi-clock"}/>
                        <Chip className={"bg-green-100"} label={`${modalData?.contains_size_list?.[0].price} bdt`} icon={"pi pi-money-bill"}/>
                    </div>
                    <p className="m-0 text-600 font-medium line-height-3">
                        {modalData?.description}
                    </p>
                </div>
            </Dialog>
            {/*<FoodsContainer foodLists={foodLists} />*/}
        </div>
    );
};

export default Home;