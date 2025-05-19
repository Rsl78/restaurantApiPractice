import React from 'react';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import {baseUrl} from "../utilis/webinfo";
import {Chip} from 'primereact/chip';

// import { Button } from 'primereact/button';
interface ItemCardProps {
    onShowModal(selectedFoodId: SelectedItem): void,

    item: {
        id: number;
        description: string;
        food_photo_url: string;
        cooking_time: number;
        name: string;
        contains_size_list?: {
            discount_amount: number,
            food_item_id: number,
            id: number,
            price: number,
            size: string,
        }[];
    }
}

interface SelectedItem {
    id: number;
    description: string;
    food_photo_url: string;
    cooking_time: number;
    name: string;
    contains_size_list?: {
        discount_amount: number,
        food_item_id: number,
        id: number,
        price: number,
        size: string,
    }[];
}


export default function ItemCard({item, onShowModal}: ItemCardProps) {
    console.log(item)
    const {description, name, food_photo_url, cooking_time, contains_size_list = []} = item
    const [{price} = {price: 0}] = contains_size_list
    const header = (
        <img className={"h-15rem"} alt="Card" src={`${baseUrl.url}/${food_photo_url}`}/>
    );

    return (
        <div className=" flex justify-content-center ">
            <Card header={header} className="md:w-25rem  ">
                <div className={"h-13rem flex flex-column "}>
                    <h5>{name}</h5>
                    <div className="flex align-items-center justify-content-between pb-5">
                        <Chip className={"bg-blue-100"} label={`${cooking_time} min`} icon={"pi pi-clock"}/>
                        <Chip className={"bg-green-100"} label={`${price} bdt`} icon={"pi pi-money-bill"}/>
                    </div>
                    <p className="m-0 text-600 font-medium line-height-3">
                        {description}
                    </p>
                </div>
                <div className={"flex  justify-content-center"}>
                    <Button className={"mt-5, w-full "} onClick={() => onShowModal(item)} label="Show Details"
                            severity="info" rounded outlined={true}/>
                </div>

            </Card>
        </div>
    )
}
