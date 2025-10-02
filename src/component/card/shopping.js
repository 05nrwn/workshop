import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './card.module.css';

const initialProducts = [
];

function ShoppingCart({ cart = [], onAddToCart, onRemoveFromCart, showProducts = false }) {
    // Remove local cart state since it will be managed by parent component
    const [products] = useState(initialProducts);

    const addToCart = (product) => {
        if (onAddToCart) {
            onAddToCart(product);
        }
    };

    const removeFromCart = (productId) => {
        if (onRemoveFromCart) {
            onRemoveFromCart(productId);
        }
    };

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Products</h2>
            <div className={styles.grid}>
                {products.map((product) => (
                    <div key={product.id} className={styles.card}>
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>{product.name}</h3>
                            <div className={styles.cardPrice}>${product.price.toFixed(2)}</div>
                            <button
                                className={styles.cardButton}
                                onClick={() => addToCart(product)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className={styles.title}>Shopping Cart</h2>
            {cart.length === 0 ? (
                <div className={styles.card}>
                    <div className={styles.cardContent}>
                        <p className={styles.cardDescription}>Your cart is empty.</p>
                    </div>
                </div>
            ) : (
                <div className={styles.grid}>
                    {cart.map((item) => (
                        <div key={item.id} className={styles.card}>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{item.name}</h3>
                                <p className={styles.cardDescription}>
                                    Quantity: {item.quantity}
                                </p>
                                <div className={styles.cardPrice}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                                <button
                                    className={styles.cardButton}
                                    onClick={() => removeFromCart(item.id)}
                                    style={{ backgroundColor: '#e74c3c' }}
                                    onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.card} style={{ marginTop: '2rem', textAlign: 'center' }}>
                <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle} style={{ fontSize: '2rem', color: '#27ae60' }}>
                        Total: ${total.toFixed(2)}
                    </h3>
                </div>
            </div>
        </div>
    );
}

ShoppingCart.propTypes = {
    cart: PropTypes.array,
    onAddToCart: PropTypes.func,
    onRemoveFromCart: PropTypes.func,
    showProducts: PropTypes.bool,
};

ShoppingCart.defaultProps = {
    cart: [],
    showProducts: false,
};

export default ShoppingCart;
