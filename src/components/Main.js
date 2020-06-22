import React from "react";
import { Layout, Menu } from "antd";
import { Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import Upload from "./Upload";
import List from "./List";
import Statistics from "./Statistics";
const { Content, Sider } = Layout;
const Main = () => {
  return (
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/upload">Upload Files</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/list">List/Modify Files</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/statistics">Statitics</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/upload" component={Upload} />
          <Route path="/list" component={List} />
          <Route path="/statistics" component={Statistics} />
        </Switch>
        {/* <Home path="/" />
        <Upload path="/upload" />
        <List path="list" />
        <Statistics path="/statistics" /> */}
      </Content>
    </Layout>
    // <Layout style={{ padding: "0 24px 24px" }}>

    // </Layout>
  );
};

export default Main;
