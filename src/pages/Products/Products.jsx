


import axios from "axios";


import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import Card from "../../component/Card/Card";
import Loading from "../../component/Loading/Loading";

export default function Products() {





  async function getAllProduct() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    }
    return axios.request(options)

  }





  let { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProduct,
  })
  console.log(data);



  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <Helmet>
        <title>Products</title>
        <meta name="description" content="Home page" />
      </Helmet>



      <div className="sm:gap-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {data.data.data.map((product) => <Card productInfo={product} key={product.id} />)}
      </div>

    </>
  )
}



