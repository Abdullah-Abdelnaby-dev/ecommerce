import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../component/Loading/Loading";
import { Helmet } from "react-helmet";


export default function Brands() {



  function getAllBrands() {

    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/brands",
      method: "GET",
    }
    return axios.request(options)
  }

  let { data, isLoading, isError } = useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,

  })
  console.log(data);

  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <h1>Fix Your Error</h1>
  }

  return <>
  <Helmet>
      <title>Brands</title>
      <meta name="description" content="Helmet application" />
  </Helmet>
    <h2 className="text-center py-5 text-primary-800 font-bold text-2xl">Brands</h2>
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
{data.data.data.map((category) => {
      return (
        <>
          <section className="">
              <div className="  card hover:shadow-2xl bg-slate-100 rounded-md overflow-hidden h-25">
                <div >
                  <img src={category.image} alt={category.name} className="w-full h-[250px] object-cover object-center" />
                </div>
                <div className="name">
                  <h2 className="text-center py-5 text-black font-bold text-xl">{category.name}</h2>
                </div>
              </div>
          </section>
        </>
      );
    })}
</div>
  </>
}
