"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Home() {
  const token = useSelector((state) => state.auth.token); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      router.push("/");
    }
  }, [token, router]); 

  if (!isLoggedIn) {
    return null;
  }

  const handleShopNowbutton = () => {
    router.push("/Store");
  };
  return (
    <div>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: "Poppins", sans-serif;
          background-color: #f9fafb;
          color: #333;
        }
        .hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #f7f7f7, #e0e0e0); /* Lighter gradient closer to white */
  color: #333; /* Darker text color for contrast */
  text-align: center;
  padding: 0 1rem;
}

.hero h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0.5rem 0;
}

.hero p {
  font-size: 1.2rem;
  margin: 1rem 0;
}

.hero .cta-button {
  margin-top: 1rem;
  padding: 0.75rem 2rem;
  background: white;
  color: #ff6f61;
  border: none;
  border-radius: 50px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hero .cta-button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

        .collections {
          padding: 2rem 1rem;
          background: #fff;
          text-align: center;
        }
        .collections h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #ff6f61;
        }
        .product-grid {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .product-card {
          width: 250px;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: transform 0.2s ease;
        }
        .product-card:hover {
          transform: translateY(-5px);
        }
        .product-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        .product-card .info {
          padding: 1rem;
        }
        .product-card h3 {
          font-size: 1.2rem;
          margin: 0.5rem 0;
        }
        .categories {
          padding: 2rem 1rem;
          background: #f3f4f6;
        }
        .categories h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #ff6f61;
          text-align: center;
        }
        .category-grid {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .category-card {
          width: 300px;
          position: relative;
          overflow: hidden;
          border-radius: 10px;
        }
        .category-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .category-card:hover img {
          transform: scale(1.05);
        }
        .category-card .label {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 1rem;
        }
      `}</style>

      <section className="hero flex flex-col justify-center items-center h-screen bg-gradient-to-b from-[#f0f0f0] to-[#e0e0e0] text-black text-center p-4">
       <h1 className="text-4xl font-bold mb-2">Welcome to Rogue Store</h1>
        <p className="text-xl mb-4">Your style, your story. Discover our collections now.</p>
        <button className="cta-button mt-4 py-3 px-8 bg-pink-600 text-white rounded-full font-bold text-lg transition-transform transform hover:scale-105 hover:shadow-lg"
         onClick={handleShopNowbutton}>
         Shop Now
        </button>
      </section>



      <section className="collections">
        <h2>Featured Products</h2>
        <div className="product-grid">
          <div className="product-card">
            <img src="/suit.jpeg" alt="Checkered Suit" />
            <div className="info">
              <h3>Checkered Suit</h3>
              <p>LKR 3900.00</p>
            </div>
          </div>
          <div className="product-card">
            <img src="/bluedresss.jpeg" alt="Blue Dress" />
            <div className="info">
              <h3>Blue Dress</h3>
              <p>LKR 7999.00</p>
            </div>
          </div>
          <div className="product-card">
            <img src="/leathers.jpeg" alt="Leather Skirt" />
            <div className="info">
              <h3>Leather Skirt</h3>
              <p>LKR 4050.00</p>
            </div>
          </div>
        </div>
      </section>

      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          <div className="category-card">
            <img src="/coats.jpeg" alt="Coats" />
            <div className="label">Coats</div>
          </div>
          <div className="category-card">
            <img src="/jacketss.jpeg" alt="Jackets" />
            <div className="label">Jackets</div>
          </div>
          <div className="category-card">
            <img src="/purse.jpeg" alt="Purses" />
            <div className="label">Purses</div>
          </div>
        </div>
      </section>
    </div>
  );
}
