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
import {addMedicineUsingPost, getMedicineByPageUsingPost} from "@/services/pet_ques/medicineController";
import {Image} from 'antd';

const handleCopyCase = (medicine_id: number) => {
  history.push(`/add/medicine?medicine_id=${medicine_id}`);
};
const handleAddCase = () => {
  history.push(`/add/medicine`);
};
const handleUpdateCase = (medicine_id: number) => {
  history.push(`/update/medicine?medicine_id=${medicine_id}`);
};

const imageUrlPrefix = "http://192.168.116.129:12432/static/medicine/"

const getExpandInfo = (record: API.Medicine) => {
  //const items: DescriptionsProps['items'] = ;

  return ([
    {
      label: '药物补充心情值',
      children: record.medicine_mood?.toFixed(2),
    },
    {
      label: '药物补充耐力值',
      children: record.medicine_endu?.toFixed(2),
    },
    {
      label: '药物提供经验值',
      children: record.medicine_exp?.toFixed(2),
    },
    {
      label: '药物补充健康值',
      children: record.medicine_health?.toFixed(2),
    },
  ]);
}

const MedicineTable: React.FC = (props) => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const {initialState, setInitialState} = useModel('@@initialState');
  const medicineTableClass = useEmotionCss(() => {
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
  const [medicineTable, setMedicineTable] = useState<API.Medicine[]>([]);
  const [medicineCount, setMedicineCount] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [curPage, setCurPage] = useState(1);
  const [page_size, setPageSize] = useState(8);
  const page_sizes = [8, 16, 24];

  if (!initialState) {
    return (<div>加载错误</div>);
  }

  const handleBuyMedicine = (props?.handleBuyMedicine || ((medicine: API.Medicine) => {
    console.log(medicine);
  }))

  const tableWidth = props?.width || '60%'

  const getMedicines = async () => {
    try {
      const res = await getMedicineByPageUsingPost({
        page_size: page_size,
        page: curPage,
      });
      if (res.code === 0) {
        setMedicineTable(res.data.records || []);
        setMedicineCount(res.data.count || 0);
        message.success("获取成功");
      } else {
        message.error("获取失败:", res.msg)
      }
      message.success("获取成功");
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
    getMedicines();
  }, [page_size, curPage, searchInput]);

  const columns: ColumnsType<API.Medicine> = [
    {
      title: '药物展示', dataIndex: '', key: 'medicineDisplay',
      width: 55,
      render: (text, record) => (
        <div>
          <Image
            width={100}
            src={imageUrlPrefix + record.medicine_pic_path}
          />
        </div>
      ),
    },
    {
      title: '药物名称', dataIndex: '', key: 'medicine_name',
      width: 100,
      render: (text, record) => (
        <div>
          {record.medicine_name}
        </div>
      ),
    },
    {
      title: '药物价格', dataIndex: '', key: 'medicine_price',
      render: (text, record) => (
        <div>
          {record.medicine_price?.toFixed(2)}￥
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
            onClick={() => handleBuyMedicine(record)}
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
            onClick={() => handleCopyCase(record.medicine_id || 0)}
            style={{marginLeft: 20, marginRight: 20}}
          >
            复制
          </Button>
          <Button
            type="primary"
            onClick={() => handleUpdateCase(record.medicine_id || 0)}
            style={{marginLeft: 20, marginRight: 20}}
          >
            修改
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className={medicineTableClass}>
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
          rowKey={(record) => (record.medicine_id || -1).toString()}
          pagination={false}
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <div>
                <Descriptions
                  title="药物信息"
                  bordered
                  column={{xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4}}
                  items={getExpandInfo(record)}
                />
              </div>
            ),
            rowExpandable: (record) => record.medicine_name !== null,
          }}
          dataSource={medicineTable}
        />
        <Pagination
          style={{inset: 0, margin: '1% auto auto auto'}}
          showSizeChanger
          total={medicineCount}
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
export default MedicineTable;
