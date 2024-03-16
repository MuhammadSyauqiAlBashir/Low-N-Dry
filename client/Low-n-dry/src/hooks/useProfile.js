import axios from "axios";
import BASE_URL from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateProfile } from "../redux/profile";

export default function useProfile() {
  const data = useSelector((state) => state.profile?.data);
  const dispatch = useDispatch();
  async function FetchDataProfile() {
    try {
      const { data } = await axios({
        method: "get",
        url: `${BASE_URL}profile`,
        headers: {
          Authorization: `Bearer ` + localStorage.accessToken,
        },
      });
      dispatch(updateProfile(data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      FetchDataProfile();
    }
  }, [data]);

  return { data };
}
