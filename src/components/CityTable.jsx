import React, { memo, useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import { getUsers } from '../api/api'
import { usePagination, useSortBy, useTable } from 'react-table';

const CityTable = ({data}) => {
     

    const COLUMNS = [
      { Header: "City", accessor: "_id" },
      { Header: "Users", accessor: "totalUsers" },  
      {Header:"Average Income", accessor:'averageIncome'}
    ];
  
    const columns = useMemo(()=>COLUMNS,[])
    const users = useMemo(() => data, []); // Add conditional check for data

    // Check if data is undefined before using it
    
    const tableInstance = useTable({
      columns:columns,
      data:users
    },useSortBy,usePagination)

   
   
    
  const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      getState, 
      setPageSize,
      state: { pageIndex }
    } = tableInstance 

     

      return (
        <>
        <div className='mt-10 mb-2   w-fit px-4 py-1 rounded-full   text-sm font-semibold bg-slate-200'>Show the data of top 10 cities which have the highest number of users and their average income.</div>
        <div className="bg-white rounded-md">
          <table {...getTableProps()} className=" text-center  w-fit shadow-md rounded-md overflow-hidden">
            <thead className="border-b bg-gray-100   border-slate-300 text-sm rounded-md">
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()} className=''>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()} className="font-medium	p-2  ">{column.render("Header")}</th>
                    ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="text-sm">
              {page.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="py-1 px-1">
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()} className="	p-2 ">{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
           
        </div>
        </>
      );
    
  };
  
  export default memo(CityTable);