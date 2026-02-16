 import React from 'react'
import { Container, Logo, LogoutBtn, } from '../index.js'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// import { Navigate } from 'react-router-dom'


function Header() {
  /// get the authentication status from the redux store

  const authStatus = useSelector((state) => state.auth.status)
  console.log("Auth Status:", authStatus);

  // hook to navigate programmatically

  const navigate = useNavigate()
  // navigation items for the header

  const navItems = [
    {
      name: "home",
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    
      
      
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus
    },
    {
      name: "All Post",
      slug: "/all-posts",
      active: authStatus
    },
    {
      name: "add Post",
      slug: "/add-post",
      active: authStatus
    },

  ]
  return (
    // header component with navigation links
    <header className="py-3   shadow  bg-gray-800 text-white ">
      <Container>
        <nav className='flex'>
          <div className=' mr-4'>
            <Link to="/">
              <Logo width=' 70px' />
            </Link>
          </div>
    

        


          <ul className=' flex ml-auto'>
 
            {navItems.map((item) =>

              item.active ? (<li key={item.name}>

                <button onClick={() => navigate(item.slug)}
                  className=" inline-block px-6 py-2  duration-200  hover:bg-blue-200 rounded-full">
                  {item.name}</button>
              </li>) : null
            )}

             {authStatus && (
              <li>
                < LogoutBtn />
              </li>
            )}


          </ul>
        </nav>

      </Container>

    </header>
  )
}

export default Header