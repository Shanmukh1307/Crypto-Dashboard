import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { skipToken } from "@reduxjs/toolkit/query";

import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import Loader from "./Loader";
import LineChart from "./LineChart";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery(
    coinId && timePeriod ? { coinId, timePeriod } : skipToken
  );
  const cryptoDetails = data?.data?.coin;

  if (isFetching || !coinId || !cryptoDetails) return <Loader />;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Approved Supply",
      value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails.totalSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className="coin-detail-container" style={{ backgroundColor: 'transparent' }}>
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name" style={{ fontWeight: 700, color: 'var(--text-primary, #000)' }}>
          {data?.data?.coin.name} Price
        </Title>
        <p style={{ color: '#4B5563' }}>
          {cryptoDetails.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Timeperiod"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />
      <Col className="stats-container" style={{ backgroundColor: 'transparent' }}>
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading" style={{ fontWeight: 700, color: 'var(--text-primary, #000)' }}>
              {cryptoDetails.name} Value Statistics
            </Title>
            <p style={{ color: '#4B5563' }}>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={title} style={{ backgroundColor: 'transparent' }}>
              <Col className="coin-stats-name">
                <Text style={{ color: '#4B5563' }}>{icon}</Text>
                <Text style={{ color: '#4B5563' }}>{title}</Text>
              </Col>
              <Text className="stats" style={{ color: 'var(--text-primary, #000)', fontWeight: 700 }}>{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading" style={{ fontWeight: 700, color: 'var(--text-primary, #000)' }}>
              Other Stats Info
            </Title>
            <p style={{ color: '#4B5563' }}>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={title} style={{ backgroundColor: 'transparent' }}>
              <Col className="coin-stats-name">
                <Text style={{ color: '#4B5563' }}>{icon}</Text>
                <Text style={{ color: '#4B5563' }}>{title}</Text>
              </Col>
              <Text className="stats" style={{ color: 'var(--text-primary, #000)', fontWeight: 700 }}>{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc" gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <Title level={3} className="coin-details-heading" style={{ fontWeight: 700, color: 'var(--text-primary, #000)' }}>
              What is {cryptoDetails.name}?
            </Title>
            <div style={{ fontSize: "20px", lineHeight: "1.8", color: '#4B5563' }}>
              {cryptoDetails.description
                ? HTMLReactParser(cryptoDetails.description)
                : "No description available."}
            </div>
          </Col>
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading" style={{ fontWeight: 700, color: 'var(--text-primary, #000)' }}>
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name" style={{ fontWeight: 700, color: '#4B5563' }}>
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer" style={{ color: '#1E3A8A', fontWeight: 500 }}>
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;