import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';

interface ContainsSizeList {
    discount_amount:number,
    food_item_id: number,
    id: number,
    price: number,
    size: string,
}
interface FoodList {
    id: number,
    description: string,
    food_photo_url: string,
    cooking_time: number,
    name: string,
    contains_size_list?: any
}

const FoodsContainer =({foodLists}:{foodLists:FoodList[]})=> {
    console.log("foodLists", foodLists);

    const [foodList, setFoodList] = useState<FoodList[]>([]);

    // useEffect(() => {
    //   const newList= foodLists.slice(0, 12)
    //     // console.log('new list: ', newList)
    //     setFoodList(newList);
    // }, []);

    // console.log("after slice", foodList);

    return (
        <div className="card">
            <DataView value={foodList} layout="grid"  paginator rows={12} />
        </div>
    )
}
export default FoodsContainer;