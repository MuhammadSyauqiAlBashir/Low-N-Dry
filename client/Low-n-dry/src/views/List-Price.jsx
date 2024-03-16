import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL from "../constant";

function ListPrice() {
  const [data, setData] = useState([]);
  async function FetchDataCategory() {
    try {
      const { data } = await axios({
        method: "get",
        url: `${BASE_URL}listProduct`,
        headers: {
          Authorization: `Bearer ` + localStorage.accessToken,
        },
      });
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    FetchDataCategory();
  }, []);
  return (
    <>
      <div className="p-10">
        {data.map((item, index) => {
          return (
            <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img className="rounded-t-lg h-44" src={item.picture} alt="" />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.name}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(item.price)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ListPrice;
