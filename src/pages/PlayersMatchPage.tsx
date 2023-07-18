import PlayersMatchList from "../components/PlayersMatchList";
import usePlayersMatch from "../hooks/usePlayersMatch";
import { useParams } from "react-router-dom";
import { PlayerMatch } from "../models/PlayerMatch";
import DraggableColumns from "../components/DraggableColumns";
import DraggablePlayersColumns from "../components/DraggablePlayersColums";

const PlayersMatchPage = () => {
  const { playersMatchId } = useParams<{ playersMatchId: string }>();

  const {
    playersMatch,
    error,
    loading,
    refetch,
  }: {
    playersMatch: PlayerMatch[];
    error: any;
    loading: boolean;
    refetch: () => void;
  } = usePlayersMatch(playersMatchId || "");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        loading ...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        Error with fetching data occurs : {error?.message}
      </div>
    );
  }
  return (
    <>
      <section className="flex flex-row justify-evenly">
        <PlayersMatchList
          players={playersMatch}
          error={error}
          loading={loading}
          refetch={refetch}
        />
        <DraggablePlayersColumns />
      </section>
    </>
  );
};

export default PlayersMatchPage;
