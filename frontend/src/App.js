import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header.js'
import Footer from './components/Footer.js'

const App = () => {
  return (
    <>
      <Header/>
      <main className=''>
        <Container>
            <Outlet/>
        </Container>
      </main>
      <Footer/> 
      <ToastContainer/>
    </>
  ) 
}

export default App