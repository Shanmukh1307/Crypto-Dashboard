import React, { useState } from 'react';
import { Select, Typography, Row, Col, Card } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: newsCategory,
    count: simplified ? 6 : 12,
  });

  if (!cryptoNews?.articles) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-12 bg-white">
      {!simplified && (
        <div className="mb-8 max-w-md mx-auto">
          <Select
            showSearch
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
            className="w-full"
            size="large"
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => (
              <Option key={coin.uuid} value={coin.name}>
                {coin.name}
              </Option>
            ))}
          </Select>
        </div>
      )}

      <Row gutter={[24, 24]}>
        {cryptoNews.articles.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card
              hoverable
              className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-black h-[360px] overflow-hidden flex flex-col justify-between"
            >
              <a href={news.url} target="_blank" rel="noreferrer" className="block h-full">
                <div className="flex items-start space-x-4">
                  {news.image && (
                    <img
                      className="w-24 h-24 object-cover rounded-lg"
                      src={news.image}
                      alt="news"
                    />
                  )}
                  <div className="flex-1">
                    <Title level={4} className="text-gray-900 !text-lg !font-semibold !mb-2 line-clamp-2">
                      {news.title}
                    </Title>
                    <p className="text-gray-700 text-sm line-clamp-3">
                      {news.description}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <Text className="text-gray-600 font-medium">
                    {news.source.name}
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    {moment(news.publishedAt).fromNow()}
                  </Text>
                </div>
                <div className="mt-3 text-right">
                  <span className="text-blue-600 font-semibold text-sm hover:underline">
                    Read more →
                  </span>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default News;
