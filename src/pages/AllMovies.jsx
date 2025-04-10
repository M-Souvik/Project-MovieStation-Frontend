import React, { useEffect, useState } from 'react'
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
import BannerCard from '@/components/BannerCard'
import CarouselSection from '@/components/sections/banner/Carousel'
import GenreSection from '@/components/sections/genres/GenreSection'
import RecommendationSection from '@/components/sections/recommendations/RecommendationSection'

const AllMovies = () => {
  return (
    <div className=' w-full h-full flex flex-col relative gap-20 px-20 z-40'>
      <div className=''>

      <CarouselSection/>
      </div>
      <div className='relative z-40'>

      <GenreSection/>
      </div>
      <div className='relative z-40'>

      <RecommendationSection/>
      </div>



        {/* </div> */}
    </div>
  )
}

export default AllMovies