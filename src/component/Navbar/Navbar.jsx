import { Link, NavLink } from 'react-router-dom'
import freshCartLogo from '../../assets/imgs/freshcart-logo.svg'
import { useContext } from 'react'
import { userContext } from '../../Context/User.Context'
import { CartContext } from '../../Context/Cart.context'
import { useEffect } from 'react'
export default function Navbar() {

  const { token,logOut } = useContext(userContext)
  const {cartInfo,getProductToCard}= useContext(CartContext)
console.log(cartInfo);


  useEffect(()=>{
    getProductToCard()
  },[])

  return (
    <>
      <nav className=' bg-gray-100 py-4 shadow-sm fixed top-0 w-full z-50'>
        <div className="container flex items-center gap-12 ">
          <a href="">
            <img src={freshCartLogo} alt="" />
          </a>
          {token && <>
            <ul className='flex gap-5 items-center'>
              <li className='gap-4'>
                <NavLink className={({ isActive }) => {
                  return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? 'before:!w-full font-semibold' : ""}`
                }} to="/">Home</NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => {
                  return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? 'before:!w-full font-semibold' : ""}`
                }} to="/wishlist">WishList</NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => {
                  return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? 'before:!w-full font-semibold' : ""}`
                }} to="/products">Products</NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => {
                  return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? 'before:!w-full font-semibold' : ""}`
                }} to='/categories'>Categories</NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => {
                  return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? 'before:!w-full font-semibold' : ""}`
                }} to="/brands">Brands</NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => {
                  return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? 'before:!w-full font-semibold' : ""}`
                }} to="/allorders">Orders</NavLink>
              </li>
            </ul>
            <Link to={'/cart'} className='cart ml-auto text-lg relative'>
              <i className="fa-solid fa-cart-shopping cursor-pointer "></i>

              <div className="cart-counter h-5 w-5 rounded-full flex justify-center items-center  bg-primary-700 absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 text-white text-sm">
                {cartInfo === null ? <i className='fa-solid fa-spinner  fa-spin'></i> : 
                <span className='text-sm font-semibold'>
                  {cartInfo.numOfCartItems}
                  </span>}
              </div>
            </Link></>}

          <ul className={`links flex gap-5 items-center  ${!token && "ms-auto"}`}>
            <li className=''>
              <a href="http://facebook.com"><i className="fa-brands fa-facebook"></i></a>
            </li>
            <li>
              <a href="http://youtube.com"><i className="fa-brands fa-youtube"></i></a>
            </li>
            <li>
              <a href="http://tiktok.com"><i className="fa-brands fa-tiktok"></i></a>
            </li>
            <li>
              <a href="http://twitter.com"><i className="fa-brands fa-twitter"></i></a>
            </li>
            <li>
              <a href="http://instagram.com"><i className="fa-brands fa-instagram"></i></a>
            </li>
          </ul>
          <ul className='flex gap-5 items-center'>
            {!token && <>
              <li>
                <NavLink className={({ isActive }) => {
                  return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? 'before:!w-full font-semibold' : ""}`
                }} to="/signup">Signup</NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => {
                  return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? 'before:!w-full font-semibold' : ""}`
                }} to="/login">Login</NavLink>
              </li></>}
            {token && <li onClick={logOut}>
              <NavLink to="/logout"><i className="fa-solid fa-right-from-bracket text-lg"></i></NavLink>
            </li>}
          </ul>
        </div>
      </nav>

    </>
  )
}
