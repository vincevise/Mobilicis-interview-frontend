import React from 'react'

let names = {
    'getUsers':'All',
    'question1':`Users which have income lower than $5 USD and have a car of brand
    "BMW" or "Mercedes`,
    'question2':`Male Users which have phone price greater than 10,000.`,
    'question3':`Users whose last name starts with “M” and has a quote character length
    greater than 15 and email includes his/her last name.`,
    'question4':`Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose
    email does not include any digit.`

}

const FilterChips = ({apiRoute, handleClick, apiReq}) => {

  return (
    <button
    onClick={handleClick}
    data-api={apiRoute}
    className={`border  px-4 py-1 rounded-full ${
      apiReq === apiRoute ? "border-blue-500 bg-blue-500 text-white" : "border-slate-600 text-slate-600"
    }`}
  >
    {names[apiRoute]}
  </button>
  )
}

export default FilterChips