import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../constant";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function CreateOrder() {

  const [items,setItems] = useState([]);
  function addCart(event) {
    event.preventDefault();
    let newItems = [{
        "totalPieces" : event.target.value
    }]
    console.log(newItems, "<<addcart");
    setItems(items.push(newItems))
    console.log(items, "<<addcart");
  }
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
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    FetchDataCategory();
  }, []);
  function checkOut(){
    console.log(items);
}
  return (
    <>
      <div className="p-10">
        <button onClick={checkOut}>checkout</button>
        {data.map((item, index) => {
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
                <form onSubmit={addCart} >
                <label htmlFor="numberInput">Total Pieces:</label>
                <input
                  type="number"
                  id="numberInput"
                  min="1"
                  name= "totalPieces"
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
