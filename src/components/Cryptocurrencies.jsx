import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Card, Row, Col, Input } from 'antd';
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const coins = cryptosList?.data?.coins || [];
    const filteredData = coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50">
      {!simplified && (
        <div className="mb-8 max-w-md mx-auto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          />
        </div>
      )}
      <Row gutter={[24, 24]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={
                  <span className="text-lg font-semibold text-gray-900">
                    {currency.rank}. {currency.name}
                  </span>
                }
                extra={
                  <img
                    className="w-8 h-8 rounded-full"
                    src={currency.iconUrl}
                    alt={currency.name}
                  />
                }
                hoverable
                className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-none"
              >
                <p className="text-gray-700 mb-2">
                  Price: ${millify(currency.price)}
                </p>
                <p className="text-gray-700 mb-2">
                  Market Cap: ${millify(currency.marketCap)}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    currency.change > 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  Daily Change: {currency.change > 0 ? '▲' : '▼'} {millify(currency.change)}%
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Cryptocurrencies;