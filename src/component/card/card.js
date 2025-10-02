import React from 'react';
import PropTypes from 'prop-types';
import styles from './card.module.css';
const Card = ({ product, onAddToCart }) => {
    return (
        <div className={styles.card}>
            <img
                src={product.image}
                alt={product.name}
                className={styles.cardImage}
            />
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{product.name}</h3>
                <p
                    className={styles.cardDescription}>{product.description}</p>
                <div className={styles.cardPrice}>Rp
                    {product.price.toLocaleString('id-ID')}</div>
                <button
                    className={styles.cardButton}
                    onClick={() => onAddToCart(product)}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

Card.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        description: PropTypes.string,
        image: PropTypes.string,
        category: PropTypes.string,
    }).isRequired,
    onAddToCart: PropTypes.func.isRequired,
};

export default Card;
