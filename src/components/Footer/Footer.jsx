 import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../logo.jsx'
// Footer component for the blog application

function Footer() {
  // Footer section with company info and navigation links
  return (
    <section className="relative overflow-hidden py-10 bg-[var(--bg-secondary)] border-t border-[var(--color-cream-200)] text-[var(--text-primary)]">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 flex justify-center md:justify-start">
                <Logo width="180px" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-secondary)] text-left">
                  &copy; Copyright {new Date().getFullYear()}. All Rights Reserved by Amaan.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-6 text-xs font-bold uppercase text-[var(--accent-primary)]">
                Company
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-[var(--text-secondary)] hover:text-[var(--accent-hover)] transition-colors duration-200"
                    to="/"
                  >
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-[var(--text-secondary)] hover:text-[var(--accent-hover)] transition-colors duration-200"
                    to="/"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-[var(--text-secondary)] hover:text-[var(--accent-hover)] transition-colors duration-200"
                    to="/"
                  >
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-[var(--text-secondary)] hover:text-[var(--accent-hover)] transition-colors duration-200"
                    to="/"
                  >
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-6 text-xs font-bold uppercase text-[var(--accent-primary)]">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-[var(--text-secondary)] hover:text-[var(--accent-hover)] transition-colors duration-200"
                    to="/"
                  >
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-[var(--text-secondary)] hover:text-[var(--accent-hover)] transition-colors duration-200"
                    to="/"
                  >
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-[var(--text-secondary)] hover:text-[var(--accent-hover)] transition-colors duration-200"
                    to="/"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-[var(--text-secondary)] hover:text-[var(--accent-hover)] transition-colors duration-200"
                    to="/"
                  >
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-6 text-xs font-bold uppercase text-[var(--accent-primary)]">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-[var(--text-secondary)] hover:text-[var(--accent-hover)] transition-colors duration-200"
                    to="/"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-[var(--text-secondary)] hover:text-[var(--accent-hover)] transition-colors duration-200"
                    to="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-[var(--text-secondary)] hover:text-[var(--accent-hover)] transition-colors duration-200"
                    to="/"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer