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
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

const AllMovies = () => {
  const state = useSelector((state) => state.movies);
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(state.isLoading);
  }, [isLoading, setIsLoading, state]);

  if (isLoading) {
    return (
      <div className='h-screen w-full flex items-center justify-center relative'>
        <img src='/assets/loader2.gif' className='w-48  sm:w-52 relative -top-20'/>
      </div>
    );
  }

  return (
    <div className='w-full h-full flex flex-col relative gap-20 sm:px-20 px-1 z-40'>
      <div>
        <CarouselSection />
      </div>
      <div className='relative z-40'>
        <GenreSection />
      </div>
      <div className='relative z-40'>
        <RecommendationSection />
      </div>
    </div>
  )
}

export default AllMovies