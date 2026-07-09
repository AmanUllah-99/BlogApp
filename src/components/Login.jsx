 import React, { useState } from 'react'
import auth from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { userLogin } from '../store/authSlice'
import Button from './Button.jsx'
import Input from './Input.jsx'
import Logo from './logo.jsx'
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
        <div className='flex flex-col lg:flex-row items-center lg:items-start justify-center w-full py-16 px-4 gap-8 max-w-6xl mx-auto'>
            {/* Login Form Box */}
            <div className={`w-full max-w-lg bg-white/80 backdrop-blur-md rounded-2xl p-8 sm:p-10 border border-[var(--color-cream-200)] shadow-[0_8px_30px_rgb(0,0,0,0.04)]`}>
                <div className="mb-8 flex justify-center">
                    <span className="inline-block">
                        <Logo width="150px" />
                    </span>
                </div>
                <h2 className='text-center text-3xl font-extrabold text-[var(--text-primary)] leading-tight'>Welcome back</h2>
                <p className='mt-3 text-center text-sm text-[var(--text-secondary)]'>
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to='/signup'
                        className='font-semibold text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors duration-200 hover:underline'
                    >
                        Create an account
                    </Link>
                </p>
                {error && <div className='bg-red-50 text-red-600 p-4 rounded-xl mt-6 text-sm text-center border border-red-100'>{error}</div>}

                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-6'>
                        <div>
                            <Input
                                label='Email Address'
                                placeholder='you@example.com'
                                type='email'
                                {...register('email', {
                                    required: true,
                                    validate: {
                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Please enter a valid email address",
                                    }
                                })}
                            />
                            {errors.email && <p className='text-rose-500 text-xs font-medium mt-1'>{errors.email.message}</p>}
                        </div>

                        <div>
                            <Input
                                label='Password'
                                type='password'
                                placeholder='••••••••'
                                {...register('password', {
                                    required: true,
                                })}
                            />
                            {errors.password && <p className='text-rose-500 text-xs font-medium mt-1'>{errors.password.message}</p>}
                        </div>

                        <Button
                            type='submit'
                            className='w-full bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg mt-4'
                        >
                            Sign In
                        </Button>
                    </div>
                </form>
            </div>

            {/* Demo Credentials Box */}
            <div className="w-full max-w-sm bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-[var(--color-cream-200)] shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:mt-0">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Demo Access</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
                    Want to explore the project without creating an account? Use these demo credentials to sign in instantly.
                </p>
                <div className="space-y-4">
                    <div className="bg-[var(--color-cream-100)] p-4 rounded-xl border border-[var(--color-cream-200)] transition-all hover:shadow-md">
                        <span className="text-xs font-semibold text-[var(--accent-primary)] uppercase tracking-wider block mb-1">Email Address</span>
                        <span className="text-[var(--text-primary)] font-medium select-all">demo@gmail.com</span>
                    </div>
                    <div className="bg-[var(--color-cream-100)] p-4 rounded-xl border border-[var(--color-cream-200)] transition-all hover:shadow-md">
                        <span className="text-xs font-semibold text-[var(--accent-primary)] uppercase tracking-wider block mb-1">Password</span>
                        <span className="text-[var(--text-primary)] font-medium select-all">11223344</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login