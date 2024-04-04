import React from 'react'

const Drop = ({
    currencies,
    currency,
    setCurrency,
    title = " "
}) => {
  return (
    <div>
        <label title= {title}>{title}</label>
        <div>
            <select value = {currency} onChange={((e) => setCurrency(e.target.value))}className=' w-full p-2 focus:outline-none'>
            {currencies.map((currency) => {

                return(
                <option key={currency} value={currency}>
                    {currency}
                </option>
                 
                
                )
            })}
      </select>
      </div>
    </div>
  )
}

export default Drop