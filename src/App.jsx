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
        {/* <Header>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="home">
              <a href="/">Home</a>
            </Menu.Item>
            <Menu.Item key="login">
              <a href="/login">Login</a>
            </Menu.Item>
          </Menu>
        </Header> */}
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
