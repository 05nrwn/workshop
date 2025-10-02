import React, { useState } from 'react';
import CardGrid from './cardGrid';
import ShoppingCart from './shopping';
import styles from './card.module.css';

const ShoppingApp = () => {
    const [cart, setCart] = useState([]);
    const [selectedItems, setSelectedItems] = useState(new Set()); // Track selected items for checkout
    const [currentView, setCurrentView] = useState('products'); // 'products', 'cart', or 'checkout'
    const [buyerInfo, setBuyerInfo] = useState({
        name: '',
        address: '',
        city: '',
        zipCode: '',
        phoneNumber: '',
        paymentMethod: 'credit-card'
    });
    const [discountCode, setDiscountCode] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState(0);

    // Available discount codes
    const discountCodes = {
        'SAVE10': 10,
        'WELCOME20': 20,
        'FIRST15': 15,
        'STUDENT': 25
    };

    const handleAddToCart = (product) => {
        setCart((prevCart) => {
            const existing = prevCart.find((item) => item.id === product.id);
            if (existing) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Auto-select new items when added to cart
                setSelectedItems(prev => new Set([...prev, product.id]));
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });

        // Show a brief notification
        alert(`${product.name} added to cart!`);
    };

    const handleRemoveFromCart = (productId) => {
        setCart((prevCart) => {
            const updatedCart = prevCart
                .map((item) =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0);
            
            // Remove from selected items if item is completely removed from cart
            const itemStillInCart = updatedCart.find(item => item.id === productId);
            if (!itemStillInCart) {
                setSelectedItems(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(productId);
                    return newSet;
                });
            }
            
            return updatedCart;
        });
    };

    // Handle individual item selection
    const handleItemSelect = (productId) => {
        setSelectedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(productId)) {
                newSet.delete(productId);
            } else {
                newSet.add(productId);
            }
            return newSet;
        });
    };

    // Handle select all / deselect all
    const handleSelectAll = () => {
        if (selectedItems.size === cart.length) {
            // Deselect all
            setSelectedItems(new Set());
        } else {
            // Select all
            setSelectedItems(new Set(cart.map(item => item.id)));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBuyerInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleApplyDiscount = () => {
        if (discountCodes[discountCode.toUpperCase()]) {
            setAppliedDiscount(discountCodes[discountCode.toUpperCase()]);
            alert(`Discount code applied! You saved ${discountCodes[discountCode.toUpperCase()]}%`);
        } else {
            setAppliedDiscount(0);
            alert('Invalid discount code. Please try again.');
        }
    };

    const handleCheckout = () => {
        if (selectedItems.size === 0) {
            alert('Please select items to checkout.');
            return;
        }

        if (!buyerInfo.name || !buyerInfo.address || !buyerInfo.phoneNumber) {
            alert('Please fill in all required fields.');
            return;
        }

        const orderSummary = {
            buyer: buyerInfo,
            items: selectedCartItems,
            subtotal: selectedSubtotal.toFixed(2),
            discount: selectedDiscountAmount.toFixed(2),
            total: selectedTotal.toFixed(2),
            orderDate: new Date().toLocaleDateString()
        };

        console.log('Order placed:', orderSummary);
        alert(`Order placed successfully! ${selectedCartItems.length} item(s) purchased. Total: $${selectedTotal.toFixed(2)}`);

        // Remove selected items from cart
        setCart(prevCart => prevCart.filter(item => !selectedItems.has(item.id)));
        setSelectedItems(new Set());
        
        // Reset buyer info and other states
        setBuyerInfo({
            name: '',
            address: '',
            city: '',
            zipCode: '',
            phoneNumber: '',
            paymentMethod: 'credit-card'
        });
        setDiscountCode('');
        setAppliedDiscount(0);
        setCurrentView('products');
    };

    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Calculate totals for selected items only
    const selectedCartItems = cart.filter(item => selectedItems.has(item.id));
    const selectedSubtotal = selectedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const selectedDiscountAmount = (selectedSubtotal * appliedDiscount) / 100;
    const selectedTotal = selectedSubtotal - selectedDiscountAmount;
    
    // Keep original calculations for display purposes
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountAmount = (subtotal * appliedDiscount) / 100;
    const total = subtotal - discountAmount;

    return (
        <div className={styles.container}>
            {/* Navigation */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                marginBottom: '2rem',
                position: 'sticky',
                top: '0',
                backgroundColor: 'white',
                padding: '1rem 0',
                zIndex: 1000
            }}>
                <button
                    className={`${styles.cardButton} ${currentView === 'products' ? styles.active : ''}`}
                    onClick={() => setCurrentView('products')}
                    style={{
                        backgroundColor: currentView === 'products' ? '#2980b9' : '#3498db',
                        minWidth: '150px',
                        position: 'relative'
                    }}
                >
                    Shop Products
                    {cartItemCount > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            backgroundColor: '#e74c3c',
                            color: 'white',
                            borderRadius: '50%',
                            padding: '2px 6px',
                            fontSize: '12px',
                            minWidth: '18px',
                            height: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {cartItemCount}
                        </span>
                    )}
                </button>
                <button
                    className={`${styles.cardButton} ${currentView === 'cart' ? styles.active : ''}`}
                    onClick={() => setCurrentView('cart')}
                    style={{
                        backgroundColor: currentView === 'cart' ? '#2980b9' : '#3498db',
                        minWidth: '150px'
                    }}
                >
                    Full Cart View
                </button>
                <button
                    className={`${styles.cardButton} ${currentView === 'checkout' ? styles.active : ''}`}
                    onClick={() => setCurrentView('checkout')}
                    style={{
                        backgroundColor: currentView === 'checkout' ? '#2980b9' : (selectedItems.size > 0 ? '#27ae60' : '#95a5a6'),
                        minWidth: '150px',
                        cursor: selectedItems.size > 0 ? 'pointer' : 'not-allowed'
                    }}
                    disabled={selectedItems.size === 0}
                >
                    Checkout ({selectedItems.size})
                </button>
            </div>

            {/* Content */}
            {currentView === 'products' ? (
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'start' }}>
                    {/* Products Section */}
                    <div>
                        <CardGrid onAddToCart={handleAddToCart} />
                    </div>
                    
                    {/* Shopping Cart Sidebar */}
                    <div style={{ position: 'sticky', top: '120px' }}>
                        <div className={styles.card}>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle} style={{ textAlign: 'center', marginBottom: '1rem' }}>
                                    Shopping Cart ({cartItemCount})
                                </h3>
                                
                                {cart.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                        <p className={styles.cardDescription} style={{ marginBottom: '1rem' }}>
                                            Your cart is empty
                                        </p>
                                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
                                        <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
                                            Add some products to get started!
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        {/* Cart Items */}
                                        <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '1rem' }}>
                                            {cart.map((item) => (
                                                <div key={item.id} style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    padding: '0.75rem 0',
                                                    borderBottom: '1px solid #ecf0f1'
                                                }}>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ 
                                                            fontWeight: 'bold', 
                                                            color: '#2c3e50',
                                                            fontSize: '0.95rem',
                                                            marginBottom: '0.25rem'
                                                        }}>
                                                            {item.name}
                                                        </div>
                                                        <div style={{ 
                                                            color: '#7f8c8d', 
                                                            fontSize: '0.85rem',
                                                            marginBottom: '0.25rem'
                                                        }}>
                                                            Qty: {item.quantity}
                                                        </div>
                                                        <div style={{ 
                                                            fontWeight: 'bold', 
                                                            color: '#3498db',
                                                            fontSize: '0.9rem'
                                                        }}>
                                                            Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveFromCart(item.id)}
                                                        style={{
                                                            background: '#e74c3c',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '4px',
                                                            padding: '0.5rem',
                                                            cursor: 'pointer',
                                                            fontSize: '0.8rem',
                                                            marginLeft: '0.5rem'
                                                        }}
                                                        onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
                                                        onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Cart Total */}
                                        <div style={{
                                            paddingTop: '1rem',
                                            borderTop: '2px solid #ecf0f1',
                                            textAlign: 'center'
                                        }}>
                                            <div style={{
                                                fontSize: '1.2rem',
                                                fontWeight: 'bold',
                                                color: '#2c3e50',
                                                marginBottom: '1rem'
                                            }}>
                                                Total: Rp {subtotal.toLocaleString('id-ID')}
                                            </div>
                                            
                                            <button
                                                onClick={() => setCurrentView('checkout')}
                                                className={styles.cardButton}
                                                style={{
                                                    width: '100%',
                                                    backgroundColor: '#27ae60',
                                                    padding: '0.75rem',
                                                    fontSize: '1rem',
                                                    fontWeight: 'bold'
                                                }}
                                                disabled={cart.length === 0}
                                            >
                                                Proceed to Checkout
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : currentView === 'cart' ? (
                <div className={styles.container}>
                    <h2 className={styles.title}>Shopping Cart ({cartItemCount} items)</h2>
                    
                    {cart.length === 0 ? (
                        <div className={styles.card}>
                            <div className={styles.cardContent} style={{ textAlign: 'center', padding: '3rem' }}>
                                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
                                <h3 className={styles.cardTitle}>Your cart is empty</h3>
                                <p className={styles.cardDescription} style={{ marginBottom: '2rem' }}>
                                    Browse our products and add items to your cart
                                </p>
                                <button
                                    className={styles.cardButton}
                                    onClick={() => setCurrentView('products')}
                                    style={{ backgroundColor: '#3498db' }}
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Select All / Deselect All */}
                            <div className={styles.card} style={{ marginBottom: '1rem' }}>
                                <div className={styles.cardContent}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}>
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.size === cart.length && cart.length > 0}
                                                onChange={handleSelectAll}
                                                style={{ marginRight: '0.5rem', transform: 'scale(1.2)' }}
                                            />
                                            Select All Items ({selectedItems.size} of {cart.length} selected)
                                        </label>
                                        
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <span style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
                                                Selected Total: <strong style={{ color: '#27ae60' }}>Rp {selectedSubtotal.toLocaleString('id-ID')}</strong>
                                            </span>
                                            <button
                                                className={styles.cardButton}
                                                onClick={() => setCurrentView('checkout')}
                                                style={{
                                                    backgroundColor: selectedItems.size > 0 ? '#27ae60' : '#95a5a6',
                                                    cursor: selectedItems.size > 0 ? 'pointer' : 'not-allowed'
                                                }}
                                                disabled={selectedItems.size === 0}
                                            >
                                                Checkout Selected ({selectedItems.size})
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Cart Items */}
                            <div className={styles.grid}>
                                {cart.map((item) => (
                                    <div key={item.id} className={styles.card} style={{
                                        border: selectedItems.has(item.id) ? '2px solid #27ae60' : '2px solid transparent',
                                        backgroundColor: selectedItems.has(item.id) ? '#d5f4e6' : 'white'
                                    }}>
                                        <div className={styles.cardContent}>
                                            {/* Checkbox */}
                                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.9rem' }}>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedItems.has(item.id)}
                                                        onChange={() => handleItemSelect(item.id)}
                                                        style={{ marginRight: '0.5rem', transform: 'scale(1.1)' }}
                                                    />
                                                    <span style={{ fontWeight: selectedItems.has(item.id) ? 'bold' : 'normal' }}>
                                                        {selectedItems.has(item.id) ? '✓ Selected for checkout' : 'Select for checkout'}
                                                    </span>
                                                </label>
                                            </div>

                                            <h3 className={styles.cardTitle}>{item.name}</h3>
                                            <p className={styles.cardDescription} style={{ marginBottom: '1rem' }}>
                                                Quantity: <strong>{item.quantity}</strong>
                                            </p>
                                            <p className={styles.cardDescription} style={{ marginBottom: '1rem' }}>
                                                Unit Price: <strong>Rp {item.price.toLocaleString('id-ID')}</strong>
                                            </p>
                                            <div className={styles.cardPrice} style={{ marginBottom: '1rem' }}>
                                                Subtotal: Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                                            </div>

                                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between' }}>
                                                <button
                                                    className={styles.cardButton}
                                                    onClick={() => handleAddToCart(item)}
                                                    style={{ 
                                                        backgroundColor: '#3498db',
                                                        flex: 1,
                                                        fontSize: '0.9rem'
                                                    }}
                                                >
                                                    Add More
                                                </button>
                                                <button
                                                    className={styles.cardButton}
                                                    onClick={() => handleRemoveFromCart(item.id)}
                                                    style={{ 
                                                        backgroundColor: '#e74c3c',
                                                        flex: 1,
                                                        fontSize: '0.9rem'
                                                    }}
                                                >
                                                    Remove One
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Cart Summary */}
                            <div className={styles.card} style={{ marginTop: '2rem' }}>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle} style={{ textAlign: 'center', marginBottom: '1rem' }}>
                                        Cart Summary
                                    </h3>
                                    
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                        <div>
                                            <h4 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>All Items</h4>
                                            <p style={{ margin: '0.25rem 0', color: '#7f8c8d' }}>
                                                Total Items: {cart.length}
                                            </p>
                                            <p style={{ margin: '0.25rem 0', color: '#7f8c8d' }}>
                                                Total Quantity: {cartItemCount}
                                            </p>
                                            <p style={{ margin: '0.25rem 0', fontSize: '1.1rem', fontWeight: 'bold', color: '#2c3e50' }}>
                                                Total: Rp {subtotal.toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h4 style={{ color: '#27ae60', marginBottom: '0.5rem' }}>Selected Items</h4>
                                            <p style={{ margin: '0.25rem 0', color: '#7f8c8d' }}>
                                                Selected Items: {selectedItems.size}
                                            </p>
                                            <p style={{ margin: '0.25rem 0', color: '#7f8c8d' }}>
                                                Selected Quantity: {selectedCartItems.reduce((total, item) => total + item.quantity, 0)}
                                            </p>
                                            <p style={{ margin: '0.25rem 0', fontSize: '1.1rem', fontWeight: 'bold', color: '#27ae60' }}>
                                                Selected Total: Rp {selectedSubtotal.toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                /* Checkout Form */
                <div className={styles.container}>
                    <h2 className={styles.title}>Checkout</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
                        {/* Buyer Information Form */}
                        <div className={styles.card}>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>Buyer Information</h3>

                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2c3e50', fontWeight: 'bold' }}>
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={buyerInfo.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your full name"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid #e9ecef',
                                            borderRadius: '6px',
                                            fontSize: '1rem'
                                        }}
                                        required
                                    />
                                </div>

                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2c3e50', fontWeight: 'bold' }}>
                                        Address *
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={buyerInfo.address}
                                        onChange={handleInputChange}
                                        placeholder="Street address"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid #e9ecef',
                                            borderRadius: '6px',
                                            fontSize: '1rem'
                                        }}
                                        required
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2c3e50', fontWeight: 'bold' }}>
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={buyerInfo.city}
                                            onChange={handleInputChange}
                                            placeholder="City"
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                border: '2px solid #e9ecef',
                                                borderRadius: '6px',
                                                fontSize: '1rem'
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2c3e50', fontWeight: 'bold' }}>
                                            ZIP Code
                                        </label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={buyerInfo.zipCode}
                                            onChange={handleInputChange}
                                            placeholder="ZIP Code"
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                border: '2px solid #e9ecef',
                                                borderRadius: '6px',
                                                fontSize: '1rem'
                                            }}
                                        />
                                    </div>
                                </div>

                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2c3e50', fontWeight: 'bold' }}>
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={buyerInfo.phoneNumber}
                                        onChange={handleInputChange}
                                        placeholder="(555) 123-4567"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid #e9ecef',
                                            borderRadius: '6px',
                                            fontSize: '1rem'
                                        }}
                                        required
                                    />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2c3e50', fontWeight: 'bold' }}>
                                        Payment Method
                                    </label>
                                    <select
                                        name="paymentMethod"
                                        value={buyerInfo.paymentMethod}
                                        onChange={handleInputChange}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid #e9ecef',
                                            borderRadius: '6px',
                                            fontSize: '1rem',
                                            backgroundColor: 'white'
                                        }}
                                    >
                                        <option value="credit-card">Credit Card</option>
                                        <option value="debit-card">Debit Card</option>
                                        <option value="paypal">PayPal</option>
                                        <option value="bank-transfer">Bank Transfer</option>
                                        <option value="cash-on-delivery">Cash on Delivery</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className={styles.card}>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>Order Summary</h3>

                                {/* Selected Items Only */}
                                <div style={{ marginBottom: '1rem' }}>
                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        marginBottom: '1rem',
                                        padding: '0.75rem',
                                        backgroundColor: '#e8f5e8',
                                        borderRadius: '6px'
                                    }}>
                                        <span style={{ fontWeight: 'bold', color: '#27ae60' }}>
                                            Selected Items for Checkout ({selectedItems.size})
                                        </span>
                                        <button
                                            onClick={() => setCurrentView('cart')}
                                            style={{
                                                background: 'none',
                                                border: '1px solid #27ae60',
                                                color: '#27ae60',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '0.8rem'
                                            }}
                                        >
                                            Modify Selection
                                        </button>
                                    </div>
                                    
                                    {selectedItems.size === 0 ? (
                                        <div style={{ 
                                            textAlign: 'center', 
                                            padding: '2rem',
                                            color: '#e74c3c',
                                            backgroundColor: '#fdf2f2',
                                            borderRadius: '6px'
                                        }}>
                                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
                                            <h4>No items selected for checkout</h4>
                                            <p style={{ marginBottom: '1rem' }}>Please go back to cart and select items to purchase.</p>
                                            <button
                                                onClick={() => setCurrentView('cart')}
                                                className={styles.cardButton}
                                                style={{ backgroundColor: '#3498db' }}
                                            >
                                                Go to Cart
                                            </button>
                                        </div>
                                    ) : (
                                        selectedCartItems.map((item) => (
                                            <div key={item.id} style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '0.5rem 0',
                                                borderBottom: '1px solid #ecf0f1'
                                            }}>
                                                <div>
                                                    <div style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                                        ✓ {item.name}
                                                    </div>
                                                    <div style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
                                                        Qty: {item.quantity}
                                                    </div>
                                                </div>
                                                <div style={{ fontWeight: 'bold', color: '#27ae60' }}>
                                                    Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Discount Code */}
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2c3e50', fontWeight: 'bold' }}>
                                        Discount Code
                                    </label>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <input
                                            type="text"
                                            value={discountCode}
                                            onChange={(e) => setDiscountCode(e.target.value)}
                                            placeholder="Enter discount code"
                                            style={{
                                                flex: 1,
                                                padding: '0.75rem',
                                                border: '2px solid #e9ecef',
                                                borderRadius: '6px',
                                                fontSize: '1rem'
                                            }}
                                        />
                                        <button
                                            onClick={handleApplyDiscount}
                                            className={styles.cardButton}
                                            style={{ backgroundColor: '#27ae60', minWidth: '100px' }}
                                        >
                                            Apply
                                        </button>
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: '#7f8c8d', marginTop: '0.5rem' }}>
                                        Try: SAVE10, WELCOME20, FIRST15, STUDENT
                                    </div>
                                </div>

                                {/* Price Breakdown - Selected Items Only */}
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: '0.5rem'
                                    }}>
                                        <span>Subtotal (Selected Items):</span>
                                        <span>Rp {selectedSubtotal.toLocaleString('id-ID')}</span>
                                    </div>
                                    {appliedDiscount > 0 && (
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginBottom: '0.5rem',
                                            color: '#27ae60'
                                        }}>
                                            <span>Discount ({appliedDiscount}%):</span>
                                            <span>-Rp {selectedDiscountAmount.toLocaleString('id-ID')}</span>
                                        </div>
                                    )}
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold',
                                        color: '#27ae60',
                                        paddingTop: '0.5rem',
                                        borderTop: '2px solid #ecf0f1'
                                    }}>
                                        <span>Total to Pay:</span>
                                        <span>Rp {selectedTotal.toLocaleString('id-ID')}</span>
                                    </div>
                                    {selectedItems.size < cart.length && (
                                        <div style={{
                                            fontSize: '0.85rem',
                                            color: '#7f8c8d',
                                            marginTop: '0.5rem',
                                            textAlign: 'center',
                                            fontStyle: 'italic'
                                        }}>
                                            Note: {cart.length - selectedItems.size} item(s) not selected will remain in cart
                                        </div>
                                    )}
                                </div>

                                {/* Checkout Button */}
                                <button
                                    onClick={handleCheckout}
                                    className={styles.cardButton}
                                    style={{
                                        width: '100%',
                                        backgroundColor: selectedItems.size > 0 ? '#27ae60' : '#95a5a6',
                                        padding: '1rem',
                                        fontSize: '1.1rem',
                                        fontWeight: 'bold',
                                        cursor: selectedItems.size > 0 ? 'pointer' : 'not-allowed'
                                    }}
                                    disabled={selectedItems.size === 0}
                                >
                                    {selectedItems.size > 0 
                                        ? `Place Order - Rp ${selectedTotal.toLocaleString('id-ID')}` 
                                        : 'Select Items to Checkout'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShoppingApp;
