import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ToastContainter from './Components/Common/ToastContainer';
import AddNewProduct from './pages/AddNewProduct';
import MyProducts from './pages/MyProducts';
import ProductUserView from './pages/ProductUserView';
import WishList from './pages/WishList';
import Phone from './pages/catecory/Phone';
import LaptopAndComputer from './pages/catecory/LaptopAndComputer';
import Cart from './pages/Cart';
import MyOrders from './pages/MyOrders';
import Orders from './pages/Orders';
import Register from './pages/Register';
import Tv from './pages/catecory/Tv';
import Headphone from './pages/catecory/Headphone';
import Admin from './pages/admin/Admin';
import { AdminAuth, LoginAuth, UserAuth, VendorAuth } from './Authorization/authorization';
import AllCatecory from './pages/catecory/AllCatecory';

function App() {
  return (
    <>
  <ToastContainter />
  
  <BrowserRouter>
  <Routes>
    
    <Route element={<LoginAuth />}>
       <Route index element={<Login />} />
    </Route>

     {/* user router start */}
     <Route element={<UserAuth />}>
       <Route path='/home' element={<Home />} />
       <Route path='/productuserview/:p_id' element={<ProductUserView />} />
       <Route path='/wishlist/:w_id' element={<WishList />} />
       <Route path='/phone' element={<Phone />} />
       <Route path='/laptopandcomputer' element={<LaptopAndComputer />} />
       <Route path='/cart/:c_id' element={<Cart />} />
       <Route path='/myorder/:o_id' element={<MyOrders />} />
       <Route path='/register' element={<Register />} />
       <Route path='/tv' element={<Tv />} />
       <Route path='/headphone' element={<Headphone />} />
       <Route path='/allcategories' element={<AllCatecory />} />
    </Route>
    {/* user router end */}

    {/* vendor rout start */}
    <Route element={<VendorAuth />}>
       <Route path='/addnewproduct' element={<AddNewProduct />} />
       <Route path='/myproducts/:id' element={<MyProducts />} />
       <Route path='/orders/:or_id' element={<Orders />} />
    </Route>
    {/* vendor rout end */}

     {/* admin rout start */}
     <Route element={<AdminAuth />}>
       <Route path='/admin' element={<Admin />} />
    </Route>
     {/* admin rout end */}

  </Routes>
  </BrowserRouter>

  </>
  );
}

export default App;
