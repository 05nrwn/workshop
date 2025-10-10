const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
// Middleware
app.use(cors());
app.use(express.json());
// Sample data - simple products array
const products = [
    {
        id: 1, name: "Laptop", price: 15000000, category:
            "Electronics"
    },
    {
        id: 2, name: "Smartphone", price: 5000000, category:
            "Electronics"
    },
    {
        id: 3, name: "Headphones", price: 800000, category:
            "Electronics"
    },
    {
        id: 4, name: "Coffee Maker", price: 1200000, category: "Home"
    },
    {
        id: 5, name: "Running Shoes", price: 800000, category:
            "Sports"
    },
    { id: 6, name: "Book", price: 150000, category: "Education" },
    {
        id: 7, name: "Water Bottle", price: 200000, category: "Home"
    },
    { id: 8, name: "Backpack", price: 600000, category: "Fashion" }
// Simple GET endpoint
];

app.get('/api/products', (req, res) => {
        console.log('📦 Fetching products...');
        // Simulate delay like real API
        setTimeout(() => {
            res.json({
                success: true,
                data: products,
                total: products.length,
                message: "Products fetched successfully"
            });
        }, 1000); // 1 second delay
    });
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        success: false,
        error: 'Something went wrong!'
    });
});
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    });
});
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📋 API Available: GET /api/products`);
});
