 import React, { useState } from 'react'
import auth from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { userLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'



function Login() {
    ///////////////////////////////////  State And Hooks
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm()

    const login = async (data) => {
        error && setError('')
        try {
            console.log('Login attempt with:', data);
            const session = await auth.userLogin(data)

            console.log('Session:', session);

            if (session) {
                const userData = await auth.getCurrentUser()
                console.log('User data:', userData);

                if (userData) {
                    dispatch(userLogin(userData))
                    navigate('/')
                }
            }

        } catch (err) {
            console.error('Login error:', err);
            setError(err?.message || 'Login failed')
        }
    }



    return (
        <div className='flex items-center justify-center w-full  '>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 shadow-lg`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block  bg-gray-700 rounded-full  w-100px">
                        <Logo />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to='/signup'
                        className='font-medium text-blue-600 transition-all duration-200 hover:underline'
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label='Email: '
                            placeholder='Enter your email'
                            type='email'
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}

                        <Input
                            label='Password: '
                            type='password'
                            placeholder='Enter your password'
                            {...register('password', {
                                required: true,
                            })}
                        />
                        {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>}

                        <Button
                            type='submit'
                            className='w-50 hover:bg-blue-600 hover:text-white font-medium'
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login