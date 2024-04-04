import React, { useEffect, useState } from "react";
import Drop from "./Drop";
import { IoMdSwap } from "react-icons/io";

const CurrencyConvertor = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [convertedAmount, setconvertedAmount] = useState(null)
  const [converting, setconverting] = useState(false)
 

  // currencies -> https://api.frankfurter.app/currencies

  const fetchAllCurrencies = async () => {
    try {
      const response = await fetch(`https://api.frankfurter.app/currencies`);
      const finalData = await response.json();
      setCurrencies(Object.keys(finalData));
    } catch (error) {
      console.log("Error Fetching The Api", error);
    }
  };

  useEffect(() => {
    fetchAllCurrencies();
  }, []);
  // console.log(currencies);

  const convertCurrency = async () => {
  if (!amount) return;
  setconverting(true)
    
    try {
      const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
      const finalData = await response.json();
      setconvertedAmount(finalData.rates[to] + " " + to)
    } catch (error) {
      console.log("Error Fetching The Api", error)
    }finally{setconverting(false)}

  };
  //exchange ->  https://api.frankfurter.app/latest?amount=1&from=USD&to=INR
  function swap (){
    setFrom(to)
    setTo(from)
  }
  return (
    <div className="flex items-center justify-center h-screen bg-slate-300">
      <div className="container max-w-xl mx-auto my-10 p-5 bg-slate-100 rounded-lg shadow-xl text-center">
        <h2 className="text-black mb-5 text-2xl font-semibold">
          Currency converter
        </h2>
        <div className="text-left">
          <Drop currencies={currencies} title="From : " currency = {from} setCurrency={setFrom}/>
          <div className="flex justify-center items-center my-4">
            <button className=" text-4xl text-blue-600 flex items-center justify-center -mb-6" onClick={swap}>
              <IoMdSwap />
              
            </button>
          </div>
          <Drop currencies={currencies} title="To : " currency={to} setCurrency={setTo} />
        </div>
        <div className=" mt-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-start mt-6"
          >
            Amount :{" "}
          </label>
          <input
            type="number"
            className="w-full p-2 border-gray-300 rounded-md shadow-sm focus:outline-none mt-4"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={convertCurrency}
            className= {`bg-blue-500 text-white border rounded-md font-semibold w-full hover:bg-blue-600 p-2 ${converting ? "animate-pulse" : " "}`}
          >
            convert
          </button>
        </div>
        {convertedAmount && (

          <div className=" mt-3 font-mono "> Amount : <span className="text-green-700">{convertedAmount}</span></div>
          
          )}
        </div>
    </div>
  );
};

export default CurrencyConvertor;
