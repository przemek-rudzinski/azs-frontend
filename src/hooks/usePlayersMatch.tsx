import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { PlayerMatch } from "../models/PlayerMatch";
import { toast } from "react-toastify";

const usePlayersMatch = (matchId: string) => {
  const navigate = useNavigate();
  const [playersMatch, setPlayersMatch] = useState<PlayerMatch[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const headers = {};

  const fetchPlayersMatch = async () => {
    try {
      const response = await axios.get(`/player-match/all?matchId=${matchId}`, {
        headers,
        withCredentials: true,
      });
      console.log(response.data);
      setPlayersMatch(response.data);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayersMatch();
  }, []);

  return { playersMatch, error, loading, refetch: fetchPlayersMatch };
};

export default usePlayersMatch;
