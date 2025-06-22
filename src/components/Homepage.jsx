import React from 'react';
import { Spin, Typography, Row, Col, Statistic } from 'antd';
import millify from 'millify';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Link } from 'react-router-dom';
import { Cryptocurrencies, News } from './';
import Loader from './Loader';

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching || !globalStats) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50">
      <Title level={2} className="text-4xl font-bold text-gray-900 text-left mb-8">
        Global Crypto Stats
      </Title>
      <Row gutter={[24, 24]} className="mb-12 flex justify-start">
        <Col xs={24} sm={12} md={6}>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
            <Statistic
              title={<span className="text-gray-700 text-lg font-semibold">Total Cryptocurrencies</span>}
              value={millify(globalStats.total)}
              className="text-center"
              valueStyle={{ color: '#1f2937', fontSize: '1.5rem', fontWeight: '700' }}
            />
          </div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
            <Statistic
              title={<span className="text-gray-700 text-lg font-semibold">Total Exchanges</span>}
              value={millify(globalStats.totalExchanges)}
              className="text-center"
              valueStyle={{ color: '#1f2937', fontSize: '1.5rem', fontWeight: '700' }}
            />
          </div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
            <Statistic
              title={<span className="text-gray-700 text-lg font-semibold">Total Market Cap</span>}
              value={millify(globalStats.totalMarketCap)}
              className="text-center"
              valueStyle={{ color: '#1f2937', fontSize: '1.5rem', fontWeight: '700' }}
            />
          </div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
            <Statistic
              title={<span className="text-gray-700 text-lg font-semibold">Total 24h Volume</span>}
              value={millify(globalStats.total24hVolume)}
              className="text-center"
              valueStyle={{ color: '#1f2937', fontSize: '1.5rem', fontWeight: '700' }}
            />
          </div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
            <Statistic
              title={<span className="text-gray-700 text-lg font-semibold">Total Markets</span>}
              value={millify(globalStats.totalMarkets)}
              className="text-center"
              valueStyle={{ color: '#1f2937', fontSize: '1.5rem', fontWeight: '700' }}
            />
          </div>
        </Col>
      </Row>
      <div className="flex items-center justify-between mb-4">
        <Title level={2} className="text-3xl font-semibold text-gray-900 m-0">
          Top 10 Cryptocurrencies in the World
        </Title>
        <Title level={3} className="text-lg m-0">
          <Link to="/cryptocurrencies" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
            Show More
          </Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="flex items-center justify-between mb-4 mt-12">
        <Title level={2} className="text-3xl font-semibold text-gray-900 m-0">
          Latest Crypto News
        </Title>
        <Title level={3} className="text-lg m-0">
          <Link to="/news" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
            Show More
          </Link>
        </Title>
      </div>
      <News simplified />
    </div>
  );
};

export default Homepage;