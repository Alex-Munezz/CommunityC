import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cartItems, removeFromCart, updateService }) {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-8">
          {cartItems.map(item => (
            <div key={item.id} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-bold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <button
                onClick={() => updateService(item.id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-4 hover:bg-yellow-600"
              >
                Edit Service
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={handleCheckout}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Proceed to Checkout
          </button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default Cart;
