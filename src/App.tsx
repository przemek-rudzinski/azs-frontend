import React from "react";
import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewMatch from "./pages/NewMatchPage";
import Layout from "./components/Layout";
import PlayersPage from "./pages/PlayersPage";

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
      </Routes>
    </div>
  );
}

export default App;
