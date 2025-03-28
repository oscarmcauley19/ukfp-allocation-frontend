import "./App.css";
import { Route, Routes } from "react-router-dom";
import RankingsPage from "./components/RankingsPage";
import RunPage from "./components/RunPage";
import Layout from "./components/Layout";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/rankings" element={<RankingsPage />} />
          <Route path="/run" element={<RunPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
