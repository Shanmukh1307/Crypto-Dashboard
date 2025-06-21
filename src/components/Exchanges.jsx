import React, { useEffect, useState } from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";
import { fetchExchanges } from "../services/getExchanges";
import Loader from "./Loader";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchExchanges();
        setExchanges(data);
      } catch (error) {
        console.error("Error fetching exchanges:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Row>
        <Col span={6}><strong>Exchanges</strong></Col>
        <Col span={6}><strong>24h Volume</strong></Col>
        <Col span={6}><strong>Trust Score</strong></Col>
        <Col span={6}><strong>Country</strong></Col>
      </Row>

      <Row>
        {exchanges.map((exchange) => (
          <Col span={24} key={exchange.id}>
            <Collapse>
              <Panel
                showArrow={false}
                header={
                  <Row>
                    <Col span={6}>
                      <Text><strong>{exchange.trust_score_rank}.</strong></Text>
                      <Avatar src={exchange.image} className="exchange-image" />
                      <Text><strong> {exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(exchange.trade_volume_24h_btc)}</Col>
                    <Col span={6}>{exchange.trust_score || "N/A"}</Col>
                    <Col span={6}>{exchange.country || "Unknown"}</Col>
                  </Row>
                }
              >
                {HTMLReactParser(exchange.description || "No description available.")}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
