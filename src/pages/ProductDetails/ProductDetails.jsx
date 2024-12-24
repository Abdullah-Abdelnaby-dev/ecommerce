import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Loading from "../../component/Loading/Loading";
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/Cart.context";
import ReactImageGallery from 'react-image-gallery';
import { Swiper,SwiperSlide } from "swiper/react";
import "swiper/css"
import Card from "../../component/Card/Card";
import useOnline from "../../Hooks/useOnline";
import { Helmet } from "react-helmet";
export default function ProductDetails() {

  const [ProductDetails, setProductDetails] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState(null)
  let { id } = useParams()
  const { addProductToCard } = useContext(CartContext)

  
  async function getProductDetails() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
        method: 'GET',

      }
      let { data } = await axios.request(options)
      console.log(data);
      setProductDetails(data.data)

    } catch (error) {
      console.log(error);
    }
  }
  async function getRelatedProducts() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${ProductDetails.category._id}`,
        method: 'GET',

      }
      let { data } = await axios.request(options)
      console.log(data, "Related");
      setRelatedProducts(data.data)


    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProductDetails()

  }, [id])


  useEffect(() => {
    if (ProductDetails === null) return;
    getRelatedProducts()
  }, [ProductDetails])

let isOnline = useOnline()


  return <>
  <Helmet>
    <title>Product Details</title>
    <meta name="description" content="Product Details page" />
  </Helmet>
    <h2 className="font-bold text-2xl">Product Details</h2>
    {ProductDetails ? <>
    <Helmet>
      <title>{ProductDetails.title}</title>
    </Helmet>
      <section className="grid gap-5 grid-cols-12 mt-5">

<div className="col-span-3">
  <ReactImageGallery
    showPlayButton={false}
    showNav={false}
    items={ProductDetails.images.map((image) => {
      return {
        original: image,
        thumbnail: image

      }
    })} />
</div>

<div className="col-span-9">
  <h2 className="text-gray-600 text-2xl font-bold">{ProductDetails.title}</h2>
  <h3 className="text-primary-950 font-semibold text-xl  ">{ProductDetails.category.name}</h3>
  <p className="my-4 text-gray-400">{ProductDetails.description}</p>

  <div className="flex justify-between items-center">
    <span>{ProductDetails.price}</span>

    <div className="flex items-center space-x-2">
      <i className="text-yellow-500 fa-solid fa-star"></i>
      <span>{ProductDetails.ratingsAverage}</span>
    </div>
  </div>
{isOnline && 
  <button onClick={() => {
    addProductToCard({ productId: id })
  }} className="btn w-full bg-primary-900 hover:bg-primary-700 text-white my-5">Add To Cart</button>}
</div>

</section>

<section className="mt-10 shadow-2xl p-2">
<h2 className="text-2xl font-bold mb-4 ">Related Product </h2>
{relatedProducts ? <Swiper slidesPerView={6} spaceBetween={10} loop={true}>

  {relatedProducts.map((product)=>(
    <SwiperSlide key={product.id}>
      <Card productInfo={product}/>
    </SwiperSlide>
  ))}
</Swiper> : <Loading />}
</section>
    </>
    : <Loading />}

  </>
}
