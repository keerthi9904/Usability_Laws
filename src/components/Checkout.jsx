// // import { useContext } from 'react';

// // import Modal from './UI/Modal.jsx';
// // import CartContext from '../store/CartContext.jsx';
// // import { currencyFormatter } from '../util/formatting.js';
// // import Input from './UI/Input.jsx';
// // import Button from './UI/Button.jsx';
// // import UserProgressContext from '../store/UserProgressContext.jsx';
// // import useHttp from '../hooks/useHttp.js';
// // import Error from './Error.jsx';

// // const requestConfig = {
// //   method: 'POST',
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// // };

// // export default function Checkout() {
// //   const cartCtx = useContext(CartContext);
// //   const userProgressCtx = useContext(UserProgressContext);

// //   const {
// //     data,
// //     isLoading: isSending,
// //     error,
// //     sendRequest,
// //     clearData
// //   } = useHttp('http://localhost:3000/orders', requestConfig);

// //   const cartTotal = cartCtx.items.reduce(
// //     (totalPrice, item) => totalPrice + item.quantity * item.price,
// //     0
// //   );

// //   function handleClose() {
// //     userProgressCtx.hideCheckout();
// //   }

// //   function handleFinish() {
// //     userProgressCtx.hideCheckout();
// //     cartCtx.clearCart();
// //     clearData();
// //   }

// //   function handleSubmit(event) {
// //     event.preventDefault();

// //     const fd = new FormData(event.target);
// //     const customerData = Object.fromEntries(fd.entries()); // { email: test@example.com }

// //     sendRequest(
// //       JSON.stringify({
// //         order: {
// //           items: cartCtx.items,
// //           customer: customerData,
// //         },
// //       })
// //     );
// //   }

// //   let actions = (
// //     <>
// //       <Button type="button" textOnly onClick={handleClose}>
// //         Close
// //       </Button>
// //       <Button onClick={()=>handleSubmit}>Submit Order</Button>
// //     </>
// //   );

// //   if (isSending) {
// //     actions = <span>Sending order data...</span>;
// //   }

// //   if (data && !error) {
// //     return (
// //       <Modal
// //         open={userProgressCtx.progress === 'checkout'}
// //         onClose={handleFinish}
// //       >
// //         <div className='violation'>
// //           <h2 class = 'red-text' color = 'red'>Success!</h2>
// //           <p>Your order was submitted successfully.</p>
// //           <p>
// //             We will get back to you with more details via email within the next
// //             few minutes.
// //           </p>
// //           <p className="modal-actions">
// //             <Button onClick={handleFinish}>Okay</Button>
// //           </p>
// //         </div>
// //       </Modal>
// //     );
// //   }

// //   return (
// //     <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
// //       <form onSubmit={handleSubmit}>
// //         <h2>Checkout</h2>
// //         <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

// //         <Input label="Full Name" type="text" id="name" />
// //         <Input label="E-Mail Address" type="email" id="email" />
// //         <Input label="Street" type="text" id="street" />
// //         <div className="control-row">
// //           <Input label="Postal Code" type="text" id="postal-code" />
// //           <Input label="City" type="text" id="city" />
// //         </div>

// //         {error && <Error title="Failed to submit order" message={error} />}

// //         <p className="modal-actions">{actions}</p>
// //       </form>
// //     </Modal>
// //   );
// // }


import { useState, useContext } from "react";
import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";
import CartPopup from "./CartPopup.jsx";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    street: "",
    postalCode: "",
    city: "",
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  function handleShowCart() {
    userProgressCtx.hideCheckout(); 
    setTimeout(() => {
      userProgressCtx.showCart(); 
    }, 40); // Delay to ensure checkout modal is properly closed first
  }
  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
    setShowSuccessPopup(false); 
  }

  function handleSubmit(event) {
    event.preventDefault();
  
    if (!formData.name || !formData.email.includes("@") || !formData.street || !formData.postalCode || !formData.city) {
      alert("Please fill in all fields correctly.");
      return;
    }
  
    // Close checkout modal first
    userProgressCtx.hideCheckout();
  
    // Send order request
    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: {
            name: formData.name,
            email: formData.email,
            street: formData.street,
            "postal-code": formData.postalCode,
            city: formData.city,
          },
        },
      })
    );
  
    // Show success popup after a short delay
    setTimeout(() => {
      setShowSuccessPopup(true);
    }, 200);
  }
  
  return (
    <>
      {/* ✅ Success Popup */}
      {showSuccessPopup && (
        <CartPopup 
          message="Your order was submitted successfully! We will email you shortly."
          onClose={handleFinish}
        />
      )}

      <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
        <div className="checkout-container">
          {/* ✅ Progress Indicator */}
          <div className="checkout-steps">
            <div className={`step ${step >= 1 ? "active" : ""}`}>Cart</div>
            <div className={`step ${step >= 2 ? "active" : ""}`}>Shipping</div>
            <div className={`step ${step >= 3 ? "active" : ""}`}>Payment</div>
            <div className={`step ${step === 4 ? "active" : ""}`}>Confirm</div>
          </div>

          {/* ✅ Step 1: Cart Review */}
          {step === 1 && (
            <div className="step1">
              <h2>Your Cart</h2>
              <ul>
                {cartCtx.items.map((item) => (
                  <li key={item.id}>
                    {item.name} - {item.quantity} x {currencyFormatter.format(item.price)}
                  </li>
                ))}
              </ul>
              <p>Total: {currencyFormatter.format(cartTotal)}</p>
              <Button onClick={handleShowCart} style={{ marginRight: '310px' }}>
                Back to Cart
              </Button>
              <Button onClick={() => setStep(2)}>Next</Button>
            </div>
          )}

          {/* ✅ Step 2: Shipping Details */}
          {step === 2 && (
            <div className="step2">
              <h2>Shipping Details</h2>
              <Input label={<span>Full Name <span style={{ color: 'red' }}>*</span></span>} type="text" id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <Input label={<span>E-Mail Address <span style={{ color: 'red' }}>*</span></span>} type="email" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <Input label={<span>Street <span style={{ color: 'red' }}>*</span></span>} type="text" id="street" value={formData.street} onChange={(e) => setFormData({ ...formData, street: e.target.value })} />
              <Input label={<span>Postal Code <span style={{ color: 'red' }}>*</span></span>} type="text" id="postalCode" value={formData.postalCode} onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })} />
              <Input label={<span>City <span style={{ color: 'red' }}>*</span></span>} type="text" id="city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
              <Button onClick={() => setStep(1)} style={{ marginRight: '350px' }}>Back</Button>
              <Button onClick={() => setStep(3)}>Next</Button>
            </div>
          )}

          {/* ✅ Step 3: Payment */}
          {step === 3 && (
            <div className="step3">
              <h2>Payment</h2>
              <p>Payment details will be added here (e.g., card entry).</p>
              <Button onClick={() => setStep(2)} style={{ marginRight: '350px' }}>Back</Button>
              <Button onClick={() => setStep(4)}>Next</Button>
            </div>
          )}

          {/* ✅ Step 4: Confirm & Submit */}
          {step === 4 && (
            <div className="step4">
              <h2>Confirm Order</h2>
              <p>Please review your order before submitting.</p>
              <Button onClick={() => setStep(3)} style={{ marginRight: '310px' }}>Back</Button>
              <Button onClick={handleSubmit}>Submit Order</Button>
            </div>
          )}

          {error && <Error title="Failed to submit order" message={error} />}
        </div>
      </Modal>
    </>
  );
}
