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
    <button onClick={handlerLogout} className=' text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300'>Logout</button>
  )
}

export default LogoutBtn