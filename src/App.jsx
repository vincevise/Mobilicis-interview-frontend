import { useEffect, useState } from "react";
import "./App.css";
import { useQuery } from "react-query";
import { getUsers } from "./api/api";
import TableWithPagination from "./components/TableWithPagination";
import CityTable from "./components/CityTable";
import { FiFilter } from "react-icons/fi";
import RangeSlider from "./components/ReactSlider";
import Home from "./pages/Home";
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'

function App() {
   

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
