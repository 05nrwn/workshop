import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from './card';
import styles from './card.module.css';

const CardGrid = ({ onAddToCart }) => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const products = [
        {
            id: 1,
            name: 'Dell UltraSharp U2720Q',
            price: 7000000,
            description: '27-inch 4K USB-C monitor with IPS panel',
            image: 'https://images.tokopedia.net/img/cache/1500/product-1/2020/7/26/11149940/11149940_1322a6b8-11e4-4275-b899-1a2c9939b61b_504_504',
            category: 'dell'
        },
        {
            id: 2,
            name: 'LG 27GL850-B',
            price: 6000000,
            description: '27-inch QHD Nano IPS gaming monitor',
            image: 'https://media.us.lg.com/transform/ecomm-PDPGallery-1100x730/20e47419-f7d2-4e96-b6e8-cda6e902f3c4/md06064916-zoom-03-jpg?io=transform:fill,width:596',
            category: 'lg'
        },
        {
            id: 3,
            name: 'Samsung Odyssey G7',
            price: 8000000,
            description: '32-inch QHD curved gaming monitor',
            image: 'https://images.samsung.com/is/image/samsung/p6pim/au/lc32g75tqsexxy/gallery/au-odyssey-g7-c32g75t-lc32g75tqsexxy-530330431?$684_547_PNG$',
            category: 'samsung'
        },
        {
            id: 4,
            name: 'ASUS ProArt PA278QV',
            price: 6500000,
            description: '27-inch WQHD professional monitor for creators',
            image: 'https://www.asus.com/media/global/gallery/pqaqirssqcmlqufo_setting_xxx_0_90_end_2000.png',
            category: 'asus'
        },
        {
            id: 5,
            name: 'Acer Nitro VG271U',
            price: 5500000,
            description: '27-inch QHD IPS gaming monitor',
            image: 'https://m.media-amazon.com/images/I/81DJ-HL3HzL.jpg',
            category: 'acer'
        },
        {
            id: 6,
            name: 'BenQ PD2700U',
            price: 6000000,
            description: '27-inch 4K UHD designer monitor',
            image: 'https://image.benq.com/is/image/benqco/pd2500q-right45?$ResponsivePreset$&fmt=png-alpha',
            category: 'benq'
        }
    ];
    const categories = [
        { id: 'all', name: 'All Monitors' },
        { id: 'dell', name: 'Dell' },
        { id: 'lg', name: 'LG' },
        { id: 'samsung', name: 'Samsung' },
        { id: 'asus', name: 'ASUS' },
        { id: 'acer', name: 'Acer' },
        { id: 'benq', name: 'BenQ' }
    ];
    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(product => product.category ===
            selectedCategory);
    const handleAddToCart = (product) => {
        if (onAddToCart) {
            onAddToCart(product);
        } else {
            alert(`Added to cart: ${product.name}`);
        }
    };
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Our Services</h2>
            {/* Filter Buttons */}
            <div className={styles.filterSection}>
                {categories.map(category => (
                    <button
                        key={category.id}
                        className={`${styles.filterButton} ${selectedCategory === category.id ? styles.active :
                            ''
                            }`}
                        onClick={() => setSelectedCategory(category.id)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
            {/* Products Grid */}
            <div className={styles.grid}>
                {filteredProducts.map(product => (
                    <Card
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </div>
        </section>
    );
};

CardGrid.propTypes = {
    onAddToCart: PropTypes.func,
};

export default CardGrid;
