import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';

const App = () => {
  const location = useLocation();
  const noHeaderFooterRoutes = ['/login', '/register'];

  const hideHeaderFooter = noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Header />}

      <main className={hideHeaderFooter ? 'p-0 m-0' : ''}>
        <Container fluid={hideHeaderFooter} className={hideHeaderFooter ? 'p-0 m-0' : ''}>
          <Outlet />
        </Container>
      </main>

      {!hideHeaderFooter && <Footer />}
      <ToastContainer />
    </>
  );
};

export default App;
