  import React from 'react'
  import { useSelector } from 'react-redux'
  import {  Navigate } from 'react-router-dom'
  

 //////// this component is used to protect the routes that require authentication and to redirect the user to the login page if they are not authenticated
 
 function AuthLayout({children , authentication = true}) {
  /// get the authentication status from the redux store
  const authStatus = useSelector (state => state.auth.status)

  //// if the authentication status is null, it means that the authentication status is still being determined, so we can show a loading message or a spinner

  if ( authStatus ===  null){
      return  <h1>loading....</h1>
     
  }

  /// if the user is not authenticated and the page requires authentication, redirect to login
  if (authentication && !authStatus){
    return <Navigate to = "/login" replace={true} />
  }
  //// if the user is authenticated and the page does not require authentication, redirect to home
  if (!authentication && authStatus){
    return <Navigate to = "/" replace={true} />
  }

  return <>{children}</>


    
 }
 
 export default AuthLayout