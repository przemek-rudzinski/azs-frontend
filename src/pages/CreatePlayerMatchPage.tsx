// CreatePlayerMatchPage.tsx

import DraggablePlayersColumns from "../components/DraggablePlayersColums";
import { Player } from "../models/Player";
import usePlayers from "../hooks/usePlayers";

type TeamState = {
  squad: Player[];
  bench: Player[];
  rest: Player[];
};

const CreatePlayerMatchPage = () => {
  const {
    players,
    error,
    loading,
    refetch,
  }: {
    players: Player[];
    error: any;

    loading: boolean;
    refetch: () => void;
  } = usePlayers();

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
        <DraggablePlayersColumns players={players} refetch={refetch} />
      </section>
    </>
  );
};

export default CreatePlayerMatchPage;
