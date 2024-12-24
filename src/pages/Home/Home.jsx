import axios from "axios";
import Card from "../../component/Card/Card";
import Loading from "../../component/Loading/Loading";
import HomeSlider from "../../component/HomeSlider/HomeSlider";
import CategorySlider from "../../component/categorySlider/CategorySlider";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";



export default function Home() {


  async function getProduct() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    }
    return axios.request(options)

  }



  let { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProduct,
    refetchInterval: 3000,
    refetchIntervalInBackground: true,


  })

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Home page" />
      </Helmet>


      <HomeSlider/>
      <CategorySlider/>

      <div className="sm:gap-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {data.data.data.map((product) => <Card productInfo={product} key={product.id} />)}
      </div>

    </>
  )
}
