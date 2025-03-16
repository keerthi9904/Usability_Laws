import { useState, useContext } from 'react';
import CartPopup from "./CartPopup.jsx";
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';

export default function MealItem({ meal }) {
  const [popup, setPopup] = useState(false);
  const cartCtx = useContext(CartContext);

  const cartItem = cartCtx.items.find(item => item.id === meal.id);
  const itemQuantity = cartItem ? cartItem.quantity : 0;

  function handleAddMealToCart() {
    cartCtx.addItem(meal);
    console.log(`${meal.name} added to cart`);
    setPopup(true);
    setTimeout(() => { setPopup(false); }, 2000);
  }

  function handleRemoveMealFromCart() {
    cartCtx.removeItem(meal.id);
  }

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          {itemQuantity > 0 ? (
            <div className="counter">
              <button onClick={handleRemoveMealFromCart}>-</button>
              <span>{itemQuantity}</span>
              <button onClick={handleAddMealToCart} >+</button>
            </div>
          ) : (
            <Button onClick={handleAddMealToCart}>Add to Cart</Button>
          )}
        </p>
        {popup && <CartPopup message="Item added to cart!" onClose={() => setPopup(false)} />}
      </article>
    </li>
  );
}
