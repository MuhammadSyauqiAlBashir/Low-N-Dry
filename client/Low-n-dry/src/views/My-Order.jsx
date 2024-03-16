import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL from "../constant";
import useOrder from "../hooks/useOrder";

function MyOrder() {
  const { data } = useOrder();
  return (
    <>
      {data.map((item, index) => {
        return (
          <div
            key={index}
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {item.typeOfService}
            </h5>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {item.status}
            </h5>
            {item.Items.map((item2, index2) => {
              return (
                <div key={index2}>
                  <img src={item2.Product.picture} alt="" />
                  <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item2.Product.name}
                  </h4>
                  <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item2.totalPieces}
                  </h4>
                  <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {" "}
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(item2.price)}
                  </h4>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
export default MyOrder;