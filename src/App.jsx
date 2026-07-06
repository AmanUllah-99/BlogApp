 
// export default App

import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import { userLogin, userLogout } from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(userLogin(userData))
        } else {
          dispatch(userLogout())
        }
      })
      .catch((error) => {
        // Suppress "missing scopes" error for guests
        console.log("App: User is not logged in (Guest)" , error);
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  return !loading ? (
    <div className='w-full min-h-screen flex flex-col'>
      <Header />
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div className='w-full min-h-screen flex items-center justify-center bg-[var(--bg-primary)]'>
      <div className='flex flex-col items-center animate-pulse'>
        <div className='w-12 h-12 rounded-full border-4 border-t-rose-500 border-rose-100 animate-spin mb-4'></div>
        <h1 className='text-xl font-medium text-[var(--text-primary)]'>Loading your experience...</h1>
      </div>
    </div>
  )
}

export default App
