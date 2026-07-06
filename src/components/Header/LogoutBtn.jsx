 import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { userLogout } from '../../store/authSlice'
 
 

function LogoutBtn() {
    const dispatch = useDispatch()

    const handlerLogout = ()=>{
        authService.userLogout()
        .then(()=>{
            dispatch(userLogout())
        })
        .catch((error)=>{
            console.log("Logout error::" ,error  )
            throw error
        })
    }
  return (
    <button onClick={handlerLogout} className='px-6 py-2 rounded-full font-medium text-[var(--accent-primary)] border border-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md'>Logout</button>
  )
}

export default LogoutBtn