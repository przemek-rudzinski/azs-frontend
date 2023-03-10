import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { toast } from "react-toastify";

const useMatches = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const headers = {};

  useEffect(() => {
    const fetchmatches = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/match/all", {
          headers,
          withCredentials: true,
        });
        setMatches(response.data);
        setLoading(false);
      } catch (error: any) {
        toast.dismiss();
        if (error.response.status === 403) {
          toast.error("You have to log in to continue");
          navigate("/login");
        } else {
          error?.message
            ? toast.error(error.message)
            : toast.error("something went wrong");
        }
        setError(error);
        setLoading(false);
      }
    };
    fetchmatches();
  }, []);

  return { matches, error, loading };
};

export default useMatches;
