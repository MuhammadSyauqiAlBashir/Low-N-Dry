import axios from "axios";
import BASE_URL from "../constant";
import { updateProduct } from "../redux/product";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function useProduct() {
  const data = useSelector((state) => state.product?.data);
  const dispatch = useDispatch();

  async function fetchDataProduct() {
    try {
      const { data } = await axios({
        method: "get",
        url: `${BASE_URL}listProduct`,
        headers: {
          Authorization: `Bearer ` + localStorage.accessToken,
        },
      });
      dispatch(updateProduct(data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!data || !(data?.length > 0)) {
      fetchDataProduct();
    }
  }, [data]);

  return { data };
}
