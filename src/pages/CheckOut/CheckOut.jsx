import { useFormik } from "formik"
import { useContext, useState } from "react"
import { CartContext } from "../../Context/Cart.context"
import axios from "axios"
import { userContext } from "../../Context/User.Context"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function CheckOut() {


const{cartInfo}=useContext(CartContext)
const{token}=useContext(userContext)
const navigate =useNavigate()
const [paymentMethod, setPaymentMethod] = useState(null)


async function createCashOrder(values) {
  let toastId = toast.loading('Creating Order...')
  try {
    const options = {
      url:`https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
      method: 'POST',
      headers:{
        token
      },
      data:values
    }

    let {data}= await axios.request(options);
    if(data.status==='success'){
      toast.success("Creating Order successfully")
      setTimeout(() => {
        navigate('/alloreders')
      }, 2000);
      
    }
    console.log(data);
  } catch (error) {
    toast.error("Creating Order Failed")
    console.log(error);
  }finally{
    toast.dismiss(toastId)
  }
  
}
async function handleOnlinePayment(values) {
  let toastId = toast.loading('Creating Order...')
  try {
    const options = {
      url:`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${window.location.origin}`,
      method: 'POST',
      headers:{
        token
      },
      data:values
    }

    let {data}= await axios.request(options);
    if(data.status==='success'){
      toast.success("Creating Order successfully")
      setTimeout(() => {
        location.href = data.session.url
      }, 2000);
      
    }
    console.log(data);
  } catch (error) {
    toast.error("Creating Order Failed")
    console.log(error);
  }finally{
    toast.dismiss(toastId)
  }
  
}

  const formik = useFormik({
    initialValues: {
      "shippingAddress": {
        "details": "",
        "phone": "",
        "city": ""
      } 
    },

    onSubmit: (values )=>{
      if(paymentMethod === 'cash'){
        createCashOrder(formik.values)
      }else if(paymentMethod === 'online'){
        handleOnlinePayment(formik.values)}
    }
  })


  return <>
    <section>
      <h1>Shipping Address </h1>
      <form className="space-y-4 mt-4" onSubmit={formik.handleSubmit}>
        <div className="city">
          <input
            type="text"
            className="form-control w-full"
            placeholder="City"
            value={formik.values.shippingAddress.city}
            onChange={formik.handleChange}
            name="shippingAddress.city" />
        </div>

        <div className="phone">
          <input
            type="tel"
            className="form-control w-full"
            placeholder="Phone"
            value={formik.values.shippingAddress.phone}
            onChange={formik.handleChange}
            name="shippingAddress.phone" />
        </div>

        <div className="details">
          <textarea
            className="form-control w-full"
            placeholder="Details"
            value={formik.values.shippingAddress.details}
            onChange={formik.handleChange}
            name="shippingAddress.details">

            </textarea>
        </div>

        <button onClick={()=>{
          setPaymentMethod('cash')
        }} type="submit" className="btn bg-blue-500 hover:bg-blue-700 text-white me-3 ">Cash Order</button>
        <button onClick={()=>{
          setPaymentMethod('online')
        }} type="submit" className="btn bg-lime-500 hover:bg-lime-700 text-white ">Online Payment</button>
      </form>
    </section>
  </> 
}
