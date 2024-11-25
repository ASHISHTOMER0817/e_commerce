'use client'
import axios from "axios";
import { useState } from "react";
// import { Clothes } from "../components/datatypes";

function Checkout(){
      const [result, setResult] = useState()

      async function getData(){
            try{
                  const res = await axios.get('/api/checkout')
                  setResult(res.data.message)
            }catch{
                  console.error('server failed')
            }
      }
      return <>
            <button onClick={getData} className="p-3 border block mx-auto border-red-500 rounded-md hover:bg-gray-950">getData</button>
           <div>{result}</div>
      </>
}

export default Checkout;