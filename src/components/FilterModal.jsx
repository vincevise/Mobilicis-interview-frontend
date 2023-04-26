import React, { memo, useState } from 'react'
import RangeSlider from './ReactSlider';

// Modal for Income and Phone Price range filter
const FilterModal = ({refresh}) => {

    const [phoneprice, setPhoneprice] = useState(0);
    const [income, setIncome] = useState(0);

  return (
    <div className='absolute flex flex-col gap-2 w-72 min-h-48 bg-white z-10 left-0 mt-1 shadow-lg px-3 py-4 rounded-md border border-slate-100'> 
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