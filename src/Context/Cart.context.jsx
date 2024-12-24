import { createContext, useContext, useState } from "react";
import { userContext } from "./User.Context";
import axios from "axios";
import toast from "react-hot-toast";

export const CartContext = createContext(null)



export default function CartProvider({ children }) {
  const { token } = useContext(userContext)
  const [cartInfo, setCartInfo] = useState(null)



  async function addProductToCard({ productId }) {
    let toastId = toast.loading('Adding Product...')
    try {
      const options = {
        url: 'https://ecommerce.routemisr.com/api/v1/cart',
        method: 'POST',
        headers: {
          token
        },
        data: {
          productId
        }
      }
      let { data } = await axios.request(options)
      if (data.status == 'success') {
        toast.success(data.message)
        getProductToCard()
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId)
    }

  }

  async function getProductToCard() {
    try {
      const options = {
        url: 'https://ecommerce.routemisr.com/api/v1/cart',
        method: 'GET',
        headers: {
          token
        },
      }
      let { data } = await axios.request(options)

      setCartInfo(data)


    } catch (error) {
      console.log(error);

    }

  }
  async function deleteProductFromCart({ productId }) {
    let toastId = toast.loading("Deleteing Product....")
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: 'DELETE',
        headers: {
          token
        },
      }
      let { data } = await axios.request(options)
      if (data.status === 'success') {
        toast.success('Product has been deleted')
        setCartInfo(data)
      }
    } catch (error) {
      console.log(error);

    } finally {
      toast.dismiss(toastId)
    }

  }
  async function clearCart() {
    let toastClear = toast.loading("Deleteing Products....")
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart`,
        method: 'DELETE',
        headers: {
          token
        },
      }
      let { data } = await axios.request(options)
      console.log(data);

      if (data.message === 'success') {
        toast.success('Products has been deleted')

        setCartInfo({
          numOfCartItems: 0
        })

      }
    } catch (error) {
      console.log(error);

    } finally {
      toast.dismiss(toastClear)
    }

  }
  async function updateCount({ productId, count }) {
    // let toastId = toast.loading("Deleteing Product....")
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: 'PUT',
        headers: {
          token
        },
        data: {
          count
        }
      }
      let { data } = await axios.request(options)
      if (data.status === 'success') {
        // toast.success('Product has been deleted')
        setCartInfo(data)
      }
    } catch (error) {
      console.log(error);

    } finally {
      // toast.dismiss(toastId)
    }

  }

  return <>

    <CartContext.Provider value={{
      addProductToCard,
      getProductToCard,
      cartInfo,
      deleteProductFromCart,
      clearCart,
      updateCount,
    }}>
      {children}
    </CartContext.Provider>
  </>
}
