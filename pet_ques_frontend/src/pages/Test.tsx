import {useModel} from '@umijs/max';
import {Button, theme, Typography} from 'antd';
import React, {useEffect, useState} from 'react';
import {getAllDrinkUsingGet} from "@/services/pet_ques/drinkController";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/skeleton/Paragraph";
import {tryGetNum, trySetNum} from "@/components/test";

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
      <Button onClick={tryGetNum}>获取</Button>
      <Button onClick={trySetNum}>设置随机值</Button>
    </div>
  );
};

export default Test;
