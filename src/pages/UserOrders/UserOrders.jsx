import { useContext, useEffect, useState } from "react"
import { userContext } from "../../Context/User.Context"
import { jwtDecode } from "jwt-decode"
import axios from "axios"
import Loading from "../../component/Loading/Loading"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

export default function UserOrders() {
  const [orders, setOrders] = useState(null)



  const { token } = useContext(userContext)
  let { id } = jwtDecode(token)



  async function getUserOrders() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
        method: 'GET'
      }
      let { data } = await axios.request(options)
      console.log('hey', data)
      setOrders(data)

    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    getUserOrders()
  }, [])

  return <>
<Helmet>
    <title>Orders</title>
    <meta name="description" content="Orders page" />
</Helmet>
  
    {orders ? <section>
      {orders.map((order) => {
        return <div key={order.id} className="order p-4 border border-gray-200 rounded-lg mb-4">
          <header className="flex justify-between items-center">
            <div className="flex flex-col">
              <h2 className="text-gray-500 font-bold mb-2">Order ID</h2>
              <span className="font-bold text-xl">{order.id}</span>
            </div>
            <div >
              {order.isPaid ? <span className="inline-block px-3 py-1 font-cairo btn  bg-primary-600 hover:bg-primary-800  text-white font-semibold mr-2  ">
                تم الدفع
              </span> :
                <span className="inline-block px-3 py-1 font-cairo btn  bg-red-600 hover:bg-red-800  text-white font-semibold mr-2  ">
                  غير مدفوع
                </span>}

              {order.isDelivered ? <span className="inline-block px-3 py-1 font-cairo btn  bg-blue-600 hover:bg-blue-800  text-white font-semibold ">تم التوصيل</span> :
                <span className="inline-block px-3 py-1 font-cairo btn  bg-blue-600 hover:bg-blue-800  text-white font-semibold ">قيد التوصيل</span>}
            </div>
          </header>
          <div className="grid md:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-4">
            {order.cartItems.map((product) => {
              return <>
                <div key={product._id} className="product-item border border-gray-200 rounded-lg  overflow-hidden">
                  <img src={product.product.imageCover}
                    alt=""
                    className="w-full"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold  text-gray-600 mb-4 line-clamp-2">
                      <Link to={`/product/${product.product.id}`}>{product.product.title}</Link>
                    </h2>
                    <div className="flex justify-between items-center">
                      <p><span className="font-bold">Count: {product.count}</span></p>
                      <span>{product.price} L.E</span>
                    </div>
                  </div>
                </div>
              </>
            })}
          </div>
          <p className="mt-4 font-semibold text-primary-800">
            Total Price <span className="text-black">{order.totalOrderPrice} L.E</span>
             </p>
        </div>
      })}
    </section> : <Loading />}
  </>
}
