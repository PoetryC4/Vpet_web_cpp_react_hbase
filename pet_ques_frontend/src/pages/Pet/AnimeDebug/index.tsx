import {history} from '@umijs/max';
import {Button, Col, message, Radio, RadioChangeEvent, Result, Row, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import * as animationFunctions from '../../../components/PetBehaviors/petAnimationDebugs'
import {getDrinkByIdUsingGet} from "@/services/pet_ques/drinkController";
import {BugOutlined, PoweroffOutlined} from "@ant-design/icons";
import {setDurDebug} from "@/components/Entity/petStateProperty";
import {setDebugDrawerSwitch} from "@/pages/Pet/Display";

const AnimeDebug: React.FC = () => {
  const [stateSelected, setStateSelected] = useState(1);
  const [functionSelected, setFunctionSelected] = useState('');
  const [functionOptions, setFunctionOptions] = useState<{ label: string; value: any; }[]>([]);
  const stateOptions = [
    'Happy',
    'Normal',
    'Ill',
    'PoorCondition'
  ]

  useEffect(() => {
    let animationOptionsTmp = []
    let idx = 0
    for (const functionName in animationFunctions) {
      animationOptionsTmp.push({
        label: functionName,
        value: idx
      })
      idx++
    }
    setFunctionOptions(animationOptionsTmp)
    // 如果有清理逻辑，可以在返回的函数中处理
    return () => {
      // 清理逻辑
    };
  }, []); // 空的依赖项数组确保该效果只在组件挂载时执行一次


  const onStateChange = (e: RadioChangeEvent) => {
    setStateSelected(e.target.value);
  };

  const onFunctionChange = (value: string) => {
    setFunctionSelected(value)
  };

  const beginAnimationDebug = async () => {
    if (typeof animationFunctions[functionOptions[functionSelected].label] === 'function') {
      setDebugDrawerSwitch(false)
      setDurDebug(true)
      await animationFunctions[functionOptions[functionSelected].label](stateOptions[stateSelected])
      setDurDebug(false)
    }
  }

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <div>
      <Row>
        <Col span={24}>
          <Radio.Group onChange={onStateChange} value={stateSelected}>
            <Radio value={0}>Happy</Radio>
            <Radio value={1}>Normal</Radio>
            <Radio value={2}>Ill</Radio>
            <Radio value={3}>PoorCondition</Radio>
          </Radio.Group></Col>
        <Col span={24}>
          <Select
            showSearch
            placeholder="选择要调试的动画"
            optionFilterProp="children"
            onChange={onFunctionChange}
            filterOption={filterOption}
            options={functionOptions}
          />
        </Col>
        <Col span={24}>
          <Button
            type="primary"
            icon={<BugOutlined />}
            onClick={beginAnimationDebug}
          >
            开始调试
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default AnimeDebug;
