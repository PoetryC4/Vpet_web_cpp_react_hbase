import {useModel} from '@@/exports';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import {Button, Descriptions, Image, message, Pagination} from 'antd';
import {Table} from 'antd/lib';
import {ColumnsType} from 'antd/lib/table';
import React, {useEffect, useState} from 'react';
import {imageList} from "@/assets/imageList";
import {foodInfo} from "@/assets/shop/food";

const getPaginationData = (pageIndex: number, pageSize: number) => {
    const pageIndex_2 = Math.max(1, pageIndex)
    const pageSize_2 = Math.max(1, pageSize)
    const offset = Math.max(0, (pageIndex_2 - 1) * pageSize_2)
    console.log(foodInfo)
    console.log(foodInfo[0].food_pic_path)
    console.log(foodInfo[0].food_pic_path)
    return foodInfo.slice(offset, Math.min(foodInfo.length, offset + pageSize))
}
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
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const pageSizes = [8, 16, 24];

    if (!initialState) {
        return (<div>加载错误</div>);
    }

  let ticks = {}
  if (process.env.NODE_ENV === 'development') {
    ticks = imageList.food.reduce((acc, currentValue, index) => {
      acc[currentValue] = require("../../../assets/images/food/" + currentValue);
      return acc;
    }, {});

  } else {
    ticks = imageList.food.reduce((acc, currentValue, index) => {
      acc[currentValue] = "assets/images/food/" + currentValue
      return acc;
    }, {});
  }


    const handleBuyFood = (props?.handleBuyFood || ((food: API.Food) => {
        console.log(food);
    }))

    const tableWidth = props?.width || '60%'

    const getFoods = async () => {
        try {
            const res = getPaginationData(pageIndex, pageSize)
            setFoodTable(res || []);
            setFoodCount(foodInfo.length);
        } catch (error) {
            message.error("获取失败" + error);
        }
    };


    const handlePaginationChange = async (page: number, page_size: number) => {
        setPageIndex(page);
        setPageSize(page_size);
    };

    useEffect(() => {
        getFoods();
    }, [pageSize, pageIndex]);

    const columns: ColumnsType<API.Food> = [
        {
            title: '食物展示', dataIndex: '', key: 'foodDisplay',
            width: 55,
            render: (text, record) => (
                <div>
                    <Image
                        width={100}
                        src={ticks[record.food_pic_path]}
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
export default FoodTable;
