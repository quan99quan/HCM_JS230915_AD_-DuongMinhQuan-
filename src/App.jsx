import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import data from './Data.json';
import Products from './assets/Products/Products'
import Cart from './assets/Cart/Cart';
function App() {
  

  return (
    <>
    <Products data={data} cart={Cart}/>
    </>
  )
}

export default App
