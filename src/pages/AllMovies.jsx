import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { movies } from '@/data/getData'
import Autoplay from "embla-carousel-autoplay"
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'

const AllMovies = () => {
  return (
    <div className='bg-black w-full h-screen px-20 '>
        <div className='text-white relative top-32 h-[60%]'>
        <Carousel
        opts={{
          loop: true,
          align: "center",
      }}
        plugins={[
        Autoplay({
          delay: 10000,
        }),
      ]}

    //   orientation='center'
      className="w-full">
      <CarouselContent className={'relative'} >
        {movies.map((movie, index) => (
          <CarouselItem key={index} className="flex justify-center items-center">
            <div className='p-1 w-full'>
              <Card className={'h-[40rem] relative w-fit py-0 rounded-xl overflow-hidden'}>
                <img src={movie.banner_poster} alt={movie.movie_name} className='object-cover'/>
                <CardContent className="flex bg-black/40 absolute w-full h-full flex-col items-center justify-end gap-3 p-6">
                  <h1 className='font-semibold text-3xl'>{movie.movie_name}</h1>
                  <Button className={'bg-red-500'}><Play/>  Play Now</Button>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className='absolute left-20 right-20 bottom-10'>

      <CarouselPrevious className={'bg-black rounded border-none'}/>
      <CarouselNext className={'bg-black rounded border-none'}/>
      </div>
    </Carousel>

        </div>
    </div>
  )
}

export default AllMovies