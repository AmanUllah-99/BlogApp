import React, { useState } from 'react'
import auth from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { userLogin } from '../store/authSlice'
import Button from './Button.jsx'
import Input from './Input.jsx'
import Logo from './logo.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

function SignUp() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = useState('')

    const signup = async (data) => {
        setError('')
        try {
            console.log('Signup attempt with:', data);
            const userData = await auth.createAccount(data)
            console.log('User account created:', userData);
            if (userData) {
                const user = await auth.getCurrentUser()
                console.log('User data:', user);
                if (user) {
                    dispatch(userLogin(user))
                    navigate('/')
                }
            }

        } catch (err) {
            console.error('Signup error:', err);
            setError(err?.message || 'Signup failed')
        }
    }
    return (
        <div className="flex items-center justify-center w-full py-16 px-4">
            <div className={`mx-auto w-full max-w-lg bg-white/80 backdrop-blur-md rounded-2xl p-8 sm:p-10 border border-[var(--color-cream-200)] shadow-[0_8px_30px_rgb(0,0,0,0.04)]`}>
                <div className="mb-8 flex justify-center">
                    <span className="inline-block">
                        <Logo width="150px" />
                    </span>
                </div>
                <h2 className="text-center text-3xl font-extrabold text-[var(--text-primary)] leading-tight">Create an account</h2>
                <p className="mt-3 text-center text-sm text-[var(--text-secondary)]">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-semibold text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors duration-200 hover:underline"
                    >
                        Sign In here
                    </Link>
                </p>
                {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mt-6 text-sm text-center border border-red-100">{error}</div>}

                <form onSubmit={handleSubmit(signup)} className="mt-8">
                    <div className='space-y-6'>
                        <div>
                            <Input
                                label="Full Name"
                                placeholder="John Doe"
                                {...register("name", {
                                    required: true,
                                })}
                            />
                            {errors.name && <p className='text-rose-500 text-xs font-medium mt-1'>{errors.name.message}</p>}
                        </div>

                        <div>
                            <Input
                                label="Email Address"
                                placeholder="you@example.com"
                                type="email"
                                {...register("email", {
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
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                {...register("password", {
                                    required: true,
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters long'
                                    }
                                })}
                            />
                            {errors.password && <p className='text-rose-500 text-xs font-medium mt-1'>{errors.password.message}</p>}
                        </div>

                        <Button type="submit"
                            className="w-full bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg mt-4">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp