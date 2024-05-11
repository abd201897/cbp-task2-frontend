import React, { useEffect, useState } from "react";
import { ThirdPartyAPI } from "../../../core/apis";
import { Col, Row, Avatar, Card, Typography } from "antd";

const { Meta } = Card;
const News = () => {
  const [data, setData] = useState([]);
  const ThirdPartyFun = async () => {
    try {
      const res = await ThirdPartyAPI();

      setData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ThirdPartyFun();
  }, []);
  const { Title, Text } = Typography;
  const liS = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    border: "1px solid rgba(0,0,0,.2)",
    borderRadius: "10px",
    marginTop: "10px",
    padding: "5px 20px",
    cursor: "pointer",
  };
  return (
    <div style={{ height:'92vh',overflow:'auto'}}>
      <Title style={{ textAlign: "center", marginTop: "20px" }}>
        Third Party API / Clients / Users
      </Title>
      <Row gutter={[12, 12]}>
        {data?.map((user) => (
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Card>
              <div>{user?.id}</div>
              <ul>
                <li style={liS}>
                  <h2>name</h2>
                  <h3>{user?.name}</h3>
                </li>
                <li style={liS}>
                  <h2>email</h2>
                  <h3>{user?.email}</h3>
                </li>
                <li style={liS}>
                  <h2>phone</h2>
                  <h3>{user?.phone}</h3>
                </li>
                <li style={liS}>
                  <h2>website</h2>
                  <a>{user?.website}</a>
                </li>
              </ul>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default News;
