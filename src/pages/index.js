import { getSession } from "next-auth/client";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import { addToBasket, selectItems } from "../slices/basketSlice";

export default function Home({products, session}) {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  useEffect(()=>{
    const storedBasket = JSON.parse(localStorage.getItem('Basket_Amazon'));
    // console.log(storedBasket);

    if (items.length == 0){
      storedBasket?.map((item)=>{
        dispatch(addToBasket(item));
      })
    }
    
  },[])
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      
      <Header/>

      <main className="max-w-screen-2xl mx-auto">
        <Banner/>

        <ProductFeed products={products}/>
      </main>
    </div>


  );
}

export async function getServerSideProps(context){
  const session = await getSession(context);
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res)=>res.json()
  );
  return {
    props:{
      products,
      session
    }
  }
}