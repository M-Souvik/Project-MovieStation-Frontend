import React, { useState } from 'react';
import '@/styles/Login.css'
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { BorderBeam } from '@/components/ui/borderbeam';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '@/features/auth/authSlice';
import { toast, Toaster } from 'sonner';
import { useNavigate } from 'react-router';

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate=useNavigate();
    const state=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    
    const onSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            const payload={
              email:email,
              password:password
            }
            dispatch(login(payload))
            console.log(state.data.status);
            if(state.data.status==200){
              console.log('logging in');
              toast.success('Logged in successfully!')
              navigate('/movies')
            }
            console.log('Logging in with:', { email, password });
        } else {
            const payload={
              username:username,
              email:email,
              password:password
            }
            

            dispatch(register(payload))
            // dispatch(login(payload))

            console.log('Registering with:', { username, email, password });
        }
    };
    
    return (
        <div className='container '>
          <img src='/assets/login-back.jpg' className='absolute top-0 z-20 w-full h-full object-cover'/>
          <div className='w-full h-full bg-gradient-to-b from-black/80 to-black/60 absolute top-0 z-30 flex justify-center items-center'>

            <div className='form-container sm:w-md relative z-40 bg-gray-950'>
                <div className='form-toggle bg-gray-900 p-1 rounded'>
                    <button className={isLogin ? 'active' : ""} onClick={() => setIsLogin(true)}>Login</button>
                    <button className={!isLogin ? 'active' : ""} onClick={() => setIsLogin(false)}>Register</button>
                </div>
                <form onSubmit={onSubmit}>
                    {isLogin ? (
                        <>
                            <div className='form flex flex-col gap-2'>
                                <input 
                                    className='form-input px-3 py-1.5' 
                                    type='email' 
                                    placeholder='Email' 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                                <div className='flex justify-between border rounded px-3'>
                                    <input 
                                        type='password' 
                                        placeholder='Password' 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                    />
                                    <Button size={'icon'}><Eye/></Button>
                                </div>
                                <a href='#'>Forgot password?</a>
                                <Button type='submit' className='bg-red-600'>Login</Button>
                                <p>Not a Member? <a href='#' onClick={() => setIsLogin(false)}>Sign Up</a></p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='form flex flex-col gap-2'>
                                <input 
                                    className='form-input px-3 py-1.5' 
                                    type='text' 
                                    placeholder='Username' 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                />
                                <input 
                                    className='form-input px-3 py-1.5' 
                                    type='email' 
                                    placeholder='Email' 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                                <div className='flex justify-between border rounded px-3'>
                                    <input 
                                        type='password' 
                                        placeholder='********' 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                    />
                                    <Button size={'icon'}><Eye/></Button>
                                </div>
                                <div className='flex justify-between border rounded px-3'>
                                    <input 
                                        type='password' 
                                        placeholder='********' 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                    />
                                    <Button size={'icon'}><Eye/></Button>
                                </div>
                                <Button type='submit' className='bg-red-600 mt-4'>Sign Up</Button>
                            </div>
                        </>
                    )}
                </form>
                <BorderBeam
        duration={10}
        size={400}
        className="from-transparent via-red-500 to-transparent"
      />
      <BorderBeam
        duration={10}
        delay={1}
        size={400}
        className="from-transparent via-blue-500 to-transparent"
      />
            </div>
          </div>
          <Toaster richColors position='bottom-right'/>
        </div>
    );
}