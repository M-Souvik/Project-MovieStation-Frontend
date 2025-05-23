import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

const Home = () => {
  const navigate=useNavigate();
  
  return (
    <div className='w-full flex justify-center items-center h-screen sm:min-h-[43.5vw]'>
      <img src='/assets/login.png' alt='home background' className='absolute top-0 object-cover h-full w-full'/>
       <div className='absolute top-[40%] flex flex-col gap-2 items-center justify-center'>
        <h1 className='text-white text-4xl text-center sm:text-6xl font-semibold'>The Best Streaming Experience</h1>
       <p className='text-white text-center text-xs sm:text-md sm:px-72'>MovieStation is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere. With StreamVibe, you can enjoy a wide variety of content, including the latest blockbusters, classic movies, popular TV shows, and more. You can also create your own watchlists, so you can easily find the content you want to watch.</p>
       <Button onClick={()=>{navigate('/movies')}} className={'bg-red-700 text-lg text-white'}><Play/> Start Watching</Button>
       </div>
    </div>
  )
}

export default Home