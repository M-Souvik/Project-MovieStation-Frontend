import Modal from '@/components/Modal'
import MoviesCard from '@/components/MoviesCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { genresChoices } from '@/data/getData'
import { fetchMovies, fetchMoviesByGenres, fetchMoviesBySearch } from '@/features/movie/movieSlice'
import { Filter, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const SearchMovies = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedGenreIds, setSelectedGenreIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const [moviesPerPage] = useState(10); // Number of movies per page
    const dispatch = useDispatch();
    const state = useSelector((state) => state.movies);
    const navigate = useNavigate();
    console.log('state', state);

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent default form submission
        if(searchQuery===''){
        navigate(`/search/movies`);
        }else{

            navigate(`/search/movies?searchQuery=${searchQuery}`);
            if (searchQuery) {
                dispatch(fetchMoviesBySearch(searchQuery));
            }
        }
    }

    const handleApplyFilters = () => {
        if (selectedGenreIds.length > 0) {
            console.log("Selected Genre IDs:", selectedGenreIds);
            dispatch(fetchMoviesByGenres(selectedGenreIds))
        }
        setOpen(false);
    }

    const toggleGenreSelection = (genreId) => {
        setSelectedGenreIds((prev) => 
            prev.includes(genreId) ? prev.filter(id => id !== genreId) : [...prev, genreId]
        );
    };

    useEffect(() => {
        const query = new URLSearchParams(window.location.search).get('searchQuery');
        if (query) {
            setSearchQuery(query);
            dispatch(fetchMoviesBySearch(query));
        } else {
            dispatch(fetchMovies());
        }
    }, [dispatch]);

    // Calculate the current movies to display
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = state.data ? state.data.slice(indexOfFirstMovie, indexOfLastMovie) : [];

    // Calculate total pages
    const totalPages = state.data ? Math.ceil(state.data.length / moviesPerPage) : 0;

    return (
        <div className='min-h-screen px-2 pt-6 lg:pt-6 lg:px-10'>
            <form className='flex gap-2' onSubmit={handleSearch}>
                <Input 
                type={'search'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    className={'dark:border-gray-400 max-w-[60%] dark:text-white dark:placeholder:text-gray-500'} 
                    placeholder="Search For movies...."
                />
                <Button type="submit" className={'bg-red-800 text-white'}>
                    <Search />Search
                </Button>
                <Button size={'icon'} onClick={() => { setOpen(!open) }} className={'bg-gray-800 rounded-full text-white'}>
                    <Filter />
                </Button>
                <Modal open={open} isOpen={setOpen} 
                    title={'Filters'}
                    content={
                        <>
                            <Card className={'border-1 flex flex-col gap-2.5 border-gray-700 px-2 py-3'}>
                                <CardTitle className={'font-normal px-3 pb-0'}>Genres</CardTitle>
                                <CardContent className={'flex px-2 py-0 gap-2 flex-wrap'}>
                                    {genresChoices.map((genre) => (
                                        <div key={genre.id} onClick={() => toggleGenreSelection(genre.id)} className={`flex items-center w-fit p-2 rounded-full border ${selectedGenreIds.includes(genre.id) && 'bg-white text-black'}`}>
                                            <label htmlFor={`genre-${genre.id}`} className="">{genre.name}</label>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                            <Button onClick={handleApplyFilters} className={'bg-red-500 text-white mt-2'}>
                                Apply
                            </Button>
                        </>
                    }
                />
            </form>

            {state.isLoading && (
                <div className='h-screen w-full flex items-center justify-center relative'>
                    <img src='/assets/loader2.gif' className='w-48 sm:w-52 relative -top-20'/>
                </div>
            )}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-5 pt-3 sm:pt-10'>
                {!state.isLoading && currentMovies && Array.isArray(currentMovies) && currentMovies.map((movie) => {
                    return (
                        <MoviesCard key={movie.movie_id} genre={movie} />
                    )
                })}
            </div>
            {/* Pagination Component */}
            <div className='w-full h-full py-5 text-black dark:text-white'>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink 
                                    onClick={() => setCurrentPage(index + 1)} 
                                    isActive={currentPage === index + 1}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext 
                            className={'disabled:cursor-not-allowed'}
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
                                // disabled={currentPage >= totalPages} // Disable if no next content
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

        </div>
    )
}

export default SearchMovies