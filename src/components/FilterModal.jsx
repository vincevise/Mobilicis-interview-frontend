import React, { memo, useState } from 'react'
import RangeSlider from './ReactSlider';

const FilterModal = ({refresh}) => {

    const [phoneprice, setPhoneprice] = useState(0);
    const [income, setIncome] = useState(0);

  return (
    <div className='absolute flex flex-col gap-2 w-72 min-h-48 bg-white z-10 left-0 mt-1 shadow-lg px-3 py-4 rounded-md border border-slate-100'>
        {/* <label htmlFor="findCar" className='font-semibold'>Car</label>  */}
        {/* <input id='findCar' type="text" className='p-2 w-full border-2 border-slate-500 rounded-md focus:outline-blue-500 focus:bg-slate-100' placeholder='Car'/>  */}
        <RangeSlider
              min={0}
              max={10}
              step={1}
              value={income}
              onChange={setIncome}
              title={'Income'}
              name={'income'}
              refresh={refresh}
            /> 
        <RangeSlider
              min={0}
              max={100000}
              step={10000}
              value={phoneprice}
              onChange={setPhoneprice}
              title={'Phone Price'}
              name={'phone_price'}
              refresh={refresh}
        /> 
    </div>
  )
}

export default memo(FilterModal)