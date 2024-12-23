import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      style={{
        padding: '20px 30px',
        borderBottom: '1px solid #ccc',
        borderRadius: '0 20px 20px 20px',
        position: 'fixed',
        width: '70%',
        zIndex: '100',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        left: '50%',
        transform: 'translateX(-50%)',
        marginTop: '20px',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Rogue</div>
      <div className="desktop-menu" style={{ display: 'flex', gap: '30px' }}>
        <Link href="/Home" style={{ textDecoration: 'none', color: 'inherit' }}>
          Home
        </Link>
        <Link href="/Store" style={{ textDecoration: 'none', color: 'inherit' }}>
          Store
        </Link>
      </div>
      {/* <button
        className="hamburger-menu"
        onClick={toggleMenu}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.5rem',
        }}
      >
        ☰
      </button> */}
      {/* {isOpen && (
        <div
          className="mobile-menu"
          style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '10px',
          }}
        >
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '10px' }}>
            Home
          </Link>
          <Link href="/Store" style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '10px' }}>
            Store
          </Link>
        </div>
      )} */}
      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none;
          }
          .hamburger-menu {
            display: block;
          }
        }
      `}</style>
    </nav>
  );
}
