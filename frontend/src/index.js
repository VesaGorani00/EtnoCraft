import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import {HelmetProvider} from "react-helmet-async"
import { Provider } from 'react-redux';
import store from './store.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/index.css';
import './assets/styles/bootstrap.customs.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals';  
import PrivateRoute from './components/PrivateRoute.js';
import Home from "./screens/Home.js"
import ProductScreen from "./screens/productScreen.js"
import CartScreen from "./screens/cartScreen.js"
import LoginScreen from './screens/LoginScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
import ShippingScreen from './screens/ShippingScreen.js';
import PaymentScreen from './screens/paymentScreen.js';
import PlaceOrderScreen from './screens/PlaceOrderScreen.js';
import OrderScreen from './screens/OrderScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';

import AdminRoute from "./components/AdminRoute.js"
import OrderListScreen from "./screens/admin/OrderListScreen.js"
import ProductListScreen from './screens/admin/ProductListScreen.js';
import ProductEditScreen from './screens/admin/ProductEditScreen.js';
import UserListScreen from './screens/admin/UserListScreen.js';
import UserEditScreen from './screens/admin/UserEditScreen.js';

//////////
import MerchantRoute from "./components/MerchantRoute.js"
import MerchantOrderListScreen from "./screens/merchant/MerchantOrderListScreen.js"
import MerchantProductListScreen from './screens/merchant/MerchantProductListScreen.js';
import MerchantProductEditScreen from './screens/merchant/MerchantProductEditScreen.js';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<Home/>}/>
      <Route path='/search/:keyword' element={<Home/>} /> 
      <Route path='/page/:pageNumber' element={<Home/>}/>
       <Route path='/search/:keyword/page/:pageNumber' element={<Home/>} /> 
      <Route path='/product/:id' element={<ProductScreen/>}/> 
      <Route path='/cart' element={<CartScreen/>} />
      <Route path='/login' element={<LoginScreen/>} />
      <Route path='/register' element={<RegisterScreen/>} />
     

      <Route path='' element={<PrivateRoute/>}>
          <Route path='/shipping' element={<ShippingScreen/>} /> 
          <Route path='/payment' element={<PaymentScreen/>} />
          <Route path = '/placeorder' element={<PlaceOrderScreen/>} />
          <Route path = '/order/:id' element={<OrderScreen/>}/>
          <Route path='/profile' element={<ProfileScreen/>}></Route>
        </Route> 

        <Route path='' element={<AdminRoute/>}>
          <Route path='/admin/orderlist' element={<OrderListScreen/>} /> 
          <Route path='/admin/productlist' element={<ProductListScreen/>} /> 
          <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen/>}/> 
          <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>}/>
          <Route path='/admin/userlist' element={<UserListScreen/>}/>
          <Route path='/admin/user/:id/edit' element={<UserEditScreen/>}/>
        </Route>  

        <Route path='' element={<MerchantRoute/>}>
          <Route path='/merchant/orderlist' element={<MerchantOrderListScreen/>} /> 
          <Route path='/merchant/productlist' element={<MerchantProductListScreen/>} /> 
          <Route path='/merchant/productlist/:pageNumber' element={<MerchantProductListScreen/>}/> 
          <Route path='/merchant/product/:id/edit' element={<MerchantProductEditScreen/>}/>
          
        </Route>  
      </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router}/>
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
