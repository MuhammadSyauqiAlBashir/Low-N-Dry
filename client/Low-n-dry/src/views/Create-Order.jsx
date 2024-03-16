import axios from "axios";
import BASE_URL from "../constant";
import { useState } from "react";
import Swal from "sweetalert2";
import useProduct from "../hooks/useProduct";

function CreateOrder() {
  const [items, setItems] = useState([]);
  const { data } = useProduct();

  function addCart(event) {
    event.preventDefault();
    let newItems = {
      ProductId: event.target[0].value,
      totalPieces: parseInt(event.target[1].value),
    };

    setItems((prev) => {
      let found = false;
      let newData = prev.map((val) => {
        if (val?.ProductId === newItems.ProductId) {
          found = true;
          return {
            ProductId: val.ProductId,
            totalPieces: val.totalPieces + newItems.totalPieces,
          };
        }
        return val;
      });
      if (!found) {
        newData = [...newData, newItems];
      }
      return newData;
    });
  }

  //   async function checkOut() {
  //     // if (typeof window !== "undefined") {
  //     //   if (window.snap) {
  //     //     try {
  //     //       const { data } = await axios({
  //     //         method: "post",
  //     //         url: `${BASE_URL}order`,
  //     //         headers: {
  //     //           Authorization: `Bearer ` + localStorage.accessToken,
  //     //         },
  //     //         data: {
  //     //           typeOfService: "express",
  //     //           items: items,
  //     //         },
  //     //       });
  //     //       if (!data.transactionToken) throw Error("MIDTRANS_ERROR");
  //     //       window.snap.embed(data?.transactionToken, {
  //     //         embedId: "snap-container",
  //     //       });
  //     //     } catch (error) {
  //     //       Swal.fire({
  //     //         title: "Internal server error",
  //     //         text: "There is an error processing your payment",
  //     //       });
  //     //     }
  //     //   } else {
  //     //     Swal.fire({
  //     //       title: "Internal server error",
  //     //       text: "Midtrans not ready",
  //     //     });
  //     //   }
  //     // }

  //   }
  const checkOut = async () => {
    const { data } = await axios({
      method: "POST",
      url: `${BASE_URL}order`,
      headers: {
        Authorization: "Bearer " + localStorage.accessToken,
      },
      data: {
        typeOfService: "express",
        items: items,
      },
    });
    console.log(data);
    window.snap.pay(data.transactionToken, {
      onSuccess: async function (result) {
        /* You may add your own implementation here */
        await axios({
          method: "PATCH",
          url: `${BASE_URL}/order/${data.order.id}`,
          headers: {
            Authorization: "Bearer " + localStorage.accessToken,
          },
        });
      },
    });
  };

  return (
    <>
      <div id="snap-container"></div>
      <div className="p-10">
        <button id="pay-button" onClick={checkOut}>
          Check Out
        </button>
        {data &&
          data.map((item, index) => {
            return (
              <div
                key={index}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
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
                  <form onSubmit={addCart}>
                    <input name="productId" type="hidden" value={item.id} />
                    <label htmlFor="numberInput">Total Pieces:</label>
                    <input
                      type="number"
                      id="numberInput"
                      min="1"
                      name="totalPieces"
                    ></input>
                    <button type="submit">Add to Cart</button>
                  </form>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
export default CreateOrder;
