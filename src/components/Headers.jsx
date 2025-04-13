import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useNavigate } from 'react-router'
import { LogIn, LogOut } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { clearData } from '@/features/auth/authSlice'

const Headers = () => {
  const pathname = window.location.pathname
  const [isHome, setisHome] = useState(false);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'))
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (pathname === '/') {
      setisHome(true)
    }
  }, [pathname])

  const routes = [
    { path: "/", label: "home" },
    { path: "/movies", label: "Movies & Shows" },
    { path: "/pricing", label: "pricing" }
  ];

  return (
    <nav className={`bg-transparent sticky z-50 right-0 left-0 top-0 py-2 px-5 sm:px-10 flex justify-between sm:justify-evenly items-center`}>
      <div className='flex items-center gap-2 cursor-pointer' onClick={()=>navigate('/')}>
        <img src='/assets/logo.png' alt='logo' className='h-10 w-10' />
        <h1 className='text-white font-semibold text-2xl'>MovieStation</h1>
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