import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Layout } from "antd";

const { Header } = Layout;

const HeaderComponent = () => {
  let location = useLocation();
  const [currentHeader, setCurrentHeader] = useState("Home");
  useEffect(() => {
    if (location.pathname === "/") {
      setCurrentHeader("Home");
    } else if (location.pathname === "/upload") {
      setCurrentHeader("Upload Files");
    } else if (location.pathname === "/list") {
      setCurrentHeader("List/Modify Files");
    } else if (location.pathname === "/statistics") {
      setCurrentHeader("Statistics");
    }
  }, [location]);
  return (
    <div>
      <Layout>
        <Header style={{ backgroundColor: "#35496C" }} className="header">
          <div className="heading">{currentHeader}</div>
        </Header>
      </Layout>
    </div>
  );
};

export default HeaderComponent;
