import {Toaster} from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import AppLayout from './pages/AppLayout'
import Products from './pages/Products'
import ProductPage from './pages/ProductPage'
import SearchResults from './pages/SearchResults'
import FlashDeals from './pages/FlashDeals'
import CheckOut from './pages/CheckOut'
import MyOrders from './pages/MyOrders'
import OrderTracking from './pages/OrderTracking'
import Addresses from './pages/Addresses'
import ProductedRoute from './components/ProductedRoute'
const App = () => {
  return (
    <>
      <Toaster position='top-right' toastOptions={{ duration: 3000, style: { background: '#1B3022', color: '#fff', fontSize: '14px', borderRadius: '12px'} }} />

      <Routes>
        {/* nonavbar */}
        <Route path='/login' element={<Login />} />
        {/* main-with navbar */}
        <Route path='/' element={<AppLayout />} >
            <Route index element={<Home />} />
            <Route path='products' element={<Products />} />
            <Route path='products/:id' element={<ProductPage />} />
            <Route path='search' element={<SearchResults />} />
            <Route path='deals' element={<FlashDeals />} />
            <Route element={<ProductedRoute />} >
              <Route path='checkout' element={<CheckOut />} />
              <Route path='myorders' element={<MyOrders />} />
              <Route path='myorders/:id' element={<OrderTracking />} />
              <Route path='addresses' element={<Addresses />} />
            </Route>
        </Route>

      </Routes>


    </>  
  )
}

export default App
