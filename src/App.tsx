import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewMatch from "./pages/NewMatchPage";
import Layout from "./components/Layout";
import PlayersPage from "./pages/PlayersPage";
import PlayersMatchPage from "./pages/PlayersMatchPage";
import CreatePlayerMatchPage from "./pages/CreatePlayerMatchPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route path="login" element={<LoginPage />} />
        <Route
          path="new-match"
          element={
            <Layout>
              <NewMatch />
            </Layout>
          }
        />
        <Route
          path="players"
          element={
            <Layout>
              <PlayersPage />
            </Layout>
          }
        />
        <Route
          path="player-match/:matchId"
          element={
            <Layout>
              <PlayersMatchPage />
            </Layout>
          }
        />
        <Route
          path="create-player-match"
          element={
            <Layout>
              <CreatePlayerMatchPage />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
