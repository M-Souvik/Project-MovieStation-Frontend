import React from 'react'
import { Card, CardContent } from './ui/card'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router'
import { convertTime } from './sections/recommendations/RecommendationSection'

const MoviesCard = ({genre}) => {
    const navigate=useNavigate();
  return (
    <Card className={'border-white'}>
                <CardContent className="flex flex-col items-center text-white justify-center p-2 py-0">
                  <img src={genre.poster} className='object-fit w-full h-[18rem]' onClick={()=>{navigate(`/movie/${genre.movie_id}`)}}/>
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
                    <div className='bg-gray-700 px-2 py-0.5 text-sm rounded-full'>{genre?.genres[0]}</div>

                    
                  </div>
                </CardContent>
              </Card>
  )
}

export default MoviesCard