import React, { useEffect, useState } from 'react';
import { Layout, Table, Tooltip, Input } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import data from './record';

const { Header, Content } = Layout;
const columns = [
  {
    title: (
      <span>
        <span style={{ marginRight: 5 }}>成分 id</span>
        <Tooltip placement="top" title="成分 id 为无表示 id 为 NA">
          <QuestionCircleOutlined />
        </Tooltip>
      </span>
    ),
    width: 100,
    dataIndex: 'id',
    key: 'id',
    render: (value: string) => {
      return value || '无';
    },
  },
  {
    title: '成分名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '链接地址',
    dataIndex: 'link',
    key: 'link',
    render: (value: string) => {
      return (
        <a href={value} target="blank">
          {value}
        </a>
      );
    },
  },
  {
    title: 'PubChem Id',
    dataIndex: 'fileName',
    key: 'fileName',
  },
  {
    title: 'PubChem 链接',
    dataIndex: 'pubChemHref',
    key: 'pubChemHref',
    render: (value: string) => {
      return (
        <a href={value} target="blank">
          {value}
        </a>
      );
    },
  },
  {
    title: '是否获得 CSV 数据',
    dataIndex: 'canGetCSVData',
    key: 'canGetCSVData',
    width: 150,
    render: (value: boolean) => {
      return value ? '是' : '否';
    },
  },
  {
    title: '错误信息',
    dataIndex: 'errMessage',
    key: 'errMessage',
    ellipsis: true,
  },
];

export default () => {
  const [dataSource, setData] = useState(data.records);
  const [searchText, setText] = useState('');

  const handleChange = (e: any) => {
    setText(e.target.value);
  };

  const filterTableData = (text?: string) => {
    if (text) {
      const d = dataSource.filter(
        r => r.id?.includes(text) || r.name.includes(text),
      );
      setData(d);
    } else {
      setData(data.records);
    }
  };

  useEffect(() => {
    filterTableData(searchText);
  }, [searchText]);

  return (
    <Layout>
      <Header>
        <h1 style={{ color: '#fff' }}>结果查询</h1>
      </Header>
      <Content style={{ padding: '0 10px' }}>
        <Input
          value={searchText}
          onChange={handleChange}
          placeholder="仅支持成分 id 和 成分名称搜索"
          style={{ width: 250, margin: '10px auto' }}
        />
        <Table dataSource={dataSource} columns={columns} />;
      </Content>
    </Layout>
  );
};
