import React, { useEffect, useState } from 'react'
import { genres } from '@/data/getData'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router'

const GenreSection = () => {
  const navigate=useNavigate()

  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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

  // Function to go to a specific slide
  const goToSlide = (index) => {
    api?.scrollTo(index);
  };
  return (

    <div className='flex flex-col gap-2 relative w-full items-center'>
      <h1 className='text-3xl dark:text-white text-left w-full font-semibold'>Our Genres</h1>
         <Carousel 
         opts={{
          align:'center',
          loop:'true'
          }} 
          setApi={setApi} className="w-full ">
      <CarouselContent className="-ml-1">
        {genres.map((genre, index) => (
          <CarouselItem key={index} className="pl-1 basis-[90%] md:basis-1/2 lg:basis-1/5">
            <div className="p-1">
              <Card className={'border-white'}>
                <CardContent className="flex flex-col items-center text-white justify-center px-4">
                  <img src={`/assets/${genre.image}`}/>
                  <div className='flex justify-between items-center w-full relative top-2'>

                  <h1 className="text-xl font-semibold" onClick={()=>{navigate(`/movies/${genre.id}`)}}>{genre.name}</h1>
                  <div>
                    <ChevronRight/>
                  </div>

                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className='absolute hidden sm:flex -top-5 right-12'>

      <CarouselPrevious className={'border-white stroke-white rounded '}/>
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
      <CarouselNext className={'border-white stroke-white rounded'}/>
      </div>
    </Carousel>
    </div>
  )
}

export default GenreSection