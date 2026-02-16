import React, { useState } from 'react'
import auth from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { userLogin } from '../store/authSlice'
import { Button, Input, Logo } from '../components/index.js'
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
        <div className="flex items-center justify-center w-full bg-gray-700 ">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 shadow-lg`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full bg-gray-700 rounded-full max-w-100px">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-blue-600 transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(signup)} className="mt-8">
                    <div className='space-y-5'>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>}

                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}

                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters'
                                }
                            })}
                        />
                        {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>}

                        <Button type="submit"
                            className="w-50 hover:bg-blue-600 hover:text-white font-medium  ">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default SignUp