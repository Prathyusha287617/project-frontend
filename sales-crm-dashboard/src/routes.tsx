import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/crm/Signup';
import Signin from './pages/crm/Signin';
import RequirementGathering from './pages/crm/RequirementGatherings';
import Dashboard from './pages/crm/Dashboard';
import Contacts from './pages/crm/Contacts';
import Leads from './pages/crm/Leads';
import Projects from './pages/crm/Projects';
import Deals from './pages/crm/Deals';
import Accounts from './pages/crm/Accounts';
import RetailSignin from './pages/retail/retailSignIn';
import RetailBranch from './pages/retail/branch/retailBranch';
import MainPage from './pages/retail/MainPage';
import InventoryList from './components/retail/productList';
import BrandCategories from './components/retail/brandCategories';
import ProductPage from './components/retail/ProductPage';
import CustomerPage from './components/retail/CustomerPage';
import OrderPage from './components/retail/OrderPage'; 

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/retail/signin" element={<RetailSignin />} />
      <Route path="/retail/branch" element={<RetailBranch/> } />
      <Route path="/retail/main" element={<MainPage />} />
      <Route path="/retail/inventory" element={<InventoryList />} />
      <Route path="/brands/:brandName" element={<BrandCategories />} />
      <Route path="/retail/product" element={<ProductPage />} />
      <Route path="/retail/customer" element={<CustomerPage />} /> {/* New Customer Page route */}
      <Route path="/retail/order" element={<OrderPage />} /> {/* New Order Page route */}

      <Route path="/crm/signup" element={<Signup />} />
      <Route path="/crm/signin" element={<Signin />} />
      <Route path="/crm/requirements" element={<RequirementGathering />} />
      <Route path="/crm/dashboard" element={<Dashboard />} />
      <Route path="/crm/contacts" element={<Contacts />} />
      <Route path="/crm/leads" element={<Leads />} />
      <Route path="/crm/projects" element={<Projects />} />
      <Route path="/crm/deals" element={<Deals />} />
      <Route path="/crm/accounts" element={<Accounts />} />

    </Routes>
  );
};

export default AppRoutes;
