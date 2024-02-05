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
import {addFoodUsingPost, getFoodByPageUsingPost} from "@/services/pet_ques/foodController";
import {Image} from 'antd';

const handleCopyCase = (food_id: number) => {
  history.push(`/add/food?food_id=${food_id}`);
};
const handleAddCase = () => {
  history.push(`/add/food`);
};
const handleUpdateCase = (food_id: number) => {
  history.push(`/update/food?food_id=${food_id}`);
};

const imageUrlPrefix = "http://192.168.116.129:12432/static/food/"

const getExpandInfo = (record: API.Food) => {
  //const items: DescriptionsProps['items'] = ;

  return ([
    {
      label: '食物补充饥饿值',
      children: record.food_hunger?.toFixed(2),
    },
    {
      label: '食物补充心情值',
      children: record.food_mood?.toFixed(2),
    },
    {
      label: '食物补充口渴值',
      children: record.food_thirsty?.toFixed(2),
    },
    {
      label: '食物补充耐力值',
      children: record.food_endu?.toFixed(2),
    },
    {
      label: '食物提供经验值',
      children: record.food_exp?.toFixed(2),
    },
    {
      label: '食物补充健康值',
      children: record.food_health?.toFixed(2),
    },
  ]);
}

const FoodTable: React.FC = (props) => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const {initialState, setInitialState} = useModel('@@initialState');
  const foodTableClass = useEmotionCss(() => {
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
  const [foodTable, setFoodTable] = useState<API.Food[]>([]);
  const [foodCount, setFoodCount] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [curPage, setCurPage] = useState(1);
  const [page_size, setPageSize] = useState(8);
  const page_sizes = [8, 16, 24];

  if (!initialState) {
    return (<div>加载错误</div>);
  }


  const handleBuyFood = (props?.handleBuyFood || ((food: API.Food) => {
    console.log(food);
  }))

  const tableWidth = props?.width || '60%'

  const getFoods = async () => {
    try {
      const res = await getFoodByPageUsingPost({
        page_size: page_size,
        page: curPage,
      });
      if (res.code === 0) {
        setFoodTable(res.data.records || []);
        setFoodCount(res.data.count || 0);
        message.success("获取成功");
      } else {
        message.error("获取失败:", res.msg)
      }
    } catch (error) {
      message.error("获取失败" + error);
    }
  };

  const handleSearchChange = async (e: { target: { value: React.SetStateAction<string>; }; }) => {
    // 更新状态的值
    setSearchInput(e.target.value);
  };

  const handlePaginationChange = async (page: number, page_size: number) => {
    setCurPage(page);
    setPageSize(page_size);
  };

  useEffect(() => {
    handlePaginationChange(1, 8);
    getFoods();
  }, [page_size, curPage, searchInput]);

  const columns: ColumnsType<API.Food> = [
    {
      title: '食物展示', dataIndex: '', key: 'foodDisplay',
      width: 55,
      render: (text, record) => (
        <div>
          <Image
            width={100}
            src={imageUrlPrefix + record.food_pic_path}
          />
        </div>
      ),
    },
    {
      title: '食物名称', dataIndex: '', key: 'food_name',
      width: 100,
      render: (text, record) => (
        <div>
          {record.food_name}
        </div>
      ),
    },
    {
      title: '食物价格', dataIndex: '', key: 'food_price',
      render: (text, record) => (
        <div>
          {record.food_price?.toFixed(2)}￥
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
            onClick={() => handleBuyFood(record)}
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
            onClick={() => handleCopyCase(record.food_id || 0)}
            style={{marginLeft: 20, marginRight: 20}}
          >
            复制
          </Button>
          <Button
            type="primary"
            onClick={() => handleUpdateCase(record.food_id || 0)}
            style={{marginLeft: 20, marginRight: 20}}
          >
            修改
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className={foodTableClass}>
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
          rowKey={(record) => (record.food_id || -1).toString()}
          pagination={false}
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <div>
                <Descriptions
                  title="食物信息"
                  bordered
                  column={{xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4}}
                  items={getExpandInfo(record)}
                />
              </div>
            ),
            rowExpandable: (record) => record.food_name !== null,
          }}
          dataSource={foodTable}
        />
        <Pagination
          style={{inset: 0, margin: '1% auto auto auto'}}
          showSizeChanger
          total={foodCount}
          showTotal={(total, range) =>
            `${total} 个结果中的 ${(curPage - 1) * page_size + 1}-${Math.min(
              curPage * page_size,
              total,
            )} `
          }
          defaultPageSize={page_size}
          defaultCurrent={curPage}
          page_sizeOptions={page_sizes}
          onChange={handlePaginationChange}
        />
      </div>
    </div>
  );
};
export default FoodTable;
