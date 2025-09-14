import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { MESSAGE_API_ENDPOINT } from "../utils/apiEndpoints";
import { setChats } from "../redux/chatSlice";

export const useGetChats = (reciverId) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // loading state
  const [error, setError] = useState(null); // error state

  const fetchChats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${MESSAGE_API_ENDPOINT}/get-message/${reciverId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setChats(res.data.chats));
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [dispatch, reciverId]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  return { refetchChats: fetchChats, loading, error };
};
