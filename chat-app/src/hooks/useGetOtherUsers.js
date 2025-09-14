import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MESSAGE_API_ENDPOINT } from "../utils/apiEndpoints";
import { setOtherUsers } from "../redux/userSlice";

export const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // loading state
  const [error, setError] = useState(null); // error state

  const fetchOtherUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${MESSAGE_API_ENDPOINT}/other-users`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setOtherUsers(res.data.otherUsers));
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchOtherUsers();
  }, [fetchOtherUsers]);

  return { loading, error, refetchOtherUsers: fetchOtherUsers };
};
