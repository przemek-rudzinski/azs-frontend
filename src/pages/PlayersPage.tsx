import NewPlayerForm from "../components/NewPlayerForm";
import PlayersList from "../components/PlayersList";
import usePlayers from "../hooks/usePlayers";

const PlayersPage = () => {
  const { players, error, loading, refetch } = usePlayers();

  return (
    <>
      <section className="flex flex-row justify-evenly">
        <PlayersList
          players={players}
          error={error}
          loading={loading}
          refetch={refetch}
        />
        <NewPlayerForm refetch={refetch} />
      </section>
    </>
  );
};

export default PlayersPage;
