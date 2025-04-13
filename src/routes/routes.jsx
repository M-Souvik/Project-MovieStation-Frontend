import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import Login from "@/pages/auth/Login";
import AllMovies from "@/pages/AllMovies";
import MovieDetails from "@/pages/MovieDetails";
import SearchMovies from "@/pages/SearchMovies";
import AuthForm from "@/pages/auth/Login";
import GenresPage from "@/pages/GenresPage";
// import AllMovies from "@/pages/AllMovies";

const AppRoutes=()=>{
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/auth/login" element={<Login/>}/>
            <Route path="/auth/register" element={<Login/>}/>
            <Route path="/movies" element={<AllMovies/>}/>
            <Route path="/movie/:id" element={<MovieDetails/>}/>
            <Route path="/movies/:genre" element={<GenresPage/>}/>
            <Route path="/search/movies" element={<SearchMovies/>}/>
            <Route path="/auth" element={<AuthForm/>}/>

        </Routes>
    )
}

export default AppRoutes;