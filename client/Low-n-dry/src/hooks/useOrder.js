import axios from "axios";
import BASE_URL from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateOrder } from "../redux/order";

export default function useOrder() {
  const data = useSelector((state) => state.order?.data);
  const dispatch = useDispatch();

  async function fetchDataOrder() {
    try {
      const { data } = await axios({
        method: "get",
        url: `${BASE_URL}order`,
        headers: {
          Authorization: `Bearer ` + localStorage.accessToken,
        },
      });
      dispatch(updateOrder(data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!data || !(data?.length > 0)) {
      fetchDataOrder();
    }
  }, [data]);

  return { data };
}
