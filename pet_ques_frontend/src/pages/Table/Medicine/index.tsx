import {useModel} from '@@/exports';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import {Button, Descriptions, Image, message, Pagination} from 'antd';
import {Table} from 'antd/lib';
import {ColumnsType} from 'antd/lib/table';
import React, {useEffect, useState} from 'react';
import {imageList} from "@/assets/imageList";
import {medicineInfo} from "@/assets/shop/medicine";

const getPaginationData = (pageIndex: number, pageSize: number) => {
    const pageIndex_2 = Math.max(1, pageIndex)
    const pageSize_2 = Math.max(1, pageSize)
    const offset = Math.max(0, (pageIndex_2 - 1) * pageSize_2)
    return medicineInfo.slice(offset, Math.min(medicineInfo.length, offset + pageSize))
}
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
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const pageSizes = [8, 16, 24];

    if (!initialState) {
        return (<div>加载错误</div>);
    }

  let ticks = {}
  if (process.env.NODE_ENV === 'development') {
    ticks = imageList.medicine.reduce((acc, currentValue, index) => {
      acc[currentValue] = require("../../../assets/images/medicine/" + currentValue);
      return acc;
    }, {});

  } else {
    ticks = imageList.medicine.reduce((acc, currentValue, index) => {
      acc[currentValue] = "assets/images/medicine/" + currentValue
      return acc;
    }, {});
  }

    const handleBuyMedicine = (props?.handleBuyMedicine || ((medicine: API.Medicine) => {
        console.log(medicine);
    }))

    const tableWidth = props?.width || '60%'

    const getMedicines = async () => {
        try {
            const res = getPaginationData(pageIndex, pageSize)
            setMedicineTable(res || []);
            setMedicineCount(medicineInfo.length);
        } catch (error) {
            message.error("获取失败" + error);
        }
    };

    const handlePaginationChange = async (page: number, page_size: number) => {
        setPageIndex(page);
        setPageSize(page_size);
    };

    useEffect(() => {
        getMedicines();
    }, [pageSize, pageIndex]);

    const columns: ColumnsType<API.Medicine> = [
        {
            title: '药物展示', dataIndex: '', key: 'medicineDisplay',
            width: 55,
            render: (text, record) => (
                <div>
                    <Image
                        width={100}
                        src={ticks[record.medicine_pic_path]}
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
export default MedicineTable;
