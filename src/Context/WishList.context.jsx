import { createContext, useContext } from "react";
import { userContext } from "./User.Context";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";


export const wishListContext = createContext(null)

export default function WishListProvider({ children }) {

  const { token } = useContext(userContext)
  const [wishlistInfo, setWishlistInfo] = useState(null)
console.log("wishcontext",wishlistInfo);

  async function addProductToWishList({ productId }) {



    let toastId = toast.loading("Add to wish list")
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
        method: "POST",
        headers: {
          token
        },
        data: {
          productId: productId
        }
      }
      let { data } = await axios.request(options)

      if (data.status === 'success') {
        toast.success("Add to wish list done")
        getWishProducts()
        
      }


    } catch (error) {
      console.log(error);

    } finally {
      toast.dismiss(toastId)
    }
  }

  async function getWishProducts() {
    if (!token) {
      return;
    }

    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "GET",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      setWishlistInfo(data.data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function removeProductFromWishList({ productId }) {
    let toastId = toast.loading("Deleting item...");
    try {
    

      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success("Item has been deleted.");
        getWishProducts();
      }
    } catch (error) {
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  return <>
    <wishListContext.Provider value={{
      addProductToWishList,
      wishlistInfo,
      removeProductFromWishList,
    }}>
      {children}
    </wishListContext.Provider>
  </>
}