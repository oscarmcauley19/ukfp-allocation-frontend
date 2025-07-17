import "./App.css";
import { Route, Routes } from "react-router-dom";
import RunPage from "./components/RunPage";
import Layout from "./components/Layout";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/run" element={<RunPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
