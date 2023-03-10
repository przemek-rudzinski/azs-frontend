import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const usePlayers = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const headers = {};

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("/player-match/all", {
          headers,
          withCredentials: true,
        });
        setPlayers(response.data);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        if (error.response.status === 403) {
          setLoading(false);
          navigate("/login");
        }
      }
    };
    fetchPlayers();
  }, []);

  return { players, error, loading };
};

export default usePlayers;
