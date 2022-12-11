import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookie from 'js-cookie'
import { login } from '../data/auth'
import { useDispatch } from 'react-redux'

const initialState = {
    email: '',
    password: ''
}


const Login = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [Login, setLogin] = useState(initialState)

    const handleInput = (e) => {
        setLogin({
            ...Login,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch('http://localhost:4000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Login)
        })
        const { token, user } = await res.json()
        if (res.ok) {
            Cookie.set('token', token)
            dispatch(login(user))
            navigate('/')
        } else {
            setLogin(initialState)
            alert('Invalid Credentials')
        }
    }

    return (
        <div className='min-h-screen bg-black z-0'>
            <div className='flex flex-col max-w-sm mx-auto pt-20 md:max-w-md'>
                <div className='flex flex-col break-words bg-white border-2 shadow-lg shadow-white mt-20 rounded-lg'>
                    <div className='bg-gray-400 text-gray-700 uppercase text-center py-5 px-6 mb-0'>
                        Login
                    </div>
                    <form onSubmit={handleSubmit} className='py-10 px-5'>
                        <div className='flex flex-wrap mb-6'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>
                                Email:
                            </label>
                            <input onChange={handleInput} type='email' name='email' value={Login.email} className='p-3 bg-gray-200 rounded form-input w-full' />
                        </div>
                        <div className='flex flex-wrap mb-10'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>
                                Password:
                            </label>
                            <input onChange={handleInput} type='password' name='password' value={Login.password} className='p-3 bg-gray-200 rounded form-input w-full' />
                        </div>
                        <div className='flex flex-wrap'>
                            <button type='submit' className='bg-gray-900 text-white p-3 w-full rounded font-medium hover:bg-gray-700'>
                                Login
                            </button>
                        </div>
                        <div className='flex justify-around mt-6'>
                            <div>
                                <Link to='/forgot-password' className='text-gray-700 text-sm font-bold mb-2'>
                                    Forgot Password?
                                </Link>
                            </div>
                            <div>
                                <Link to='/register' className='text-gray-700 text-sm font-bold mb-2 text-right'>
                                    Don't have an account?
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login