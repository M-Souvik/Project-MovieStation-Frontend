import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useNavigate } from 'react-router'
import { LogIn, LogOut, Menu, Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { clearData } from '@/features/auth/authSlice'
import DrawerSheet from './DrawerSheet'

const Headers = () => {
  const pathname = window.location.pathname
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'))
  const dispatch = useDispatch()
  
  // useEffect(() => {
  //   if (userData) {
  //     setisLoggedIn(true)
  //   }
  // }, [userData])

  const routes = [
    { path: "/", label: "Home" },
    { path: "/movies", label: "Movies & Shows" },
    { path: "/pricing", label: "Pricing" }
  ];

  return (
    <nav className={`sticky z-50 right-0 left-0 top-0 py-2 px-2 sm:bg-transparent sm:px-10 flex justify-between sm:justify-evenly items-center`}>
      <div className='flex items-center'>
        <div>

      <DrawerSheet className={'bg-black rounded-xl min-w-72 w-full left-2 right-2 max-w-96 border border-gray-400 top-2 text-white'} 
      content={
        <div className='py-2 flex flex-col'>
        {routes.map((route, index) => (
          <>
          <a key={index} href={route.path} className={` normal-case border-transparent hover:text-white transition-colors duration-300 transform hover:bg-gray-800 rounded px-6 py-3 ${route.path === pathname ? 'text-gray-800 dark:text-gray-200 bg-gray-800' : ''}`}>
            {route.label}
          </a>
          </>
        ))}
        </div>
      }>
        <Button size={'icon'}><Menu className='text-white'/></Button>
      </DrawerSheet>
        </div>
      <div className='flex items-center gap-2 cursor-pointer' onClick={()=>navigate('/')}>
        <img src='/assets/logo.png' alt='logo' className='h-10 w-10' />
        <h1 className='text-white font-semibold text-2xl'>MovieStation</h1>
      </div>
      </div>


      <div className="hidden sm:flex items-center bg-black border-2 border-gray-800 p-2 w-fit rounded mx-auto gap-3 text-gray-600 capitalize dark:text-gray-300">
        {routes.map((route, index) => (
          <a key={index} href={route.path} className={`border-b-2 border-transparent hover:text-white transition-colors duration-300 transform hover:bg-gray-800 rounded p-3 px-6 ${route.path === pathname ? 'text-gray-800 dark:text-gray-200 bg-gray-800' : ''}`}>
            {route.label}
          </a>
        ))}
      </div>

      <div className='flex items-center gap-2 sm:pr-5'>
        <Input onClick={() => { navigate('/search/movies') }} readOnly className={'dark:border-gray-600 hidden sm:block dark:text-white w-40 dark:placeholder:text-gray-600'} placeholder={'Search movies...'} />
        <div className=''>

        <Search onClick={()=>{navigate('/search/movies')}} className='block text-white sm:hidden'/>
        </div>

        {userData ? (
          <Button onClick={() => { navigate('/'); localStorage.removeItem('userData') }} className='bg-red-500 text-white font-semibold w-fit h-fit'><LogOut /></Button>
        ) : (
          <Button onClick={() => { navigate('/auth'); dispatch(clearData()); }} className='bg-red-500 text-white font-semibold w-fit h-fit'><LogIn /></Button>
        )}
      </div>
    </nav>
  )
}

export default Headers