import React, { useEffect, useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
// import BannerCard from '@/components/BannerCard'
import { movies } from '@/data/getData'
import Autoplay from 'embla-carousel-autoplay'
import BannerCard from '@/components/BannerCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies, fetchMoviesByGenres } from '@/features/movie/movieSlice'
// import BannerCard from '@/components/BannerCard'

const CarouselSection = () => {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const dispatch=useDispatch()
  const userData=JSON.parse(localStorage.getItem('userData'))
  const { loading, data: movies, error, hasFetched } = useSelector((state) => state.movies);




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

  useEffect(() => {
    if(!hasFetched){

      if(userData){
  
        dispatch(fetchMoviesByGenres(userData.user.preferences));
      }else{
        dispatch(fetchMovies())
      }
    }
  }, [dispatch, hasFetched]);

  // Function to go to a specific slide
  const goToSlide = (index) => {
    api?.scrollTo(index);
  };
  return (
    <div className='text-white  h-[60%]'>
        <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: "center",
      }}
        plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className="w-full">
      <CarouselContent className={'relative'} >
        {movies&&movies.slice(0,3).map((movie, index) => (
          <CarouselItem key={index} className="flex justify-center items-center">
            {/* <div className='p-1 w-full'>
              <Card className={'h-[40rem] border-none relative w-fit py-0 rounded overflow-hidden'}>
                <img src={movie.banner_poster} alt={movie.movie_name} className='object-cover'/>
                <CardContent className="flex bg-gradient-to-t from-black/100 to-black/10 absolute w-full h-full flex-col items-center justify-end gap-3 p-6">
                  <h1 className='font-semibold text-3xl'>{movie.movie_name}</h1>
                  <p className='text-sm text-center font-thin max-w-[90%]'>{movie.description}</p>
                  <Button className={'bg-red-500'}><Play/>  Play Now</Button>
                </CardContent>
              </Card>
            </div> */}
            <BannerCard movie={movie}/>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className='absolute left-20 right-20 bottom-10'>

      <CarouselPrevious className={'bg-black rounded border-none'}/>
      <div className="flex items-center gap-1 justify-center">
            {Array.from({ length: count }).map((_, index) => (
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
      <CarouselNext className={'bg-black rounded border-none'}/>
      </div>
    </Carousel>

    

        </div>
  )
}

export default CarouselSection