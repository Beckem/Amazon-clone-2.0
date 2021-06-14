import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import CheckoutProduct from "../components/CheckoutProduct"
import Header from "../components/Header"
import { addToBasket, selectItems, selectQuantity, selectTotal } from "../slices/basketSlice"
import Currency from "react-currency-formatter"
import { useSession } from "next-auth/client"
import {loadStripe} from "@stripe/stripe-js"
import axios from "axios"
import { useEffect } from "react"
const stripePromise = loadStripe(process.env.stripe_public_key)
function Checkout() {
    const dispatch = useDispatch();
    const items = useSelector(selectItems)
    const total = useSelector(selectTotal)
    const totalQuantity = useSelector(selectQuantity);
    const [session]=useSession();
    useEffect(()=>{
        const storedBasket = JSON.parse(localStorage.getItem('Basket_Amazon'));
        // console.log(storedBasket);
    
        if (items.length == 0){
          storedBasket?.map((item)=>{
            dispatch(addToBasket(item));
          })
        }
        
      },[])
    const createCheckoutSession = async()=>{
        const stripe = await stripePromise;

        //Clear storage
        localStorage.removeItem('Basket_Amazon');
        //Call the backend to create a checkout session...
        const checkoutSession = await axios.post('/api/create-checkout-session', 
        {
            items: items, 
            email:session.user.email
        })

        //Redirect user/customer to Stripe Checkout
        const result = await stripe.redirectToCheckout({
            sessionId:checkoutSession.data.id
        })
        if (result.error) alert(result.error.message)
        
    }
    return (
        <div className="bg-gray-100">
            <Header/>

            <main className="lg:flex max-w-screen-2xl mx-auto">
                {/* Left */}
                <div className="flex-grow m-5 shadow-sm">
                    <Image
                        src="https://links.papareact.com/ikj"
                        width={1020}
                        height={250}
                        objectFit="contain"
                    />

                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <h1 className="text-3xl border-b pb-4">
                            {items.length === 0 ? 'Your Amazon Basket is empty.':"Shopping Basket"}
                        </h1>

                        {items.map((item, i)=>(
                            <CheckoutProduct
                                key={i}
                                id={item.id}
                                title={item.title}
                                rating={item.rating}
                                price={item.price}
                                description={item.description}
                                category={item.category}
                                image={item.image}
                                hasPrime={item.hasPrime}
                                quantity={item.quantity}
                            />
                        ))}
                    </div>
                </div>
                {/* Right */}
                <di className="flex flex-col bg-white p-10 shadow-md">
                        {items.length > 0 && (
                            <>
                                <h2 className="whitespace-nowrap">Subtotal ({totalQuantity} items):{' '}
                                    <span className="font-bold">
                                        <Currency quantity={total} currency="USD"/>
                                    </span>
                                </h2>
                                <button
                                    onClick={createCheckoutSession}
                                    role="link"
                                    disabled={!session} 
                                    className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                                    {!session? 'Sign in to checkout': 'Proceed to checkout'}
                                </button>
                            </>
                        )}
                </di>
            </main>
        </div>
    )
}

export default Checkout
