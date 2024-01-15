import {useModel} from '@@/exports';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import {history} from '@umijs/max';
import {Button, Descriptions, DescriptionsProps, Divider, Input, message, Pagination, Result} from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import {Table} from 'antd/lib';
import {ColumnsType} from 'antd/lib/table';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {addFoodUsingPost, getFoodByPageUsingPost} from "@/services/pet_ques/foodController";
import {Image} from 'antd';

const handleCopyCase = (foodId: number) => {
  history.push(`/add/food?foodId=${foodId}`);
};
const handleUpdateCase = (foodId: number) => {
  history.push(`/update/food?foodId=${foodId}`);
};

const imageUrlPrefix = "http://192.168.116.129:12432/static/food/"

const getExpandInfo = (record: API.Food) => {
  //const items: DescriptionsProps['items'] = ;

  return ([
    {
      label: '食物补充饥饿值',
      children: record.foodHunger?.toFixed(2),
    },
    {
      label: '食物补充心情值',
      children: record.foodMood?.toFixed(2),
    },
    {
      label: '食物补充口渴值',
      children: record.foodThirsty?.toFixed(2),
    },
    {
      label: '食物补充耐力值',
      children: record.foodEndu?.toFixed(2),
    },
    {
      label: '食物提供经验值',
      children: record.foodExp?.toFixed(2),
    },
    {
      label: '食物补充健康值',
      children: record.foodHealth?.toFixed(2),
    },
  ]);
}

const handleBuyFood = (food: API.Food) => {
  console.log(food);
}

const FoodTable: React.FC = () => {
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
  const [pageSize, setPageSize] = useState(8);
  const pageSizes = [8, 16, 24];

  if (!initialState) {
    return (<div>加载错误</div>);
  }

  const getFoods = async () => {
    try {
      const res = await getFoodByPageUsingPost({
        pageSize: pageSize,
        page: curPage,
      });
      setFoodTable(res.records || []);
      setFoodCount(res.count || 0);
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
    getFoods();
  }, [pageSize, curPage, searchInput]);

  const columns: ColumnsType<API.Food> = [
    {
      title: '食物展示', dataIndex: '', key: 'foodDisplay',
      width: 55,
      render: (text, record) => (
        <div>
          <Image
            width={100}
            src={imageUrlPrefix + record.foodPicPath}
          />
        </div>
      ),
    },
    {
      title: '食物名称', dataIndex: '', key: 'foodName',
      width: 100,
      render: (text, record) => (
        <div>
          {record.foodName}
        </div>
      ),
    },
    {
      title: '食物价格', dataIndex: '', key: 'foodPrice',
      render: (text, record) => (
        <div>
          {record.foodPrice?.toFixed(2)}￥
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
            onClick={() => handleCopyCase(record.foodId || 0)}
            style={{marginLeft: 20, marginRight: 20}}
          >
            复制
          </Button>
          <Button
            type="primary"
            onClick={() => handleUpdateCase(record.foodId || 0)}
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
          width: '60%',
          inset: 0,
          margin: '0 auto auto auto',
        }}
      >
        <Input
          placeholder="搜索输入"
          value={searchInput}
          onChange={handleSearchChange}
          style={{width: '30%', margin: '1% 40% 1% 10%'}}
        />
        <Table
          rowKey={(record) => (record.foodId || -1).toString()}
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
            rowExpandable: (record) => record.foodName !== null,
          }}
          dataSource={foodTable}
        />
        <Pagination
          style={{inset: 0, margin: '1% auto auto auto'}}
          showSizeChanger
          total={foodCount}
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
export default FoodTable;
