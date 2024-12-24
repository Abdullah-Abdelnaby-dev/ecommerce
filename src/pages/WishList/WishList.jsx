import { useContext } from "react"
import { wishListContext } from "../../Context/WishList.context";
import { CartContext } from "../../Context/Cart.context";
import { Helmet } from "react-helmet";


export default function WishList() {
  
  let{wishlistInfo,removeProductFromWishList}=useContext(wishListContext)
  let{addProductToCard}=useContext(CartContext)
  console.log("www",wishlistInfo);
  
  return <>

<Helmet>
  <title>Wish List</title>
</Helmet>

  <section className="bg-gray-200 p-5 ">
  <h2 className="font-bold text-2xl text-black mb-8 ">My Wish List</h2>
{wishlistInfo && wishlistInfo.length===0 && <p className="text-center text-2xl">No Products in Wish List</p>}


{wishlistInfo && wishlistInfo.map((item)=>{
  return <>
  <div key={item.id} className="wishList p-8 mb-4 flex justify-between items-center bg-white rounded-lg shadow-md">
  <div className="flex gap-10">
    <div className="img w-[150px] ">
      <img src={item.imageCover} alt="" 
      className="w-full object-cover "/>
    </div>
<div className="header">
<p className="font-semibold mb-2 text-xl">{item.title}</p>
<p className="font-semibold mb-2 text-xl">{item.price} L.E</p>
    <button onClick={()=>{
      removeProductFromWishList({productId:item.id})
    }} className="btn bg-red-500 hover:bg-red-700 text-white">Delete</button>
</div>
  </div>
  <button 
  onClick={()=>{
    addProductToCard({productId:item.id})
  }}
className="btn bg-primary-800 hover:bg-primary-950 text-white">Add To Card</button>
</div>
  </>
})}
  </section>
  
  </>
}
