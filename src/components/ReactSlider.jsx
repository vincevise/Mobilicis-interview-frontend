import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const RangeSlider = ({ min, max, step, value, onChange, refresh, title, name }) => {

    const [sliderValue, setSliderValue] = useState(value);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const location = useLocation(); 

    useEffect(()=>{
        setSliderValue(0) 
        onChange(0)
        console.log(refresh)
    },[refresh])

    const params = useMemo(() => {
        const getsearchParams = new URLSearchParams(location.search);
        const params = {};
        for (let [key, value] of getsearchParams.entries()) {
            if(value > 0){
                params[key] = value;
            }
        }
        return params;
    }, [location.search]);
    
    const handleSliderChange = (e) => {
        const newValue = parseInt(e.target.value);  
 

        setSearchParams({...params,[name]:newValue})   

        setSliderValue(newValue);
    
        if (onChange) {
            onChange(newValue);
        }
    };

    

    const handleSliderMouseEnter = () => {
        setTooltipVisible(true);
    };

    const handleSliderMouseLeave = () => {
        setTooltipVisible(false);
    };

  return (
    <div style={{ position: "relative" }} className="w-full  rounded-md  " > 
      {tooltipVisible && (
        <div
          style={{
            position: "absolute",
            top: "-10px",
            left: `${(sliderValue / max) * 100}%`,
            transform: "translateX(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "#fff",
            borderRadius: "4px",
            padding: "4px 8px",
            fontSize: "14px",
          }}
        >
          {sliderValue}
        </div>
      )}
        <span className="mb-2 font-semibold">{title}</span>
        <input
            className="w-full cursor-pointer"
            type="range"
            min={min}
            max={max}
            step={step}
            value={sliderValue}
            onChange={handleSliderChange}
            onMouseEnter={handleSliderMouseEnter}
            onMouseLeave={handleSliderMouseLeave}
            style={{ zIndex: "1" }}
        />
        <input
            type="text"
            readOnly
            value={`< ${value}`}
            className="border border-slate-300 w-20 px-2 align-right"
        /> 
    </div>
  );
};

export default RangeSlider;
