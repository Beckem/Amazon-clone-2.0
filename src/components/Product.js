import Image from 'next/image'
import { useState } from 'react'
import {StarIcon} from '@heroicons/react/solid'
import Currency from 'react-currency-formatter'
import { useDispatch } from 'react-redux';
import {addToBasket} from '../slices/basketSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MAX_RATING = 5;
const MIN_RATING = 1;
function Product({id, title, price, description, category, image}) {
    const dispatch = useDispatch();
    const [rating] = useState(
        Math.floor(Math.random()*(MAX_RATING - MIN_RATING+1)) + MIN_RATING
    )

    const [hasPrime] = useState(Math.random()<0.5)

    const addItemToBasket = ()=>{
        const product ={
            id, title, rating, price, description, category, image, hasPrime, quantity:-1
        }
        
        //sending the product as an action to REDUX store... the basket slice
        dispatch(addToBasket(product))
        
        toast("Product added successfully!");
    }
    return (
        <div className="relative flex flex-col m-5 bg-white z-30 p-10">
            <p className="absolute top-2 right-2 text-sm italic text-gray-400">{category}</p>

            <Image src={image} height={200} width={200} objectFit="contain"/>

            <h4 className="my-3">{title}</h4>

            <div className="flex">
                {Array(rating).fill().map((_,i)=>(
                    <StarIcon key={i} className="h-5  text-yellow-500"/>
                ))}
            </div>
            <p className="text-xs my-2 line-clamp-2">{description}</p>
            
            <div className="mb-5">
                <Currency quantity={price} currency="USD"/>
            </div>

            {hasPrime && (
                <div className="flex items-center space-x-2 -mt-5">
                    <img className="w-12" src="https://links.papareact.com/fdw" alt=""/>
                    <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
                </div>
            )}

            <button onClick={addItemToBasket} className="mt-auto button">Add to Basket</button>
            <ToastContainer autoClose={3000} />
        </div>
    )
}

export default Product
