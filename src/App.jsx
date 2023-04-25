 import { Suspense, lazy } from "react";
import "./App.css";
// import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Home = lazy(()=>import("./pages/Home"))

function App() {
   

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Suspense fallback={<div>...Loading</div>}>
              <Home/>
            </Suspense>
          }/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
