import { useEffect, useRef, useState } from "react"; 
import { useQuery } from "react-query";
import { getUsers } from "../api/api";
import TableWithPagination from "../components/TableWithPagination";
import CityTable from "../components/CityTable";
import { VscFilter, VscFilterFilled } from "react-icons/vsc"; 
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"; 
import FilterModal from "../components/FilterModal";

function Home() {
    const [apiReq, setApiReq] = useState("getUsers");
    const [cities, setCities] = useState([]);
    const [refresh, setRefresh] = useState(false) 
    const [searchParams, setSearchParams] = useSearchParams()
    const [error, setError] = useState(false)

    const [openFilter,setOpenFilter] = useState(false)
    const filterRef = useRef()
    const modalFilterRef = useRef()

    const location = useLocation()
    const navigate = useNavigate('/')

    const { data, isLoading, isError, isFetching, refetch } = useQuery("users",() => getUsers(apiReq),
        {
            refetchOnWindowFocus: false,
            manual: true,
        }
    );
 

    useEffect(() => {
        getUsers("question5").then((res) => setCities(res.data)).catch((error)=>{setError(error.message)});
        navigate('/')
    }, []);

    useEffect(() => {
        refetch();
    }, [apiReq]);

    useEffect(()=>{
        setApiReq(`search/${location.search}`)
    },[location])

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

    const handleClick = (e) => {
        setRefresh(!refresh)
        setApiReq(e.target.dataset.api);
        if(location.search.length > 0){
            setSearchParams()
        } 
    };

    if (cities.length === 0) {
        return <div>Loading....</div>;
    }

    if (isError || error) {
        return <div>Error</div>;
    }


  return (
    <div className=" w-11/12 mx-auto pb-10">
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
                <FilterModal refresh={refresh} /> 
            </div>
        </div>
         
        <p className="w-full shrink-0 font-semibold text-sm border-slate-300 border-b p-2 my-1">Suggested Filter</p>
        <button
          onClick={handleClick}
          data-api={"getUsers"}
          className={`border  px-4 py-1 rounded-full ${
            apiReq === "getUsers" ? "border-blue-500 bg-blue-500 text-white" : "border-slate-600 text-slate-600"
          }`}
        >
          All
        </button>
        <button
          onClick={handleClick}
          data-api={"question1"}
          className={`border  px-4 py-1 rounded-full ${
            apiReq === "question1" ? "border-blue-500 bg-blue-500 text-white" : "border-slate-600 text-slate-600"
          }`}
        >
          Users which have income lower than $5 USD and have a car of brand
          “BMW” or “Mercedes”
        </button>
        <button
          onClick={handleClick}
          data-api={"question2"}
          className={`border  px-4 py-1 rounded-full ${
            apiReq === "question2" ? "border-blue-500 bg-blue-500 text-white" : "border-slate-600 text-slate-600"
          }`}
        >
          Male Users which have phone price greater than 10,000.
        </button>
        <button
          onClick={handleClick}
          data-api={"question3"}
          className={`border  px-4 py-1 rounded-full ${
            apiReq === "question3" ? "border-blue-500 bg-blue-500 text-white" : "border-slate-600 text-slate-600"
          }`}
        >
          Users whose last name starts with “M” and has a quote character length
          greater than 15 and email includes his/her last name.
        </button>
        <button
          onClick={handleClick}
          data-api={"question4"}
          className={`border  px-4 py-1 rounded-full ${
            apiReq === "question4" ? "border-blue-500 bg-blue-500 text-white" : "border-slate-600 text-slate-600"
          }`}
        >
          Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose
          email does not include any digit.
        </button>
      </div>

      <div className="">
        {isFetching ? (<>...Loading</>) 
            : (<TableWithPagination data={data.data} />)
        }

        <CityTable data={cities} />
      </div>
    </div>
  );
}

export default Home;
