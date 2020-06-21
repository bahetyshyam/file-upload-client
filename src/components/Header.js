import React from "react";

import { Layout } from "antd";

const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <div>
      <Layout>
        <Header style={{ backgroundColor: "#35496C" }} className="header">
          <div className="heading">Heading Comes Here</div>
        </Header>
      </Layout>
    </div>
  );
};

export default HeaderComponent;
