import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index.js'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaBars, FaTimes } from 'react-icons/fa'

// import { Navigate } from 'react-router-dom'


function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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
    <header className="py-3 shadow bg-gray-800 text-white relative z-50">
      <Container>
        <nav className='flex items-center justify-between'>
          <div className='mr-4'>
            <Link to="/">
              <Logo width='70px' />
            </Link>
          </div>

          <div className='md:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='text-2xl focus:outline-none'
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <ul className={`
            md:flex md:items-center md:static md:w-auto md:bg-transparent md:translate-x-0
            absolute top-full left-0 w-full bg-gray-800 flex-col md:flex-row
            transition-all duration-300 ease-in
            ${isMenuOpen ? 'flex translate-x-0' : 'hidden md:flex'}
          `}>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className='md:ml-4'>
                  <button
                    onClick={() => {
                      navigate(item.slug)
                      setIsMenuOpen(false)
                    }}
                    className="block w-full text-left px-6 py-2 duration-200 hover:bg-blue-200 hover:text-gray-800 rounded-full md:inline-block md:w-auto"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li className='md:ml-4 px-6 py-2 md:px-0 md:py-0'>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header