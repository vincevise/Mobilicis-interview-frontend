import { memo, useEffect, useRef, useState } from "react"; 
import { useQuery } from "react-query";
import { getUsers } from "../api/api";


import { useLocation, useNavigate, useSearchParams } from "react-router-dom"; 
import FilterModal from "../components/FilterModal";

import TableWithPagination from "../components/TableWithPagination";
import CityTable from "../components/CityTable";
import Filterbar from "../components/Filterbar";

function Home() {
    const [apiReq, setApiReq] = useState("getUsers");
    const [cities, setCities] = useState([]);
    const [refresh, setRefresh] = useState(false) 
    const [searchParams, setSearchParams] = useSearchParams()
    const [error, setError] = useState(false)

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
      <Filterbar handleClick={handleClick} refresh={refresh} apiReq={apiReq}/>

      {/* First four queries will be shown in the table below */}
      {isFetching ? 
        (<>...Loading</>) 
          : 
        (<TableWithPagination data={data.data} />)
      }

      {/* 5th query will be shown in table below */}
      <CityTable data={cities} /> 
    </div>
  );
}

export default memo(Home);
