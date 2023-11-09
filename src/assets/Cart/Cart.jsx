// import React,{useState} from 'react'
// import '../Cart/Cart.scss'
// export default function Cart({cartItems }) {
   
//     const [cart, setCart] = useState(cartItems);
   
//     const formatCurrency = (amount) => {
//         const formatter = new Intl.NumberFormat("vi-VN", {
//           style: "currency",
//           currency: "VND",
//         });
//         return formatter.format(amount);
//       };
//     const totalAmount = cartItems.reduce((total, item) => {
//         return total + item.price * item.quantity;
//       }, 0);
  
//   return (
//     <>
//    <div className='cart'>
//         <h4>Cart</h4>
//         <hr />
//         {cartItems.length > 0 ? (
//           <div >
//             {cartItems.map((item) => (
//               <div key={item.id} className='item'>
//                 <img src={item.image} alt="" />
//                 <span>{item.name}</span>
//                 <button >+</button>
//                 <span>{item.quantity}</span>
//                 <button>-</button>
//                 <i class="fa-solid fa-trash-can" ></i>
//               </div>
//             ))}
//             <hr />
//             <div>Tổng tiền: {formatCurrency(totalAmount)}</div>
//           </div>
//         ) : (
//           <p>Chưa có sản phẩm trong giỏ hàng</p>
//         )}
//       </div>
//     </>
//   )
// }

import React, { useState, useEffect } from 'react';
import '../Cart/Cart.scss';
export default function Cart({ cartItems }) {
  const [cart, setCart] = useState(cartItems);
  const updateLocalStorage = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
 const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    return formatter.format(amount);
  };

  const totalAmount = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const handleIncrement = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const handleDecrement = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const handleRemove = (id) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex((item) => item.id === id);
    console.log(index);
    if (index !== -1) {
      updatedCart.splice(index, 1);
      setCart(updatedCart);
      updateLocalStorage(updatedCart);
    }
  };

  useEffect(() => {
    setCart(cartItems);
  }, [cartItems]);

  return (
    <div className='cart'>
      <h4>Cart</h4>
      <hr />
      {cart.length > 0 ? (
        <div>
          {cart.map((item) => (
            <div key={item.id} className='item'>
              <img src={item.image} alt='' />
              <span>{item.name}</span>
              <button onClick={() => handleIncrement(item.id)}>+</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleDecrement(item.id)}>-</button>
              <i className='fa-solid fa-trash-can' onClick={() => handleRemove(item.id)}></i>
            </div>
          ))}
          <hr />
          <div>Tổng tiền: {formatCurrency(totalAmount)}</div>
        </div>
      ) : (
        <p>Chưa có sản phẩm trong giỏ hàng</p>
      )}
    </div>
  );
}


