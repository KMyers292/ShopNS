//===================================================================================================================================================================//
//                                                                             App.js                                                                                //
//===================================================================================================================================================================//

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './views/HomeView';
import ProductView from './views/ProductView';
import CartView from './views/CartView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import ProfileView from './views/ProfileView';
import ShippingView from './views/ShippingView';
import PaymentView from './views/PaymentView';
import PlaceOrderView from './views/PlaceOrderView';
import OrderView from './views/OrderView';
import OrderListView from './views/OrderListView';
import UserListView from './views/UserListView';
import UserEditView from './views/UserEditView';
import ProductListView from './views/ProductListView';
import ProductEditView from './views/ProductEditView';

//===================================================================================================================================================================//

const App = () => {
  return (
    <Router>
      <>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
            <Route path="/shipping" element={<ShippingView/>} />
            <Route path="/payment" element={<PaymentView/>} />
            <Route path="/placeorder" element={<PlaceOrderView/>} />
            <Route path="/order/:id" element={<OrderView/>} />
            <Route path="/register" element={<RegisterView/>} />
            <Route path="/login" element={<LoginView/>} />
            <Route path="/profile" element={<ProfileView/>} />
              <Route path="/product/:id" element={<ProductView/>} />
              <Route path="/cart/:id" element={<CartView/>} />
              <Route path="/cart/" element={<CartView/>} />
              <Route path="/admin/userlist" element={<UserListView/>} />
              <Route path="/admin/user/:id/edit" element={<UserEditView/>} />
              <Route exact path="/admin/productlist" element={<ProductListView/>} />
              <Route exact path="/admin/productlist/:pageNumber" element={<ProductListView/>} />
              <Route path="/admin/product/:id/edit" element={<ProductEditView/>} />
              <Route path="/admin/orderlist" element={<OrderListView/>} />
              <Route exact path="/search/:keyword" element={<HomeView/>} />
              <Route exact path="/page/:pageNumber" element={<HomeView/>} />
              <Route exact path="/search/:keyword/page/:pageNumber" element={<HomeView/>} />
              <Route exact path="/" element={<HomeView/>} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </>
    </Router>
  );
};

//===================================================================================================================================================================//

export default App;