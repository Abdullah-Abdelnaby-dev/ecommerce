import { useContext } from "react"
import { CartContext } from "../../Context/Cart.context"
import { Link } from "react-router-dom"
import { wishListContext } from "../../Context/WishList.context"


export default function Card({productInfo}) {
  let {addProductToCard}=useContext(CartContext)
  let {addProductToWishList}=useContext(wishListContext)
  const {imageCover,title,price,category,description,ratingsAverage,id} = productInfo
  return (
    <Link  className="w-full">
    {<div className="card group/card rounded-lg overflow-hidden shadow-lg cursor-pointer">
      <div className="relative">
        <img src={imageCover} alt="" />
        <div className="layer group-hover/card:opacity-100 transition-opacity duration-300 gap-4 flex justify-center items-center absolute w-full h-full bg-slate-500 left-0 top-0 bg-opacity-40 opacity-0">
        <div className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-950 text-white flex justify-center items-center">
          <i onClick={()=>{
            addProductToWishList({productId:id})
          }} className="fa-solid fa-heart "></i>
        </div>

        <div onClick={
          ()=>{
            addProductToCard({productId:id})
          }
        } className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-950 text-white flex justify-center items-center">
          <i className="fa-solid fa-cart-shopping "></i>
        </div>

        <div className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-950 text-white flex justify-center items-center">
          <Link to={`/product/${id}`} className="fa-solid fa-eye "></Link>
        </div>
        </div>
      </div>
      <div className="card-body p-4  space-y-3">
        <header>
          <h3 className="text-lg text-gray-600 font-semibold line-clamp-2">{title}</h3>
          <h4 className="text-primary-500  font-semibold">{category.name}</h4>
        </header>

        <p className="text-gray-400 text-sm line-clamp-2">{description}</p>
        <div className="flex items-center justify-between ">
          <span>{price}</span>
          <div>
            <i className="fa-solid fa-star mr-2 text-yellow-500"></i>
            <span>{ratingsAverage}</span>
          </div>
        </div>
      </div>
    </div>}
    </Link>
  )
}
