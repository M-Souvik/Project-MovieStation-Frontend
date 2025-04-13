import React, { useEffect, useState } from 'react'
import { genres, trending } from '@/data/getData'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ChevronRight } from 'lucide-react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies, fetchMoviesByGenres } from '@/features/movie/movieSlice'
import { Skeleton } from '@/components/ui/skeleton'

export function convertTime(time){
    
  const convertedTime=`${parseInt(time/120)}hr ${ (time/60-parseInt(time/60))!=0 ?`${parseInt((time/60-parseInt(time/60))*60)}min`:``}`;
  return convertedTime;
}

const RecommendationSection = () => {
  // const  [movies, setMovies]=useState([]);
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const userData=JSON.parse(localStorage.getItem('userData'))
  const [count, setCount] = useState(0);

  const { loading, data: movies, error, hasFetched } = useSelector((state) => state.movies);

  console.log('movies', movies);

  // const fetchMovies=async()=>{
  //   try {
  //     const response=await axios.get(`${import.meta.env.VITE_API_URL}/api/movies`)
  //     console.log(response.data);
  //     setMovies(response.data.movies)

  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // useEffect(()=>{
  //   fetchMovies();
  // },[])







  useEffect(() => {
    if (!hasFetched) {
    if(userData){

      dispatch(fetchMoviesByGenres(userData.user.preferences));
    }else{
      dispatch(fetchMovies())
    }
  }
  }, [dispatch, hasFetched]);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const goToSlide = (index) => {
    api?.scrollTo(index);
  };

const section=()=>{
  return(
<>
  {loading?(
  <>
<div className='grid grid-cols-5 gap-4 relative z-30'>



<Skeleton className="h-[400px] w-[260px] rounded-xl bg-gray-900" />
<Skeleton className="h-[400px] w-[260px] rounded-xl bg-gray-900" />
<Skeleton className="h-[400px] w-[260px] rounded-xl bg-gray-900" />
<Skeleton className="h-[400px] w-[260px] rounded-xl bg-gray-900" />
<Skeleton className="h-[400px] w-[260px] rounded-xl bg-gray-900" />

</div>  

  </>
  ):(
    <>
    <Carousel
    opts={{
      align:'center',
      loop:'true'
      }} 
    
    setApi={setApi} className="w-full ">
    <CarouselContent className="-ml-1">
        {movies&&movies.map((genre, index) => (
          <CarouselItem key={index} className="pl-1 basis-[90%] md:basis-1/2 lg:basis-1/5">
            <div className="p-1">
              <Card className={'border-white'}>
                <CardContent className="flex flex-col items-center text-white justify-center p-2 py-0">
                  <img src={genre.poster} className='object-fit w-full h-[18rem]'/>
                  <div>

                  </div>
                  <div className='flex justify-between items-center w-full relative top-2'>

                  <h1 onClick={()=>{navigate(`/movie/${genre.movie_id}`)}} className="text-lg font-semibold truncate ">{genre.title}</h1>
                  <div>
                    <ChevronRight/>
                  </div>

                  </div>
                  <div className='flex justify-between w-full items-center mt-3'>
                    <div className='bg-gray-700 px-2 py-0.5 text-sm rounded-full'>{convertTime(Number(genre.runtime))}</div>
                    <div className='bg-gray-700 px-2 py-0.5 text-sm rounded-full'>{genre.genres[0]}</div>

                    
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    <div className='absolute -top-5 right-12'>

    <div className='absolute hidden sm:flex -top-5 right-12'>

      <CarouselPrevious className={'border-white stroke-white rounded '}/>
      <div className="flex items-center gap-1 justify-center">
            {Array.from({ length: 3 }).map((_, index) => (
              <button
                key={index}
                className={`h-1 rounded-full transition-all ${
                  current === index ? "w-6 bg-red-500" : "w-4 bg-slate-700"
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
      <CarouselNext className={'border-white stroke-white rounded'}/>
      </div>
    </div>
  </Carousel>
    
    </>
  )
}
  
  </>
)}
  if (error) return <p>Error: {error}</p>;


  return (
    <div className='flex flex-col gap-2 relative w-full items-center'>
    <h1 className='text-3xl dark:text-white text-left w-full font-semibold'>Recommended for you</h1>
       {section()}
  </div>
  )
}

export default RecommendationSection