import axios from "axios";
import BASE_URL from "../constant";
import { useState } from "react";
import Swal from "sweetalert2";
import useProduct from "../hooks/useProduct";
import { useNavigate } from "react-router-dom";

function CreateOrder() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const { data } = useProduct();

  function addCart(event) {
    event.preventDefault();
    let newItems = {
      ProductId: event.target[0].value,
      totalPieces: parseInt(event.target[1].value),
    };

    setItems((prev) => {
      let found = false;
      let newData = prev.map((item) => {
        if (item.ProductId === newItems.ProductId) {
          found = true;
          return {
            ProductId: item.ProductId,
            totalPieces: item.totalPieces + newItems.totalPieces,
          };
        }
        return item;
      });
      if (!found) {
        newData = [...newData, newItems];
      }
      return newData;
    });
  }

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
    window.snap.pay(data.transactionToken, {
      onSuccess: async function (result) {
        await axios({
          method: "PATCH",
          url: `${BASE_URL}order/${data.order.id}`,
          headers: {
            Authorization: "Bearer " + localStorage.accessToken,
          },
        });
        navigate("/my-order");
      },
    });
  };

  return (
    <>
      <div id="snap-container"></div>
      <div className="p-10 flex justify-center items center flex-col">
        <button
          className="bg-green-500 hover:bg-green-600 px-4 py-2 text-white rounded-md mt-3 "
          id="pay-button"
          onClick={checkOut}
        >
          Check Out
        </button>
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data &&
            data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className="flex justify-center bg-white rounded-t-lg">
                    <img
                      className="rounded-t-lg h-44"
                      src={item.picture}
                      alt=""
                    />
                  </div>
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
                      <label htmlFor="numberInput" className="text-white mr-4">
                        Total Pieces:
                      </label>
                      <input
                        type="number"
                        id="numberInput"
                        min="1"
                        name="totalPieces"
                      ></input>
                      <button
                        className="bg-green-500 hover:bg-green-600 px-4 py-2 text-white rounded-md mt-3"
                        type="submit"
                      >
                        Add to Cart
                      </button>
                    </form>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
export default CreateOrder;
