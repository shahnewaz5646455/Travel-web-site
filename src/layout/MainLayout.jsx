import React from 'react'
import { Outlet, ScrollRestoration } from 'react-router'
import NavBar from '../components/NavBar'
import { ToastContainer } from "react-toastify";

import Footer from '../components/Footer';
export default function MainLayout() {
  return (
    <div data-theme="light" className='bg-[#f6f4f0]'>
      <header>
        <nav className='p-1'>
            <NavBar></NavBar>
        </nav>
        
      </header>
      <main className='min-h-screen'>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
       <ToastContainer position="top-left" />
      <ScrollRestoration></ScrollRestoration>
    </div>
  )
}
