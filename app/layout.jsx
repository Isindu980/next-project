'use client';

import { Provider } from 'react-redux';
import store from '../store/store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Provider store={store}>{children}</Provider>
        <Footer />
      </body>
    </html>
  );
}
