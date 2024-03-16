import axios from "axios";
import BASE_URL from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateProvince } from "../redux/province";

export default function useProvince() {
  const data = useSelector((state) => state.province?.data);
  const dispatch = useDispatch();

  async function FetchDataPRovince() {
    try {
      const { data } = await axios({
        method: "get",
        url: `${BASE_URL}province`,
      });
      dispatch(updateProvince(data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!data || !(data.length > 0)) {
      FetchDataPRovince();
    }
  }, [data]);

  return { data };
}
