import {useModel} from '@@/exports';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import {history} from '@umijs/max';
import {Button, Divider, Input, message, Pagination, Result} from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import {Table} from 'antd/lib';
import {ColumnsType} from 'antd/lib/table';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {addDrinkUsingPost, getDrinkByPageUsingPost} from "@/services/pet_ques/drinkController";

const handleCopyCase = (drinkId: number) => {
  history.push(`/drink/add?drinkId=${drinkId}`);
};
const handleUpdateCase = (drinkId: number) => {
  history.push(`/drink/update?drinkId=${drinkId}`);
};

const DrinkTable: React.FC = () => {
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
    return loading;
  }

  const getDrinks = async () => {
    try {
      const res = await getDrinkByPageUsingPost({
        pageSize: pageSize,
        page: curPage,
      });
      setDrinkTable(res.records);
      setDrinkCount(res.count);
      message.success("获取成功");
    } catch (error) {
      message.error("获取失败" + error);
    }
  };

  const handleSearchChange = async (e) => {
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
      title: '饮料名称', dataIndex: '', key: 'drinkName',
      width: 100,
      render: (text, record) => (
        <div>
          {record.drinkName}
        </div>
      ),
    },
    {title: '饮料价格', dataIndex: '', key: 'drinkPrice',
      render: (text, record) => (
        <div>
          {record.drinkPrice?.toFixed(2)}
        </div>
      ),},
    {title: '饮料补充饥饿值', dataIndex: '', key: 'drinkHunger',
      render: (text, record) => (
        <div>
          {record.drinkHunger?.toFixed(2)}
        </div>
      ),},
    {title: '饮料补充心情值', dataIndex: '', key: 'drinkMood',
      render: (text, record) => (
        <div>
          {record.drinkMood?.toFixed(2)}
        </div>
      ),},
    {title: '饮料补充口渴值', dataIndex: '', key: 'drinkThirsty',
      render: (text, record) => (
        <div>
          {record.drinkThirsty?.toFixed(2)}
        </div>
      ),},
    {title: '饮料补充耐力值', dataIndex: '', key: 'drinkEndu',
      render: (text, record) => (
        <div>
          {record.drinkEndu?.toFixed(2)}
        </div>
      ),},
    {title: '饮料提供经验值', dataIndex: '', key: 'drinkExp',
      render: (text, record) => (
        <div>
          {record.drinkExp?.toFixed(2)}
        </div>
      ),},
    {title: '饮料补充健康值', dataIndex: '', key: 'drinkHealth',
      render: (text, record) => (
        <div>
          {record.drinkHealth?.toFixed(2)}
        </div>
      ),},
    {
      title: '操作',
      width: 400,
      dataIndex: '',
      key: 'op',
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => handleCopyCase(record.drinkId || '0')}
            style={{marginLeft: 20, marginRight: 20}}
          >
            复制
          </Button>
          <Button
            type="primary"
            onClick={() => handleUpdateCase(record.drinkId || '0')}
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
          rowKey="id"
          pagination={false}
          columns={columns}
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
