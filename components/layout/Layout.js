import React from 'react';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import Header from './Header';
import Footer from './Footer';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children, title = 'Book best rooms' }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>

      <Header />
      <ToastContainer position='bottom-right' />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
