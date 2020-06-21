import React from "react";

import { Layout, Menu } from "antd";

const { Sider } = Layout;

const SideBar = () => {
  return (
    <div>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="1">option1</Menu.Item>
            <Menu.Item key="2">option2</Menu.Item>
            <Menu.Item key="3">option3</Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    </div>
  );
};

export default SideBar;
