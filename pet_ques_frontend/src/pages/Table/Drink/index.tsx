import {useModel} from '@@/exports';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import {history} from '@umijs/max';
import {Button, Col, Descriptions, DescriptionsProps, Divider, Input, message, Pagination, Result, Row} from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import {Table} from 'antd/lib';
import {ColumnsType} from 'antd/lib/table';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {addDrinkUsingPost, getDrinkByPageUsingPost} from "@/services/pet_ques/drinkController";
import {Image} from 'antd';

const handleCopyCase = (drinkId: number) => {
  history.push(`/add/drink?drinkId=${drinkId}`);
};
const handleAddCase = () => {
  history.push(`/add/drink`);
};
const handleUpdateCase = (drinkId: number) => {
  history.push(`/update/drink?drinkId=${drinkId}`);
};

const imageUrlPrefix = "http://192.168.116.129:12432/static/drink/"

const getExpandInfo = (record: API.Drink) => {
  //const items: DescriptionsProps['items'] = ;

  return ([
    {
      label: '饮料补充饥饿值',
      children: record.drinkHunger?.toFixed(2),
    },
    {
      label: '饮料补充心情值',
      children: record.drinkMood?.toFixed(2),
    },
    {
      label: '饮料补充口渴值',
      children: record.drinkThirsty?.toFixed(2),
    },
    {
      label: '饮料补充耐力值',
      children: record.drinkEndu?.toFixed(2),
    },
    {
      label: '饮料提供经验值',
      children: record.drinkExp?.toFixed(2),
    },
    {
      label: '饮料补充健康值',
      children: record.drinkHealth?.toFixed(2),
    },
  ]);
}

const handleBuyDrink = (drink: API.Drink) => {
  console.log(drink);
}

const DrinkTable: React.FC = (props) => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const {initialState, setInitialState} = useModel('@@initialState');
  const drinkTableClass = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
      height: '100vh',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
      backgroundColor: '#fafafa',
    };
  });

  const [loading, setLoading] = useState(false);
  const [drinkTable, setDrinkTable] = useState<API.Drink[]>([]);
  const [drinkCount, setDrinkCount] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [curPage, setCurPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const pageSizes = [8, 16, 24];

  if (!initialState) {
    return (<div>加载错误</div>);
  }

  const tableWidth = props?.width || '60%'

  const getDrinks = async () => {
    try {
      const res = await getDrinkByPageUsingPost({
        pageSize: pageSize,
        page: curPage,
      });
      setDrinkTable(res.records || []);
      setDrinkCount(res.count || 0);
      message.success("获取成功");
    } catch (error) {
      message.error("获取失败" + error);
    }
  };

  const handleSearchChange = async (e: { target: { value: React.SetStateAction<string>; }; }) => {
    // 更新状态的值
    setSearchInput(e.target.value);
  };

  const handlePaginationChange = async (page: number, pageSize: number) => {
    setCurPage(page);
    setPageSize(pageSize);
  };

  useEffect(() => {
    handlePaginationChange(1, 8);
    getDrinks();
  }, [pageSize, curPage, searchInput]);

  const columns: ColumnsType<API.Drink> = [
    {
      title: '饮料展示', dataIndex: '', key: 'drinkDisplay',
      width: 55,
      render: (text, record) => (
        <div>
          <Image
            width={100}
            src={imageUrlPrefix + record.drinkPicPath}
          />
        </div>
      ),
    },
    {
      title: '饮料名称', dataIndex: '', key: 'drinkName',
      width: 100,
      render: (text, record) => (
        <div>
          {record.drinkName}
        </div>
      ),
    },
    {
      title: '饮料价格', dataIndex: '', key: 'drinkPrice',
      render: (text, record) => (
        <div>
          {record.drinkPrice?.toFixed(2)}￥
        </div>
      ),
    },
    {
      title: '操作',
      width: 200,
      dataIndex: '',
      key: 'op',
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => handleBuyDrink(record)}
            style={{marginLeft: 20, marginRight: 20}}
          >
            购买
          </Button>
        </div>
      ),
    },
    {
      title: '管理员操作',
      width: 400,
      dataIndex: '',
      key: 'op',
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => handleCopyCase(record.drinkId || 0)}
            style={{marginLeft: 20, marginRight: 20}}
          >
            复制
          </Button>
          <Button
            type="primary"
            onClick={() => handleUpdateCase(record.drinkId || 0)}
            style={{marginLeft: 20, marginRight: 20}}
          >
            修改
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className={drinkTableClass}>
      <div
        style={{
          width: tableWidth,
          inset: 0,
          margin: '0 auto auto auto',
        }}
      >
        <Row style={{marginTop: '20px', marginBottom: '20px'}}>
          <Col span={8}>
            <Input
              placeholder="搜索输入"
              value={searchInput}
              onChange={handleSearchChange}
              style={{width: '90%', margin: '1% 40% 1% 10%'}}
            /></Col>
          <Col span={10}/>
          <Col span={6}>
            <Button
              type="primary"
              onClick={() => handleAddCase()}
              style={{marginLeft: 20, marginRight: 20}}
              block
            >
              添加
            </Button></Col>
        </Row>
        <Table
          rowKey={(record) => (record.drinkId || -1).toString()}
          pagination={false}
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <div>
                <Descriptions
                  title="饮料信息"
                  bordered
                  column={{xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4}}
                  items={getExpandInfo(record)}
                />
              </div>
            ),
            rowExpandable: (record) => record.drinkName !== null,
          }}
          dataSource={drinkTable}
        />
        <Pagination
          style={{inset: 0, margin: '1% auto auto auto'}}
          showSizeChanger
          total={drinkCount}
          showTotal={(total, range) =>
            `${total} 个结果中的 ${(curPage - 1) * pageSize + 1}-${Math.min(
              curPage * pageSize,
              total,
            )} `
          }
          defaultPageSize={pageSize}
          defaultCurrent={curPage}
          pageSizeOptions={pageSizes}
          onChange={handlePaginationChange}
        />
      </div>
    </div>
  );
};
export default DrinkTable;
