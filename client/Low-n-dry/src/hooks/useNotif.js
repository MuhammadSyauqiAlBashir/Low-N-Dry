import axios from "axios";
import BASE_URL from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateNotif } from "../redux/notif";

export default function useNotif() {
  const data = useSelector((state) => state.notif?.data);
  const dispatch = useDispatch();
  async function FetchDataNotif() {
    try {
      const { data } = await axios({
        method: "get",
        url: `${BASE_URL}listNotif`,
        headers: {
          Authorization: `Bearer ` + localStorage.accessToken,
        },
      });
      dispatch(updateNotif(data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!data || !(data.length > 0)) {
      FetchDataNotif();
    }
  }, [data]);

  return { data };
}
