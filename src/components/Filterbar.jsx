import React, { useEffect, useRef, useState } from 'react'
import FilterModal from './FilterModal'
import { VscFilter, VscFilterFilled } from "react-icons/vsc"; 
import FilterChips from './FilterChips';


const Filterbar = ({handleClick, refresh, apiReq}) => {

    const [openFilter,setOpenFilter] = useState(false)
    const filterRef = useRef()
    const modalFilterRef = useRef()

    const apiRoutes = ['getUsers', 'question1', 'question2', 'question3', 'question4']

    useEffect(()=>{
        if (openFilter && modalFilterRef.current && modalFilterRef.current.style) {
            modalFilterRef.current.style.display = 'block';
        } else if (!openFilter && modalFilterRef.current && modalFilterRef.current.style) {
            modalFilterRef.current.style.display = 'none';
        }
    },[openFilter]) 

    useEffect(()=>{
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) { 
                if(openFilter){
                    setOpenFilter(false)
                    modalFilterRef.current.style.display = 'none' 
                } 
            }  
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },[openFilter])

  return (
    <>
    <div
        className="flex flex-wrap border border-slate-200 p-2 gap-2 rounded-md my-2 border-2  
            [&>button]:font-medium
            [&>button]:border 
            [&>button]:px-4   
            [&>button]:py-1 
            [&>button]:rounded-full 
            [&>button]:text-left 
            [&>button]:text-sm  
        "
        >
        <div className="relative mx-2 " ref={filterRef}>
            <span className="cursor-pointer shrink-0 px-2 py-1  flex items-center gap-2 font-semibold border-2 border-slate-500 text-slate-500 rounded-md w-fit hover:border-blue-500 hover:text-blue-500 " onClick={()=>setOpenFilter(!openFilter)} >
                {location.search.length > 0 ? <span className="text-blue-500"><VscFilterFilled/></span>  : <VscFilter /> }
                 Filter
            </span> 
            <div ref={modalFilterRef} className="hidden">
                {/* Modal for Income and Phone Price range filter */}
                <FilterModal refresh={refresh} /> 
            </div>
        </div>
         
        <h1 className="w-full shrink-0 font-semibold text-sm border-slate-300 border-b p-2 my-1">Suggested Filter</h1>
        {/* Suggested Filter Chips */}
        {apiRoutes.map((apiRoute)=>{
            return (
                <FilterChips apiRoute={apiRoute} handleClick={handleClick} apiReq={apiReq} key={apiRoute}/>
            )
        })}
      </div>
    </>
  )
}

export default Filterbar