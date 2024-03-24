import {useModel} from '@@/exports';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import {Button, Descriptions, Image, message, Pagination} from 'antd';
import {Table} from 'antd/lib';
import {ColumnsType} from 'antd/lib/table';
import React, {useEffect, useState} from 'react';
import {imageList} from "@/assets/imageList";
import {drinkInfo} from "@/assets/shop/drink";

const getPaginationData = (pageIndex: number, pageSize: number) => {
  const pageIndex_2 = Math.max(1, pageIndex)
  const pageSize_2 = Math.max(1, pageSize)
  const offset = Math.max(0, (pageIndex_2 - 1) * pageSize_2)
  return drinkInfo.slice(offset, Math.min(drinkInfo.length, offset + pageSize))
}
const getExpandInfo = (record: API.Drink) => {
  //const items: DescriptionsProps['items'] = ;

  return ([
    {
      label: '饮料补充饥饿值',
      children: record.drink_hunger?.toFixed(2),
    },
    {
      label: '饮料补充心情值',
      children: record.drink_mood?.toFixed(2),
    },
    {
      label: '饮料补充口渴值',
      children: record.drink_thirsty?.toFixed(2),
    },
    {
      label: '饮料补充耐力值',
      children: record.drink_endu?.toFixed(2),
    },
    {
      label: '饮料提供经验值',
      children: record.drink_exp?.toFixed(2),
    },
    {
      label: '饮料补充健康值',
      children: record.drink_health?.toFixed(2),
    },
  ]);
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
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const pageSizes = [8, 16, 24];

  if (!initialState) {
    return (<div>加载错误</div>);
  }
  let ticks = {}
  if (process.env.NODE_ENV === 'development') {
    ticks = imageList.drink.reduce((acc, currentValue, index) => {
      acc[currentValue] = require("../../../assets/images/drink/" + currentValue);
      return acc;
    }, {});

  } else {
    ticks = imageList.drink.reduce((acc, currentValue, index) => {
      acc[currentValue] = "assets/images/drink/" + currentValue
      return acc;
    }, {});
  }
  const handleBuyDrink = (props?.handleBuyDrink || ((drink: API.Drink) => {
    console.log(drink);
  }))

  const tableWidth = props?.width || '60%'

  const getDrinks = async () => {
    try {
      const res = getPaginationData(pageIndex, pageSize)
      console.log(res)
      setDrinkTable(res || []);
      setDrinkCount(drinkInfo.length);
    } catch (error) {
      message.error("获取失败" + error);
    }
  };

  const handlePaginationChange = async (page: number, page_size: number) => {
    setPageIndex(page);
    setPageSize(page_size);
  };

  useEffect(() => {
    getDrinks();
  }, [pageSize, pageIndex]);

  const columns: ColumnsType<API.Drink> = [
    {
      title: '饮料展示', dataIndex: '', key: 'drinkDisplay',
      width: 55,
      render: (text, record) => (
        <div>
          <Image
            width={100}
            src={ticks[record.drink_pic_path]}
          />
        </div>
      ),
    },
    {
      title: '饮料名称', dataIndex: '', key: 'drink_name',
      width: 100,
      render: (text, record) => (
        <div>
          {record.drink_name}
        </div>
      ),
    },
    {
      title: '饮料价格', dataIndex: '', key: 'drink_price',
      render: (text, record) => (
        <div>
          {record.drink_price?.toFixed(2)}￥
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
        <Table
          rowKey={(record) => (record.drink_id || -1).toString()}
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
            rowExpandable: (record) => record.drink_name !== null,
          }}
          dataSource={drinkTable}
        />
        <Pagination
          style={{inset: 0, margin: '1% auto auto auto'}}
          showSizeChanger
          total={drinkCount}
          showTotal={(total, range) =>
            `${total} 个结果中的 ${(pageIndex - 1) * pageSize + 1}-${Math.min(
              pageIndex * pageSize,
              total,
            )} `
          }
          defaultPageSize={pageSize}
          defaultCurrent={pageIndex}
          pageSizeOptions={pageSizes}
          onChange={handlePaginationChange}
        />
      </div>
    </div>
  );
};
export default DrinkTable;
