import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import Home from "./pages/Home/Home"
import Layout from "./component/Layout/Layout"
import { Toaster } from "react-hot-toast"
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute"
import GuestRoute from "./component/GuestRoute/GuestRoute"
import UserProvider from "./Context/User.Context"
import CartProvider from "./Context/Cart.context"
import Cart from "./pages/Cart/Cart"
import ProductDetails from "./pages/ProductDetails/ProductDetails"
import CheckOut from "./pages/CheckOut/CheckOut"
import UserOrders from "./pages/UserOrders/UserOrders"

import Offline from "./component/Offline/Offline"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import Products from "./pages/Products/Products"
import Categories from "./pages/Categories/Categories"
import Brands from "./pages/Brands/Brands"
import WishList from "./pages/WishList/WishList"
import WishListProvider from "./Context/WishList.context"





function App() {

  const router = createBrowserRouter([
    {
      path: '/', element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: '/cart', element: <Cart /> },
        { path: '/product/:id', element: <ProductDetails /> },
        { path: '/checkout', element: <CheckOut /> },
        { path: '/allorders', element: <UserOrders /> },
        { path: '/products', element: <Products /> },
        { path: '/categories', element: <Categories /> },
        { path: '/brands', element: <Brands/> },
        { path: '/wishlist', element: <WishList/> },
      ]
    },
    {
      path: '/', element: <GuestRoute>
        <Layout />
      </GuestRoute>,
      children: [
        { path: 'signup/', element: <Signup /> },
        { path: 'login/', element: <Login /> },
      ]
    }


  ])

  const queryClient = new QueryClient()
  return (
    <>




      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <CartProvider>
            <WishListProvider>
            <RouterProvider router={router} />
            </WishListProvider>
          </CartProvider>
        </UserProvider>
        <Toaster />


        <Offline>
          <div className="p-4 fixed right-8 bottom-8 z-50 rounded-lg shadow bg-gray-200 text-gray-600 font-semibold">
            <i className="fa-solid fa-wifi mr-2"></i>
            <span>Check Your Internet Connection</span>
          </div>
        </Offline>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>



    </>
  )
}

export default App
