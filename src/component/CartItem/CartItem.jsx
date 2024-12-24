import { useContext } from "react"
import { CartContext } from "../../Context/Cart.context"
import { Link } from "react-router-dom"
export default function CartItem({ productInfo }) {
  const {count,price,product }= productInfo
  const {title,imageCover,category,id }=product
const {deleteProductFromCart,updateCount}=useContext(CartContext)
  return <>
<div className="flex gap-2">
<div className="cart-item bg-gray-100 py-4 px-6 rounded-lg flex justify-between items-center grow">
      <img src={imageCover}
          alt={title}
          className="w-24 h-24 rounded-full object-cover border-4 border-white-600"/>
      <h3 className="text-lg text-gray-700 font-semibold">
        <Link to={`/product/${id}`}>{title}</Link>
      </h3>
      <h4 className=" text-gray-500 font-semibold">{category.name}</h4>

      <div className="count flex gap-3 items-center ">
        <span className="text-2xl font-bold text-black">{count}</span>
        <div className="icons space-y-2">


          <div onClick={()=>{
            updateCount({
              productId:id,
              count: count + 1
            })
          }} className="plus  w-6 h-6 rounded-full bg-primary-700 text-white flex justify-center items-center cursor-pointer ">
            <i className="fa-solid fa-plus"></i>
          </div>

          <div onClick={()=>{
              updateCount({
                productId:id,
                count: count - 1
              })
          }} className="minus w-6 h-6 rounded-full bg-primary-700 text-white flex justify-center items-center cursor-pointer ">
            <i className="fa-solid fa-minus"></i>
          </div>
        </div>
      </div>
      <span className="font-bold text-xl text-black">{price}</span>
    </div>
    <div className=""> 
      <button onClick={()=>{
        deleteProductFromCart({productId: id})
      }} className="rounded-md h-full bg-gray-100 p-3  hover:bg-gray-200  transition-colors duration-75 ">
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
</div>
  </>
}
