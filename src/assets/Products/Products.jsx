import React, { useState, useEffect } from "react";
import "../Products/Products.scss";
import Cart from "../Cart/Cart";
export default function Products({ data, cart }) {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
const handleShowCart = () => {
    setShowCart(true);
  };
 const handleHideCart = () => {
    setShowCart(false);
  };
const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formatter.format(amount);
  };


  const addToCart = (product) => {
    const existingProductIndex = cartItems.findIndex((item) => item.id === product.id);
    
    if (existingProductIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingProductIndex] = {
        ...updatedCart[existingProductIndex],
        quantity: updatedCart[existingProductIndex].quantity + 1
      };
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cartItems, { ...product, quantity: 1 }];
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };


 useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);
  }, []);
 return (
    <>
      <nav>
        <div>
          <span>Trang chủ</span>
          <span>Danh sách sản phẩm</span>
        </div>
        <div>
          <i
            className="fa-solid fa-cart-shopping shop"
            onClick={showCart ? handleHideCart : handleShowCart}
          >
            {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
          </i>
          {showCart && <Cart cart={cart} cartItems={cartItems}/>}
        </div>
      </nav>
      <h1>Danh sách sản phẩm</h1>
      <div className="all">
        {data.map((product) => (
          <div key={product.id} className="container">
            <img src={product.image} alt={product.product_name} />
            <h3>{product.name}</h3>
            <p>{formatCurrency(product.price)}</p>
            <button onClick={() => addToCart(product)}>
              <i className="fa-solid fa-cart-shopping add"></i>Thêm vào giỏ hàng
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
