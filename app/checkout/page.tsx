'use client'
import axios from "axios";
import { useState } from "react";
// import { Clothes } from "../components/datatypes";
import {loadStripe} from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_51OximYSBnrUlVANBpDrKw2qt87nI89sTE14IwAH8YZnUVC3EHGrfVHE0UzeGq7II2b8BwukuLb95xp4XbInmp8by00ytlJHqHP' );

function Checkout(){
      const [result, setResult] = useState()

      async function checkout(){
            try{
                  await stripePromise;
                  const res = await axios.get('/api/checkout')
                  window.location.href = res.data.url;
                  setResult(res.data.message)
            }catch{
                  console.error('server failed')
            }
      }
      return <>
            <button onClick={checkout} className="p-3 border block mx-auto border-red-500 rounded-md hover:bg-gray-950">checkout</button>
           <div>{result}</div>
      </>
}

export default Checkout;