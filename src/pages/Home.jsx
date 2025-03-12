import { Button } from '@/components/ui/button'
import React from 'react'

const Home = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center text-red-500'>
        {/* Home */}
        <div className="flex flex-col items-center justify-center min-h-svh">
        <h1 className='text-4xl font-bold'>Home</h1>
      <Button>Click me</Button>
    </div>
    </div>
  )
}

export default Home