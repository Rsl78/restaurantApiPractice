import React from 'react';
import {baseUrl} from "../utilis/webinfo";
import { Card } from 'primereact/card';
interface Props{
    name: string;
    imgUrl: string;
    description: string;
    id: number;
    onSetCategoryWiseData(categoryId: number ): void

}
const CategoryCard = ({name, imgUrl, description, id, onSetCategoryWiseData}: Props) => {
    return (
        <div >
            <div onClick={() =>onSetCategoryWiseData(id)} className=" p-3 column-gap-3   align-items-center shadow-2 border-round-md flex  h-8rem w-20rem ">
                <img className={"h-5rem w-5rem"} alt="Card" src={`${baseUrl.url}/${imgUrl}`} />
                <div className="">
                    <h5>{name}</h5>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;