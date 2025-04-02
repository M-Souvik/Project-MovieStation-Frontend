import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import Login from "@/pages/auth/Login";
import AllMovies from "@/pages/AllMovies";
// import AllMovies from "@/pages/AllMovies";

const AppRoutes=()=>{
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/auth/login" element={<Login/>}/>
            <Route path="/auth/register" element={<Login/>}/>
            <Route path="/movies" element={<AllMovies/>}/>

        </Routes>
    )
}

export default AppRoutes;