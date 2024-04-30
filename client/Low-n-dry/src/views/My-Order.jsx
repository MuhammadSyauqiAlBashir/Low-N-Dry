import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL from "../constant";
import useOrder from "../hooks/useOrder";
import { useDispatch } from "react-redux";
import {  resetOrder } from "../redux/order";
import Swal from "sweetalert2";


function MyOrder() {
  let { data } = useOrder();
  const dispatch = useDispatch()
  const [deleteOrderparams, setDeleteOrder] = useState(0);
  async function deleteOrder() {
    try {
      await axios({
        method: "delete",
        url: `${BASE_URL}order/${deleteOrderparams}`,
        headers: {
          Authorization: `Bearer ` + localStorage.accessToken,
        },
      });
      dispatch(resetOrder())
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data.message,
        icon: error,
        timer: 1000,
        showConfirmButton: false,
      });
    }
  }
  useEffect(() => {
    if (deleteOrderparams) deleteOrder();
  }, [deleteOrderparams]);

  return (
    <>
      {data.map((item, index) => {
        return (
          <section key={index} className="p-10">
            <div className="block max-w p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Type of Laundry Service : {item.typeOfService}
              </h5>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Laundry Status : {item.status}
              </h5>
              <button
                className="bg-red-500 mb-4 hover:bg-red-600 px-4 py-2 text-xl text-white rounded-md mt-3"
                onClick={() => {
                  setDeleteOrder(item.id);
                }}
              >
                Delete Order History
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                {item.Items.map((item2, index2) => {
                  return (
                    <div className="gap-4" key={index2}>
                      <img src={item2.Product.picture} className="h-44" />
                      <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Item Name : {item2.Product.name}
                      </h4>
                      <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Total Pieces : {item2.totalPieces}
                      </h4>
                      <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Item Price :{" "}
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(item2.price)}
                      </h4>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
export default MyOrder;
