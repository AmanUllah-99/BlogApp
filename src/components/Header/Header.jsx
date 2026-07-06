import React, { useState } from 'react'
import Container from '../container/Container.jsx'
import Logo from '../logo.jsx'
import LogoutBtn from './LogoutBtn.jsx'
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
  const handleSearch = (e) => {
    e.preventDefault()
    const query = new FormData(e.target).get('searchQuery')
    if(query) {
      navigate(`/search?q=${encodeURIComponent(query)}`)
      setIsMenuOpen(false)
    }
  }

  return (
    <>
      
      {/* Top Navbar (Scrolls away) */}
      <div className="border-b border-[var(--color-cream-200)] py-4 bg-white text-[var(--text-primary)]">
        <Container>
          <div className='flex items-center justify-between'>
            {/* Logo */}
            <div className='mr-4'>
              <Link to="/">
                <Logo width='150px' />
              </Link>
            </div>

            {/* Desktop Search */}
            <div className='hidden md:block flex-grow max-w-md mx-8'>
              <form onSubmit={handleSearch} className="relative w-full">
                <input 
                  type="text" 
                  name="searchQuery"
                  placeholder="Search articles..." 
                  className="w-full pl-4 pr-10 py-2 rounded-full border border-[var(--color-cream-200)] bg-[var(--bg-primary)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] text-sm transition-all"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--accent-primary)]">
                  🔍
                </button>
              </form>
            </div>

            {/* Mobile Toggle Button */}
            <div className='md:hidden'>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className='text-2xl focus:outline-none text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors'
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Navbar (Sticks to top) */}
      <nav className={`
          sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-[var(--color-cream-200)]
          md:block ${isMenuOpen ? 'block' : 'hidden'} 
          left-0 w-full text-[var(--text-primary)]
      `}>
        <Container>
          <div className="py-2 flex flex-col md:flex-row md:items-center justify-between">
            
            {/* Mobile Search (Shows only on mobile inside menu) */}
            <div className='md:hidden px-4 py-4 border-b border-[var(--color-cream-200)] mb-2'>
              <form onSubmit={handleSearch} className="relative w-full">
                <input 
                  type="text" 
                  name="searchQuery"
                  placeholder="Search articles..." 
                  className="w-full pl-4 pr-10 py-2 rounded-full border border-[var(--color-cream-200)] bg-[var(--bg-primary)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] text-sm transition-all"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--accent-primary)]">
                  🔍
                </button>
              </form>
            </div>

            {/* Nav Links */}
            <ul className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto gap-1 md:gap-4 px-2 md:px-0">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name} className="w-full md:w-auto">
                    <button
                      onClick={() => {
                        navigate(item.slug)
                        setIsMenuOpen(false)
                      }}
                      className="block w-full text-left px-4 py-3 md:py-2 text-[var(--text-secondary)] font-medium duration-300 hover:bg-[var(--bg-secondary)] hover:text-[var(--accent-primary)] rounded-full md:inline-block md:w-auto capitalize"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
            </ul>

            {/* Action Buttons */}
            {authStatus && (
              <div className='px-6 py-4 md:px-0 md:py-0 mt-2 md:mt-0 border-t border-[var(--color-cream-200)] md:border-none'>
                <LogoutBtn />
              </div>
            )}
          </div>
        </Container>
      </nav>
    </>
  )
}

export default Header