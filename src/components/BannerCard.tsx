// import React from 'react'
import { Card, CardContent } from './ui/card'
// import { Button } from './ui/button'
import { Play } from 'lucide-react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router'

const BannerCard = ({movie}) => {
  const navigate=useNavigate()
  return (
    <div className='p-1 w-full'>
              <Card className={'h-[40rem] border-none relative w-full py-0 rounded overflow-hidden'}>
                <img src={movie.banner_poster} alt={movie.title} className='object-cover w-full object-top'/>
                <CardContent className="flex bg-gradient-to-t from-black/100 to-black/10 absolute w-full h-full flex-col items-center justify-end gap-3 p-6">
                <div className='flex flex-col items-center relative bottom-10 gap-3'>
                  <h1 className='font-semibold text-3xl'>{movie.title}</h1>
                  <p className='text-sm text-center font-thin max-w-[90%]'>{movie.description}</p>
                  <Button onClick={()=>{navigate(`/movie/${movie.movie_id}`)}} className={'bg-red-500'} variant="primary" size={'default'}><Play/>  Play Now</Button>

                </div>
                </CardContent>
              </Card>
            </div>
  )
}

export default BannerCard