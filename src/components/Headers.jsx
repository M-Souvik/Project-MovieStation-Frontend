import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useNavigate } from 'react-router'
import { LogIn, Search } from 'lucide-react'

const Headers = () => {
  const pathname = window.location.pathname
  const [isHome, setisHome]=useState(false);
  const  navigate=useNavigate()
  
  useEffect(()=>{
    if(pathname=='/'){
      setisHome(true)
    }
  },[pathname])
  return (
    <nav className={`bg-transparent sticky z-50 right-0 left-0 top-0 py-2 px-5 sm:px-10 flex justify-between  sm:justify-evenly items-center`}>
        <div className='flex items-center gap-2 '>
            <img src='/assets/logo.png' alt='logo' className='h-10 w-10'/>
            <h1 className='text-white font-semibold text-2xl'>MovieStation</h1>
        </div>

    <div className=" hidden sm:flex items-center  bg-black border-2 border-gray-800 p-2 w-fit rounded mx-auto gap-3 text-gray-600 capitalize dark:text-gray-300">
        <a href="/" className="text-gray-800 transition-colors duration-300 transform dark:text-gray-200 bg-gray-800 rounded p-3  px-6">home</a>

        <a href="/movies" className="border-b-2 border-transparent hover:text-white transition-colors duration-300 transform hover:bg-gray-800 rounded p-3 px-6">Movies & Shows</a>

        <a href="/" className="border-b-2 border-transparent hover:text-white transition-colors duration-300 transform hover:bg-gray-800 rounded p-3 px-6">pricing</a>

    </div>

    <div className='flex items-center gap-2 sm:pr-5'>
            <Input onClick={()=>{navigate('/search/movies')}} readOnly className={'dark:border-gray-600 hidden sm:block dark:text-white w-40 dark:placeholder:text-gray-600'}placeholder={'Search movies...'}/>

            {/* <Button size={'icon'} className=' text-white font-semibold w-fit h-fit'><Search/></Button> */}
            <Button onClick={()=>{navigate('/auth')}} className='bg-red-500 text-white font-semibold w-fit h-fit'><LogIn/></Button>
            {/* <Button className='bg-red-500 text-white font-semibold w-fit h-fit'>Register</Button> */}
        </div>
</nav>
  )
}

export default Headers