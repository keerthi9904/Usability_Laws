import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import {FaSearch, FaShoppingCart} from 'react-icons/fa';

import Button from './UI/Button.jsx';
import logoImg from '../assets/logo.jpg';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

export default function Header() {
  const navigate = useNavigate();
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} onClick={() => navigate("/")} className='mainpage-logo' alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>

      <nav className='nav-container'>
      <div className='search-bar'>
        <input type="text" placeholder='  Search item...' />
        <FaSearch className='search-icon' />
      </div>
      <div className="cart-container" onClick={handleShowCart}>
          <FaShoppingCart className='cart-icon' />
          <span className="cart-text">Cart ({totalCartItems})</span>
        </div>
      </nav>
    </header>
  );
}