
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
        console.log("App: User is not logged in (Guest)", error);
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  return !loading ? (
    <div className='w-full min-h-screen flex flex-col bg-gray-400'>
      <Header />
      <main className='grid-flow-row'>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null
}

export default App
