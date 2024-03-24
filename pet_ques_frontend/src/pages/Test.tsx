import {useModel} from '@umijs/max';
import {Button, theme} from 'antd';
import React, {useState} from 'react';

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */

export const getNum = {
    value: () => {
        return -1;
    }
}
export const changeNum = {
    value: (value: number) => {
        console.log("changeNum")
    }
}

const Test: React.FC = () => {
    const {token} = theme.useToken();
    const {initialState} = useModel('@@initialState');

    const [num, setNum] = useState(1)

    getNum.value = () => {
        return num
    }
    changeNum.value = (value: number) => {
        setNum(value)
    }

    return (
        <div>
            <Button onClick={() => {
                console.log("测试1")
            }}>获取</Button>
            <Button onClick={() => {
                console.log("测试2")
            }}>设置随机值</Button>
        </div>
    );
};

export default Test;
