import { Link } from 'react-router-dom';
import { clearCart, decreaseQuantity, increaseQuantity, removeFromCart } from '../../store/cartSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import './style.css';

export default function Cart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalSum = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2>Cart</h2>
        <p>{totalQuantity} items in order</p>
      </div>

      {items.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link to="/books">Go to books</Link>
        </div>
      ) : (
        <section className="cart-content">
          <ul className="cart-list">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-main">
                  <h3>{item.title}</h3>
                  <p className="cart-type">{item.type}</p>
                </div>

                <div className="cart-controls">
                  <button type="button" onClick={() => dispatch(decreaseQuantity(item.id))}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => dispatch(increaseQuantity(item.id))}>
                    +
                  </button>
                </div>

                <div className="cart-prices">
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <button
                  type="button"
                  className="cart-remove"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <aside className="cart-summary">
            <h3>Order summary</h3>
            <p>Total items: {totalQuantity}</p>
            <p>Total price: ${totalSum.toFixed(2)}</p>
            <button type="button" onClick={() => dispatch(clearCart())}>
              Clear cart
            </button>
          </aside>
        </section>
      )}
    </div>
  );
}
