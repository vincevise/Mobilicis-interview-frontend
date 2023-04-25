import React, { useEffect, useMemo } from "react";
import { useTable, usePagination, useSortBy } from "react-table";

const TableWithPagination = ({ data }) => {
  const COLUMNS = [
    { Header: "ID", accessor: "id" },
    { Header: "First Name", accessor: "first_name" },
    { Header: "Last Name", accessor: "last_name" },
    { Header: "Email", accessor: "email" },
    { Header: "Gender", accessor: "gender" },
    { Header: "Income", accessor: "income" },
    { Header: "City", accessor: "city" },
    { Header: "Car", accessor: "car" },
    { 
        Header: "Quote", 
        accessor: "quote", 
        Cell:({row})=>(
            <div className="italic bg-yellow-100 text-sm rounded-md font-medium p-2 w-36">
                {row.original.quote}
            </div>
        )
    },
    { Header: "Phone Price", accessor: "phone_price" }
  ];

  const columns = useMemo(()=>COLUMNS,[])
  const users = useMemo(()=>data,[])
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
   
  useEffect(()=>{

  },[data])
  return (
    <div className="bg-white rounded-md border border-slate-200 shadow-lg text-center">
      <table {...getTableProps()} className=" text-center   w-full" >
        <thead className="border-b text-slate-600 border-slate-300 text-sm bg-gray-100">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className=" text-center">
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="font-medium	p-2  ">{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="text-sm text-center" >
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="py-1 px-1">{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="p-2 flex w-full items-center 
        [&_button]:border
        [&_button]:border-slate-300
        [&_button]:px-2
        [&_button]:py-1
        [&_button]:flex
        [&_button]:items-center
        [&_button]:justify-center
        [&_button]:mx-1
        [&_button]:rounded-md
        [&_button]:bg-white
        [&_button]:text-slate-600
        border-t border-slate-300 
        [&_input]:border 
        [&_input]:border-slate-300
        [&_input]:rounded-md
        [&_input]:mx-1
        [&_input]:px-1
        [&_input]:py-1
        [&_select]:py-1
        [&_select]:rounded-md
        [&_select]:px-1
        "
        >
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} >
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span className="mx-2">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span> |
        <span className="mx-2 flex items-center">
           Go to page:{"  "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "50px" }}
          />
        </span>{" "}
        <select
        //   value={state.pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TableWithPagination;
