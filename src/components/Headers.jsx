import React from 'react'
import { Button } from './ui/button'

const Headers = () => {
  return (
    <nav class="bg-transparent fixed left-0 right-0 top-0 p-6 px-10 flex justify-center items-center">
        <div className='flex items-center gap-2 justify-start'>
            <img src='/assets/logo.png' alt='logo' className='h-10 w-10'/>
            <h1 className='text-white font-semibold text-2xl'>MovieStation</h1>
        </div>

    <div class="container flex items-center justify-center bg-black border-2 border-gray-800 p-2 w-fit rounded mx-auto gap-3 text-gray-600 capitalize dark:text-gray-300">
        <a href="#" class="text-gray-800 transition-colors duration-300 transform dark:text-gray-200 bg-gray-800 rounded p-3  px-6">home</a>

        <a href="#" class="border-b-2 border-transparent hover:text-white transition-colors duration-300 transform hover:bg-gray-800 rounded p-3 px-6">Movies & Shows</a>

        <a href="#" class="border-b-2 border-transparent hover:text-white transition-colors duration-300 transform hover:bg-gray-800 rounded p-3 px-6">pricing</a>

    </div>

    <div className='flex items-center gap-2 justify-end pr-5'>
            <Button className='bg-red-500 text-white font-semibold w-fit h-fit'>Login</Button>
            <Button className='bg-red-500 text-white font-semibold w-fit h-fit'>Register</Button>
        </div>
</nav>
  )
}

export default Headers