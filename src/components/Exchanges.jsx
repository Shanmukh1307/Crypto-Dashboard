import React, { useEffect, useState } from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";
import { fetchExchanges } from "../services/getExchanges";
import Loader from "./Loader";

const { Text, Title } = Typography;
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
    <div className="container mx-auto px-4 py-12 bg-gray-50">
      <Title level={2} className="text-4xl font-bold text-gray-900 text-left mb-8">
        Top Crypto Exchanges
      </Title>
      <Row className="mb-4 border-b border-gray-200 pb-2">
        <Col xs={12} sm={6}>
          <Text className="text-lg font-semibold text-gray-700">Exchanges</Text>
        </Col>
        <Col xs={12} sm={6}>
          <Text className="text-lg font-semibold text-gray-700">24h Volume</Text>
        </Col>
        <Col xs={12} sm={6}>
          <Text className="text-lg font-semibold text-gray-700">Trust Score</Text>
        </Col>
        <Col xs={12} sm={6}>
          <Text className="text-lg font-semibold text-gray-700">Country</Text>
        </Col>
      </Row>
      <Row gutter={[0, 16]}>
        {exchanges.map((exchange) => (
          <Col span={24} key={exchange.id}>
            <Collapse
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              expandIconPosition="right"
            >
              <Panel
                header={
                  <Row className="items-center">
                    <Col xs={12} sm={6} className="flex items-center space-x-2">
                      <Text className="text-gray-900 font-semibold">
                        {exchange.trust_score_rank}.
                      </Text>
                      <Avatar
                        src={exchange.image}
                        className="w-8 h-8"
                        alt={exchange.name}
                      />
                      <Text className="text-gray-900 font-semibold">
                        {exchange.name}
                      </Text>
                    </Col>
                    <Col xs={12} sm={6}>
                      <Text className="text-gray-700">
                        ${millify(exchange.trade_volume_24h_btc)}
                      </Text>
                    </Col>
                    <Col xs={12} sm={6}>
                      <Text className="text-gray-700">
                        {exchange.trust_score || "N/A"}
                      </Text>
                    </Col>
                    <Col xs={12} sm={6}>
                      <Text className="text-gray-700">
                        {exchange.country || "Unknown"}
                      </Text>
                    </Col>
                  </Row>
                }
                className="p-4"
              >
                <div className="text-gray-600">
                  {HTMLReactParser(exchange.description || "No description available.")}
                </div>
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Exchanges;