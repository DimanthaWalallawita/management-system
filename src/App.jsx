import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import { Layout, Menu } from "antd";
import "./App.scss";

const { Header, Content } = Layout;

const TopNavComponent = lazy(() => import("TopNav/TopNav"));

function App() {
  return (
    <Router>
      <Layout>
        <Navbar />

        <Content style={{ padding: "0px" }}>
          <AppRoutes />
        </Content>
      </Layout>
      <Footer />
    </Router>
  );
}

export default App;
