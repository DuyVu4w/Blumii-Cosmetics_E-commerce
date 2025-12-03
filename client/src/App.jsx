import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import PublicLayout from "./components/layout/PublicLayout.jsx";

// Public Pages
import HomePage from './pages/public/HomePage.jsx';
import ShopPage from './pages/public/ShopPage.jsx';
import AuthPage from './pages/public/AuthPage.jsx';
import NotFoundPage from './pages/public/NotFoundPage.jsx';
import ShopDetailPage from './pages/public/ShopDetailPage.jsx';
import CheckoutPage from './pages/public/CheckoutPage.jsx';
import CartPage from './pages/public/CartPage.jsx';
import OrderResultPage from './pages/public/OrderResultPage.jsx';
import OrderDetailPage from './pages/public/OrderDetailPage.jsx';
import OrderHistoryPage from './pages/public/OrderHistory.jsx';

// Private Pages
import UserProfilePage from "./pages/private/UserProfilePage.jsx";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("auth_token");
  return token ? children : <Navigate to="/auth" replace />;
};

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("auth_token");
  return token ? <Navigate to="/account" replace /> : children;
};

const AppRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get('token');

    if (tokenFromUrl) {
      localStorage.setItem('auth_token', tokenFromUrl);
      
      window.history.replaceState({}, document.title, "/");
      
      navigate('/account', { replace: true });
    }
  }, [location, navigate]);

  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        
        <Route path='shop' element={<ShopPage />} />
        <Route path='shop-detail/:id' element={<ShopDetailPage />} />
        
        <Route path='cart' element={<CartPage/>}/>
        <Route path='checkout' element={<CheckoutPage/>}/>
        
        <Route path='order-result/:id' element={<OrderResultPage/>}/>
        <Route path='order-detail/:id' element={<OrderDetailPage/>}/>
        <Route path='order-history/:id' element={<OrderHistoryPage/>}/>

        <Route 
          path="account" 
          element={
            <PrivateRoute>
              <UserProfilePage />
            </PrivateRoute>
          } 
        />

        <Route path='*' element={<NotFoundPage />} />
      </Route>

      
      <Route 
        path="/auth" 
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        } 
      />

      {/* Route fallback cuối cùng */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

/**
 * Component: App (Main Entry)
 */
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;