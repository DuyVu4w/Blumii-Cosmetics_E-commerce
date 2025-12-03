const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const connectDB = require('./src/config/db.config'); 
const authRoutes = require('./src/routes/auth.routes');
const customerRoutes = require('./src/routes/customer.routes');
const passport = require('./src/config/passport.config');
const orderRoutes = require('./src/routes/order.routes')
const productRoutes = require('./src/routes/product.routes')

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);

// Phục vụ Frontend
const clientPath = path.join(__dirname, '../../client/src');
app.use(express.static(clientPath));
app.use('/components/shared', express.static(path.join(clientPath, 'components/shared')));
app.use('/pages/public', express.static(path.join(clientPath, 'pages/public')));

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="vi">
        <head><title>Cosmetics App</title></head>
        <body>
            <div id="root"></div>
            <script type="module" src="./pages/public/AuthPage.jsx"></script>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});