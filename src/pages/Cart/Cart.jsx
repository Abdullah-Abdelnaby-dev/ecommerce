import { useContext, useEffect } from "react"
import { CartContext } from "../../Context/Cart.context";
import Loading from "../../component/Loading/Loading";
import CartItem from "../../component/CartItem/CartItem";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  let { getProductToCard, cartInfo,clearCart } = useContext(CartContext);

  useEffect(() => {
    getProductToCard()
  }, [])
  
  return <>
  <Helmet>
      <title>Cart</title>
      <meta name="description" content="Cart page" />
  </Helmet>
    <div className="flex gap-8 items-center mb-8 ">
      <i className="fa-brands fa-opencart text-2xl"></i>
      <h2 className="text-lg font-semibold text-slate-600 relative before:absolute before:w-0.5 before:h-3/4 before:bg-slate-600 before:-left-4 before:top-1/2 before:-translate-y-1/2">Your Shopping Cart</h2>
    </div>
    {cartInfo === null ? <Loading /> : <section>
      {cartInfo.numOfCartItems === 0 ?
        <div className="flex justify-center items-center flex-col gap-3 bg-gray-300 p-8 rounded-lg mt-6 shadow-md">
          <h2 className="  text-2xl font-semibold text-slate-600">Your Cart Is Empty. Start Shopping now by clicking the button below,to see our products</h2>
          <Link to="/" className=" btn bg-primary-600 hover:bg-primary-800 text-white"> Go To Home</Link>
        </div>:
        <>  
                <div className='space-y-4 '>
          {cartInfo.data.products?.map((product)=> <CartItem key={product._id} productInfo={product} />)}
          
          </div>
          <div className="my-4 flex justify-between  items-center">
            <p>
              <i className="fa-solid fa-dollar-sign text-xl mr-2 text-primary-900"></i>
              Your Total Price <span className="font-bold text-xl">{cartInfo.data.totalCartPrice}</span></p>
            <button onClick={clearCart} className="btn bg-primary-950 hover:bg-red-600 text-white ">Delete Card</button>
          </div>
          <Link to="/checkout" className="inline-block text-center btn bg-primary-600 hover:bg-primary-800 text-white w-full">
          Next Step (Payment)
          </Link>
          </>
      }

    </section>}
  </>
}
