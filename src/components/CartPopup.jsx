import React, { useEffect } from "react";

const CartPopup = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000); // Hide after 2 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="cart-popup">
      {message}
    </div>
  );
};

export default CartPopup;
