import axios from "axios"
import { useFormik } from "formik"
import { useContext, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { object,string} from "yup"
import { userContext } from "../../Context/User.Context"

export default function Login() {
  let  {setToken}=useContext(userContext)
  const navigate = useNavigate()
  const [inCorrect, setInCorrect] = useState(null)


  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
  const validationSchema = object({


    email: string().required('Email is Required').email('Email Is Invalid'),

    password: string()
      .required('Password Is Required')
      .matches(passwordRegex, "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),



  })
  async function sendDataToLogin(values) {
    const loadingToasting = toast.loading("Waiting")
    try {

      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,

      }
      let { data } = await axios.request(options)
      if (data.message === "success") {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        toast.success("Success log in")
        setTimeout(()=>{
          navigate('/')
        },1000)
      }

    } catch (error) {
      toast.error(error.response.data.message)
      setInCorrect(error.response.data.message)
      

    } finally {
      toast.dismiss(loadingToasting)
    }

  }
  const formik = useFormik({
    initialValues: {
      "email": "",
      "password": "",
    },

    validationSchema: validationSchema,

    onSubmit: sendDataToLogin,
  })


  return (
    <>
      <h1 className="text-xl text-slate-700 font-semibold "> <i className="fa-regular fa-circle-user pe-1 text-primary-800"></i>Log In</h1>
      <form className="py-4 space-y-3" onSubmit={formik.handleSubmit}>

        <div className="email  ">
          <input type="email" placeholder="E-mail Address"
            className="form-control w-full "
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
          />
          {formik.errors.email && formik.touched.email && <p className="text-red-600 mt-2 text-sm">*{formik.errors.email}</p>}
          
        </div>
        <div className="password  ">
          <input type="password" placeholder="Password"
            className="form-control w-full "
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
          />
          {formik.errors.password && formik.touched.password && <p className="text-red-600 mt-2 text-sm">*{formik.errors.password}</p>}
          {inCorrect && <p className="text-red-600 mt-2 text-sm">*{inCorrect}</p>}
          </div>

        <button
          className="btn bg-primary-700 hover:bg-primary-950 text-white w-full"
          type="submit"
        >Log In</button>
      </form>
    </>
  )
}
