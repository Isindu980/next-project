"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../../store/cartSlice";
import { addFavourite, removeFavourite } from "../../store/favouritesSlice";
import { useRouter } from "next/navigation";

const Store = () => {

  const products = [
    { id: 1, name: 'Men T-shirt', price: 1500, image: '/mentshirt.jpeg' },
    { id: 2, name: 'Women Saree', price: 3500, image: '/saree.jpeg' },
    { id: 3, name: 'Kids Jeans', price: 1800, image: '/kidjean.jpeg' },
    { id: 4, name: 'Men Jacket', price: 4500, image: '/menjacket.jpeg' },
    { id: 5, name: 'Women Blouse', price: 1200, image: '/blouse.jpeg' },
    { id: 6, name: 'Kids T-shirt', price: 900, image: '/kidtshirt.jpeg' },
    { id: 7, name: 'Men Shorts', price: 1300, image: '/menshort.jpeg' },
    { id: 8, name: 'Women Dress', price: 3000, image: '/dress.jpeg' },
    { id: 9, name: 'Kids Pajamas', price: 1100, image: '/kidpajama.jpeg' },
    { id: 10, name: 'Men Formal Shirt', price: 2500, image: '/menfshirt.jpeg' },
    { id: 11, name: 'Women Skirt', price: 2200, image: '/womenskirt.jpeg' },
    { id: 12, name: 'Kids Hoodie', price: 1700, image: '/kidhoodie.jpeg' },
    { id: 13, name: 'Men Blazer', price: 5000, image: '/menblazer.jpeg' },
    { id: 14, name: 'Women Trousers', price: 2600, image: '/womentrouser.jpeg' },
    { id: 15, name: 'Kids Cap', price: 800, image: '/kidcap.jpeg' },
    { id: 16, name: 'Men Jeans', price: 3200, image: '/menjeans.jpeg' },
    { id: 17, name: 'Women Scarf', price: 1000, image: '/womenscarf.jpeg' },
    { id: 18, name: 'Kids Shorts', price: 900, image: '/kidsshort.jpeg' },
    { id: 19, name: 'Men Hoodie', price: 2900, image: '/menhoodie.jpeg' },
    { id: 20, name: 'Women Cardigan', price: 4000, image: '/womencardigan.jpeg' }
];


  const cart = useSelector((state) => state.cart.items);
  const favourites = useSelector((state) => state.favourites.items);
  const dispatch = useDispatch();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavouritesOpen, setIsFavouritesOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const token = useSelector((state) => state.auth.token); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();


  // check if user is logged in 
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

  // add to cart using dispatch in redux
  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  // remove from cart using dispatch in redux
  const handleRemoveFromCart = (id) => {
    dispatch(removeItem(id));
  };
  // calculate total quantity and amount of products in cart
const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
const totalAmount = cart.reduce(
  (acc, item) => acc + item.price * item.quantity,
    0
  );
  
    // toggle cart
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // add to favourites using dispatch in redux
  const handleAddToFavourites = (product) => {
    if (favourites.find((item) => item.id === product.id)) {
      dispatch(removeFavourite(product.id));
    } else {
      dispatch(addFavourite(product));
    }
  };

  // toggle favourites
  const toggleFavourites = () => {
    setIsFavouritesOpen(!isFavouritesOpen);
  };

  // handle image click to preview image
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeImagePreview = () => {
    setSelectedImage(null);
  };

  // handle search change
  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  // filter products based on search keyword
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "'Inter', sans-serif",
        backgroundColor: "#f9fafb",
        
      }}
    >
      <h1
        style={{
          fontSize: "36px",
          fontWeight: "800",
          color: "#1f2937",
          marginBottom: "20px",
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        <span style={{ color: "#6366f1" }}>Rogue</span> Store
      </h1>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchKeyword}
          onChange={handleSearchChange}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "90%",
            maxWidth: "400px",
            marginBottom: "16px",
          }}
        />
        <div style={{ marginTop: "16px" }}>
          <button
            style={{
              backgroundColor: "#10b981",
              color: "#ffffff",
              padding: "8px 16px",
              borderRadius: "4px",
              marginRight: "8px",
            }}
            onClick={toggleCart}
          >
            Cart ({totalQuantity})
          </button>
          <button
            style={{
              backgroundColor: "#f59e0b",
              color: "#ffffff",
              padding: "8px 16px",
              borderRadius: "4px",
            }}
            onClick={toggleFavourites}
          >
            Favourites ({favourites.length})
          </button>
        </div>
      </div>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "16px",
          padding: 0,
          listStyleType: "none",
        }}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <li
              key={product.id}
              style={{
                border: "1px solid #ccc",
                padding: "16px",
                borderRadius: "8px",
                textAlign: "center",
                backgroundColor: "#ffffff",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  maxWidth: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  margin: "auto",
                  cursor: "pointer",
                }}
                onClick={() => handleImageClick(product.image)}
              />
              <div style={{ marginTop: "8px" }}>
                <span
                  style={{ display: "block", fontWeight: "bold", fontSize: "14px" }}
                >
                  {product.name}
                </span>
                <span>LKR {product.price}</span>
              </div>
              <div style={{ marginTop: "8px" }}>
                <button
                  style={{
                    backgroundColor: "#3b82f6",
                    color: "#ffffff",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    marginRight: "4px",
                  }}
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <button
                  style={{
                    backgroundColor: favourites.find((item) => item.id === product.id)
                      ? "#ef4444"
                      : "#10b981",
                    color: "#ffffff",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    marginTop: "8px",
                  }}
                  onClick={() => handleAddToFavourites(product)}
                >
                  {favourites.find((item) => item.id === product.id)
                    ? "Remove"
                    : "Favourites"}
                </button>
              </div>
            </li>
          ))
        ) : (
          <p style={{ fontSize: "16px", color: "#6b7280", textAlign: "center" }}>
            No products found.
          </p>
        )}
      </ul>
      {isCartOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "16px",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "400px",
              textAlign: "center",
            }}
          >
            <h2>Cart</h2>
            {cart.length > 0 ? (
              <>
                <ul
                  style={{
                    listStyleType: "none",
                    padding: 0,
                    marginBottom: "16px",
                  }}
                >
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <span>
                        {item.name} - {item.quantity}
                      </span>
                      <button
                        style={{
                          backgroundColor: "#ef4444",
                          color: "#ffffff",
                          padding: "4px 8px",
                          borderRadius: "4px",
                        }}
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <p>Total: LKR {totalAmount.toFixed(2)}</p>
              </>
            ) : (
              <p>Your cart is empty</p>
            )}
            <button
              style={{
                backgroundColor: "#3b82f6",
                color: "#ffffff",
                padding: "8px 16px",
                borderRadius: "4px",
              }}
              onClick={toggleCart}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isFavouritesOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "16px",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "400px",
              textAlign: "center",
            }}
          >
            <h2>Favourites</h2>
            {favourites.length > 0 ? (
              <>
                <ul
                  style={{
                    listStyleType: "none",
                    padding: 0,
                    marginBottom: "16px",
                  }}
                >
                  {favourites.map((item) => (
                    <li
                      key={item.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <span>{item.name}</span>
                      <button
                        style={{
                          backgroundColor: "#ef4444",
                          color: "#ffffff",
                          padding: "4px 8px",
                          borderRadius: "4px",
                        }}
                        onClick={() => handleAddToFavourites(item)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>Your favourites list is empty</p>
            )}
            <button
              style={{
                backgroundColor: "#3b82f6",
                color: "#ffffff",
                padding: "8px 16px",
                borderRadius: "4px",
              }}
              onClick={toggleFavourites}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {selectedImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "#ffffff",
              padding: "16px",
              borderRadius: "8px",
              maxWidth: "90vw",
              maxHeight: "90vh",
              textAlign: "center",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                fontSize: "24px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={closeImagePreview}
            >
              &times;
            </span>
            <img
              src={selectedImage}
              alt="Product Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
                margin: "auto",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;