import React, { useState, useEffect } from 'react';
import '@/styles/Login.css'
import { Button } from '@/components/ui/button';
import { Eye, EyeClosed } from 'lucide-react';
import { BorderBeam } from '@/components/ui/borderbeam';
import { useDispatch, useSelector } from 'react-redux';
import { clearData, login, postUserPreferences, register } from '@/features/auth/authSlice';
import { toast, Toaster } from 'sonner';
import { useNavigate } from 'react-router';
import { genresChoices } from '@/data/getData';
import { Card, CardContent, CardTitle } from '@/components/ui/card'


export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [response, setResponse]=useState()
    const [selectedGenreIds, setSelectedGenreIds] = useState([]);
    const [showPassword, setShowPassword]=useState(false)
    const [showPreference, setShowPreferences] = useState(false);
    const navigate = useNavigate();
    const state = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (state.data) {
            if (isLogin) {
                if(state.data.status === 200){

                    console.log('logging in');
                    toast.success('Logged in successfully!');
                    navigate('/movies');
                    setUsername(''),
                    setPassword('')
                    setEmail('');
                    dispatch(clearData());
                }else if(state.data.status!=200){
                    console.log(state.error)
                }
            } else if (!isLogin && !showPreference&& state.data.status === 201) {
                console.log('data:', state.data);
                setShowPreferences(true);
                setResponse(state.data)
            } else if (showPreference  && response.status === 201) {
                console.log('redirecting');
                navigate('/movies');
                const payload = {
                    email: email,
                    password: password
                };
                dispatch(login(payload));

                dispatch(clearData())
            }
        }
    }, [state.data, isLogin, navigate]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            const payload = {
                email: email,
                password: password
            };
            dispatch(login(payload));
            
            console.log('Logging in with:', { email, password });
        } else {
            const payload = {
                username: username,
                email: email,
                password: password
            };
            dispatch(register(payload));
            console.log('Registering with:', { username, email, password });
        }
    };

    const toggleGenreSelection = (genreId) => {
        setSelectedGenreIds((prev) => 
            prev.includes(genreId) ? prev.filter(id => id !== genreId) : [...prev, genreId]
        );
    };

    const onClick = () => {
        const payload = {
            user_id: state.data.data.user.id,
            preference: selectedGenreIds
        };

        dispatch(postUserPreferences(payload));
    };

    return (
        <div className='container overflow-hidden'>
            <img src='/assets/login-back.jpg' className='absolute  top-0 z-20 w-full h-full object-cover'/>
            {showPreference ? (
                <div className='inset-0 bg-gradient-to-b from-black/80 to-black/60 absolute top-0 z-30 flex justify-center items-center'>
                    <Card className={'border-1 flex flex-col gap-2.5 border-gray-700 px-2 py-3 max-w-md bg-gray-950 text-white'}>
                        <CardTitle className={'font-normal px-3 pb-0 text-xl'}>Please Select Your Preferred Genres</CardTitle>
                        <CardContent className={'flex px-2 py-0 gap-2 flex-wrap'}>
                            {genresChoices.map((genre) => (
                                <div key={genre.id} onClick={() => toggleGenreSelection(genre.id)} className={`flex items-center w-fit p-2 rounded-full border ${selectedGenreIds.includes(genre.id) && 'bg-white text-black'}`}>
                                    <label htmlFor={`genre-${genre.id}`} className="">{genre.name}</label>
                                </div>
                            ))}
                        </CardContent>
                        <div className='px-10 w-full'>
                            <Button type='button' onClick={onClick} className='bg-red-600 mt-4 w-full'>Next</Button>
                        </div>
                    </Card>
                </div>
            ) : (
                <>
                    <div className='w-full h-full bg-gradient-to-b from-black/80 to-black/60 absolute top-0 z-30 flex justify-center items-center'>
                        <div className='form-container sm:w-md relative z-40 bg-gray-950'>
                            <div className='form-toggle bg-gray-900 p-1 rounded'>
                                <button className={isLogin ? 'active' : ""} onClick={() => setIsLogin(true)}>Login</button>
                                <button className={!isLogin ? 'active' : ""} onClick={() => setIsLogin(false)}>Register</button>
                            </div>
                            <form onSubmit={onSubmit}>
                                {isLogin ? (
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
                                                type={showPassword?'text':'password'}
                                                placeholder='Password' 
                                                value={password} 
                                                onChange={(e) => setPassword(e.target.value)} 
                                            />
                                            <Button size={'icon'} type="button" onClick={()=>setShowPassword(!showPassword)}>{showPassword?<EyeClosed/>:<Eye/>}</Button>
                                        </div>
                                        <a href='#'>Forgot password?</a>
                                        <Button type='submit' className='bg-red-600'>Login</Button>
                                        <p>Not a Member? <a href='#' onClick={() => setIsLogin(false)}>Sign Up</a></p>
                                    </div>
                                ) : (
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
                                                type={showPassword?'text':'password'}
                                                placeholder='Password' 
                                                value={password} 
                                                onChange={(e) => setPassword(e.target.value)} 
                                            />
                                            <Button size={'icon'} type="button" onClick={()=>setShowPassword(!showPassword)}>{showPassword?<EyeClosed/>:<Eye/>}</Button>
                                        </div>
                                        <Button type='submit' className='bg-red-600 mt-4'>Sign Up</Button>
                                    </div>
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
                </>
            )}
            <Toaster richColors position='bottom-right'/>
        </div>
    );
}