import {useModel} from '@umijs/max';
import {theme, Typography} from 'antd';
import React, {useEffect, useState} from 'react';
import {getAllDrinkUsingGet} from "@/services/pet_ques/drinkController";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/skeleton/Paragraph";

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */

const Test: React.FC = () => {
  const {token} = theme.useToken();
  const {initialState} = useModel('@@initialState');
  const [flag, setFlag] = useState(false);
  const [drinkData, setDrinkData] = useState([]);

  const getInfo = async () => {
    const res = await getAllDrinkUsingGet();
    console.log(res);
    if (res != null) {
      setFlag(true);
      setDrinkData(res);
    }
  }


  useEffect(() => {
    getInfo();
  }, [flag]);
  return (
    <div>
      {drinkData.map((drink, index) => (
        <div key={index}>
          <h2>{drink.drinkName}</h2>
          <p>Price: {drink.drinkPrice}</p>
          {/* Add other properties as needed */}
        </div>
      ))}
    </div>
  );
};

export default Test;
