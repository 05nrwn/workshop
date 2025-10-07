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
        },
        // Additional Dell monitors
        {
            id: 7,
            name: 'Dell S3221QS',
            price: 5500000,
            description: '32-inch 4K curved monitor with AMD FreeSync',
            image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/peripherals/monitors/s-series/s3221qs/media-gallery/monitor-s3221qs-gallery-1.psd?fmt=pjpg&pscan=auto&scl=1&wid=3464&hei=2518&qlt=100,1&resMode=sharp2&size=3464,2518&chrss=full&imwidth=5000',
            category: 'dell'
        },
        {
            id: 8,
            name: 'Dell Alienware AW2521H',
            price: 9500000,
            description: '25-inch FHD 360Hz gaming monitor',
            image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/peripherals/monitors/alienware/aw2521h/media-gallery/aw2521h-gallery-1.psd?fmt=pjpg&pscan=auto&scl=1&wid=3583&hei=2681&qlt=100,1&resMode=sharp2&size=3583,2681&chrss=full&imwidth=5000',
            category: 'dell'
        },
        // Additional LG monitors
        {
            id: 9,
            name: 'LG 34WN80C-B',
            price: 8500000,
            description: '34-inch UltraWide QHD curved monitor',
            image: 'https://gscs.lge.com/gscs/ai/file/readFileData.dev?fileId=M7g9GlqiFQBqQDxY4Io22wKwpLQP4gMz&serviceId=SAC',
            category: 'lg'
        },
        {
            id: 10,
            name: 'LG UltraGear 27GN950-B',
            price: 10000000,
            description: '27-inch 4K Nano IPS gaming monitor with 144Hz',
            image: 'https://gscs.lge.com/gscs/ai/file/readFileData.dev?fileId=rZoE3owG1OAiJHM8LCa2eQSy3LGBdxfB&serviceId=SAC',
            category: 'lg'
        },
        // Additional Samsung monitors
        {
            id: 11,
            name: 'Samsung Odyssey G9',
            price: 18000000,
            description: '49-inch Super Ultra-Wide curved gaming monitor',
            image: 'https://images.samsung.com/is/image/samsung/p6pim/au/lc49g95tssexxp/gallery/au-odyssey-g9-c49g95t-lc49g95tssexxp-537438165?$684_547_PNG$',
            category: 'samsung'
        },
        {
            id: 12,
            name: 'Samsung ViewFinity S9',
            price: 15000000,
            description: '27-inch 5K Thunderbolt monitor for creators',
            image: 'https://images.samsung.com/is/image/samsung/p6pim/us/ls27c902paux/gallery/us-viewfinity-s9-ls27c902paux-537859850?$684_547_PNG$',
            category: 'samsung'
        },
        // Additional ASUS monitors
        {
            id: 13,
            name: 'ASUS ROG Swift PG259QN',
            price: 12000000,
            description: '25-inch FHD 360Hz G-SYNC gaming monitor',
            image: 'https://www.asus.com/media/global/gallery/wchgsqgmjgzsjzfs_setting_xxx_0_90_end_2000.png',
            category: 'asus'
        },
        {
            id: 14,
            name: 'ASUS ZenScreen MB16AC',
            price: 4500000,
            description: '15.6-inch portable FHD IPS monitor',
            image: 'https://www.asus.com/media/global/gallery/ufyozgdq59drmqmy_setting_xxx_0_90_end_2000.png',
            category: 'asus'
        },
        // Additional Acer monitors
        {
            id: 15,
            name: 'Acer Predator X34',
            price: 14000000,
            description: '34-inch curved UltraWide gaming monitor',
            image: 'https://static.acer.com/up/Resource/Acer/Monitors/Predator_X34/Images/20150408/Acer_Predator_X34_sku_main.png',
            category: 'acer'
        },
        {
            id: 16,
            name: 'Acer ConceptD CP3271K',
            price: 11000000,
            description: '27-inch 4K HDR professional monitor',
            image: 'https://static.acer.com/up/Resource/Acer/Monitors/ConceptD_CP3/Images/20190425/Acer-ConceptD-CP3271K-P-wallpaper.png',
            category: 'acer'
        },
        // Additional BenQ monitors
        {
            id: 17,
            name: 'BenQ EX3203R',
            price: 8500000,
            description: '32-inch QHD curved HDR gaming monitor',
            image: 'https://image.benq.com/is/image/benqco/ex3203r-front?$ResponsivePreset$&fmt=png-alpha',
            category: 'benq'
        },
        {
            id: 18,
            name: 'BenQ SW321C',
            price: 13000000,
            description: '32-inch 4K HDR photographer monitor',
            image: 'https://image.benq.com/is/image/benqco/sw321c-front-tilt?$ResponsivePreset$&fmt=png-alpha',
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
