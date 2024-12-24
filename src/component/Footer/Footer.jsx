import amazonPayLogo from '../../assets/imgs/amazon-pay.png'
import americanExpressLogo from '../../assets/imgs/American-Express-Color.png'
import masterCardLogo from '../../assets/imgs/mastercard.webp'
import paypalCardLogo from '../../assets/imgs/paypal.png'
import appleLogo from '../../assets/imgs/get-apple-store.png'
import googlePlayLogo from '../../assets/imgs/get-google-play.png'
export default function Footer() {
  return (
    <footer className="bg-gray-200 py-10" >
      <div className="container">
        <header className='my-4'>
          <h2 className='text-xl font-semibold text-slate-800'>Get The FreshCart App</h2>
          <p className='text-slate-400'>We Will Send You a Link, open it on your phone to downloded the app</p>
        </header>
        <div className='flex gap-2'>
          <input type="email" placeholder="Email Address" className='form-control grow' />
          <button className='btn uppercase bg-primary-800 hover:bg-primary-950 text-white font-semibold text-sm'>Share App Link</button>
        </div>
        <div className='flex justify-between items-center border-y-2 border-gray-300 my-4 border-opacity-50  '>
          <div className="payment flex gap-3 items-center  py-4">
            <h3>Payment Partners</h3>
            <img src={amazonPayLogo} alt="" className='w-24' />
            <img src={americanExpressLogo} alt="" className='w-24' />
            <img src={masterCardLogo} alt="" className='w-20' />
            <img src={paypalCardLogo} alt="" className='w-24' />
          </div>

          <div className="download flex gap-3 items-center  ">
            <h3>Get deliveries with FreshCart</h3>
            <img src={appleLogo} alt="" className='w-24' />
            <img src={googlePlayLogo} alt="" className='w-28' />
          </div>
        </div>
      </div>
    </footer>
  )
}
