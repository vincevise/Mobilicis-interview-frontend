import { memo, useEffect, useRef, useState } from "react"; 
import { useQuery } from "react-query";
import { getUsers } from "../api/api";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";  
import TableWithPagination from "../components/TableWithPagination";
import CityTable from "../components/CityTable";
import Filterbar from "../components/Filterbar";

function Home() {
  // this state is for making api request for the diffrent queries mentioned in the assignment 
  const [apiReq, setApiReq] = useState("getUsers"); 

  // this state is to clear and set the values to zero of income and phone price range filters 
  const [refresh, setRefresh] = useState(false) 
  const [searchParams, setSearchParams] = useSearchParams() 

  const location = useLocation() 

  const { data, isError, isFetching, refetch,  } = useQuery("users",() => getUsers(apiReq),
      {
          refetchOnWindowFocus: false,
          manual: true,
      }
  );

        
  const citiesQuery = useQuery("cities",()=>getUsers("question5"),{refetchOnWindowFocus: false, manual: true,})
  console.log(citiesQuery.data)
  
  useEffect(() => {
      refetch();
  }, [apiReq]);

  useEffect(()=>{
      setApiReq(`search/${location.search}`) // onChange of range filter, the query params of url will change which will then trigger another api call 
  },[location])


  const handleClick = (e) => {
      setRefresh(!refresh)
      setApiReq(e.target.dataset.api);
      if(location.search.length > 0){
          setSearchParams()
      } 
  };

  if (citiesQuery.isFetching && isFetching ) {
      return <div>Loading....</div>;
  }

  if (isError || citiesQuery.isError) {
      return <div>Error</div>;
  }


  return (
    <div className=" w-11/12 mx-auto pb-10">
      <Filterbar handleClick={handleClick} refresh={refresh} apiReq={apiReq}/>

      {/* First four queries will be shown in the table below */}
      {isFetching ? 
        (<>...Loading</>) 
          : 
        (<TableWithPagination data={data.data} />)
      }

      {/* 5th query will be shown in table below */} 
      {citiesQuery.isFetching ? 
        (<>...Loading</>) 
          : 
        (<CityTable data={citiesQuery.data.data} />)
      }
    </div>
  );
}

export default memo(Home);
