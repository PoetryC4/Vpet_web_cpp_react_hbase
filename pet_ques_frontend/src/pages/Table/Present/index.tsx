import {useModel} from '@@/exports';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import {Button, Descriptions, Image, message, Pagination} from 'antd';
import {Table} from 'antd/lib';
import {ColumnsType} from 'antd/lib/table';
import React, {useEffect, useState} from 'react';
import {presentInfo} from "@/assets/shop/present"; // 无map方法
import {imageList} from "@/assets/imageList";

const getPaginationData = (pageIndex: number, pageSize: number) => {
    const pageIndex_2 = Math.max(1, pageIndex)
    const pageSize_2 = Math.max(1, pageSize)
    const offset = Math.max(0, (pageIndex_2 - 1) * pageSize_2)
    return presentInfo.slice(offset, Math.min(presentInfo.length, offset + pageSize))
}

const getExpandInfo = (record: API.Present) => {
    //const items: DescriptionsProps['items'] = ;

    return ([
        {
            label: '礼物补充心情值',
            children: record.present_mood?.toFixed(2),
        },
        {
            label: '礼物提供经验值',
            children: record.present_exp?.toFixed(2),
        },
        {
            label: '礼物性能',
            children: record.present_performance?.toFixed(2),
        },
    ]);
}

const PresentTable: React.FC = (props) => {
    const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
    const [type, setType] = useState<string>('account');
    const {initialState, setInitialState} = useModel('@@initialState');
    const presentTableClass = useEmotionCss(() => {
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
    const [presentTable, setPresentTable] = useState<API.Present[]>([]);
    const [presentCount, setPresentCount] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const pageSizes = [8, 16, 24];

    if (!initialState) {
        return (<div>加载错误</div>);
    }

  let ticks = {}
  if (process.env.NODE_ENV === 'development') {
    ticks = imageList.present.reduce((acc, currentValue, index) => {
      acc[currentValue] = require("../../../assets/images/present/" + currentValue);
      return acc;
    }, {});

  } else {
    ticks = imageList.present.reduce((acc, currentValue, index) => {
      acc[currentValue] = "assets/images/present/" + currentValue
      return acc;
    }, {});
  }

    const handleBuyPresent = (props?.handleBuyPresent || ((present: API.Present) => {
        console.log(present);
    }))

    const tableWidth = props?.width || '60%'

    const getPresents = async () => {
        try {
            const res = getPaginationData(pageIndex, pageSize)
            setPresentTable(res || []);
            setPresentCount(presentInfo.length);
        } catch (error) {
            message.error("获取失败" + error);
        }
    };

    const handlePaginationChange = async (page: number, page_size: number) => {
        setPageIndex(page);
        setPageSize(page_size);
    };

    useEffect(() => {
        getPresents();
    }, [pageSize, pageIndex]);

    const columns: ColumnsType<API.Present> = [
        {
            title: '礼物展示', dataIndex: '', key: 'presentDisplay',
            width: 55,
            render: (text, record) => (
                <div>
                    <Image
                        width={100}
                        src={ticks[record.present_pic_path]}
                    />
                </div>
            ),
        },
        {
            title: '礼物名称', dataIndex: '', key: 'present_name',
            width: 100,
            render: (text, record) => (
                <div>
                    {record.present_name}
                </div>
            ),
        },
        {
            title: '礼物价格', dataIndex: '', key: 'present_price',
            render: (text, record) => (
                <div>
                    {record.present_price?.toFixed(2)}￥
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
                        onClick={() => handleBuyPresent(record)}
                        style={{marginLeft: 20, marginRight: 20}}
                    >
                        购买
                    </Button>
                </div>
            ),
        },
    ];
    return (
        <div className={presentTableClass}>
            <div
                style={{
                    width: tableWidth,
                    inset: 0,
                    margin: '0 auto auto auto',
                }}
            >
                <Table
                    rowKey={(record) => (record.present_id || -1).toString()}
                    pagination={false}
                    columns={columns}
                    expandable={{
                        expandedRowRender: (record) => (
                            <div>
                                <Descriptions
                                    title="礼物信息"
                                    bordered
                                    column={{xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4}}
                                    items={getExpandInfo(record)}
                                />
                            </div>
                        ),
                        rowExpandable: (record) => record.present_name !== null,
                    }}
                    dataSource={presentTable}
                />
                <Pagination
                    style={{inset: 0, margin: '1% auto auto auto'}}
                    showSizeChanger
                    total={presentCount}
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
export default PresentTable;
