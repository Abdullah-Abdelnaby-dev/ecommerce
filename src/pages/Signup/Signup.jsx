  import axios from "axios"
  import { useFormik } from "formik"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
  import { object, ref, string, } from "yup"

  export default function Signup() {
    const navigate = useNavigate()
    const [accountExist,setAccountExist]= useState("")

    
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
    const phoneRegex = /^(02)?01[0125][0-9]{8}/
    const validationSchema = object({
      name: string()
        .required('Name Is Required')
        .min(3, 'Name must be at least 3 characters')
        .max(25, 'Name can not be more than 20 characters'),

      email: string().required('Email is Required').email('Email Is Invalid'),

      password: string()
        .required('Password Is Required')
        .matches(passwordRegex, "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),

      rePassword:
        string()
          .required("Confirm Password Is Required")
          .oneOf([ref('password')], "Password And Confirm Password should be the same"),

      phone: string().required('Phone Number Is Required').matches(phoneRegex, 'Sorry, we Accept Egyption Phone Numbers Only ')

    })
    async function sendDataToRegister(values) {
      const loadingToasting =toast.loading("Waiting")
      try {
              
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
        
      }
      let {data}=await axios.request(options)
      if (data.message === "success") {
        toast.success('success sign up')
        setTimeout(()=>{
          navigate('/login')
        },2000)
      }
      console.log(data);
      
      }catch(error){
        setAccountExist(error.response.data.message)
        
      }finally{
        toast.dismiss(loadingToasting)
      }
      
    } 
    const formik = useFormik({
      initialValues:{
        "name": "",
        "email": "",
        "password": "",
        "rePassword": "",
        "phone": ""
      },

      validationSchema: validationSchema,

      onSubmit: sendDataToRegister,
    })


    return (
      <>
        <h1 className="text-xl text-slate-700 font-semibold "> <i className="fa-regular fa-circle-user pe-1 text-primary-800"></i>Register Now</h1>
        <form className="py-4 space-y-3" onSubmit={formik.handleSubmit}>
          <div className="name  ">
            <input type="text" placeholder="User Name"
              className="form-control w-full "
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="name"
            />
            {formik.errors.name && formik.touched.name && <p className="text-red-600 mt-2 text-sm">*{formik.errors.name}</p>}
          </div>
          <div className="email  ">
            <input type="email" placeholder="E-mail Address"
              className="form-control w-full "
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
            />
            {formik.errors.email && formik.touched.email && <p className="text-red-600 mt-2 text-sm">*{formik.errors.email}</p>}
            {accountExist &&<p className="text-red-600 mt-2 text-sm">*{accountExist}</p> }
          </div>
          <div className="password  ">
            <input type="password" placeholder="Password"
              className="form-control w-full "
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
            />
            {formik.errors.password && formik.touched.password && <p className="text-red-600 mt-2 text-sm">*{formik.errors.password}</p>}        </div>
          <div className="re-password  ">
            <input type="password" placeholder="Confirm Re-password"
              className="form-control w-full "
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="rePassword"
            />
            {formik.errors.rePassword && formik.touched.rePassword && <p className="text-red-600 mt-2 text-sm">*{formik.errors.rePassword}</p>}
          </div>
          <div className="phone  ">
            <input type="tel" placeholder="Phone Number"
              className="form-control w-full "
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="phone"
            />
            {formik.errors.phone && formik.touched.phone && <p className="text-red-600 mt-2 text-sm">*{formik.errors.phone}</p>}
          </div>

          <button
            className="btn bg-primary-700 hover:bg-primary-950 text-white w-full"
            type="submit"
          >Sign Up</button>
        </form>
      </>
    )
  }
