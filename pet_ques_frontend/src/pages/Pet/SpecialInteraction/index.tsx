import {Button, Col, Divider, Input, InputNumber, message, Radio, RadioChangeEvent, Result, Row, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import {imgSize, petLeftMargin, petTopMargin, setDurDebug} from "@/components/Entity/petStateProperty";
import {SendOutline} from "antd-mobile-icons";
import {
  chatPopoverStyle,
  setChatPopoverStyle,
  setChatResonpseDisplay, setPopoverPlacement,
  setSpecialInterDrawerSwitch
} from "@/pages/Pet/Display";
import {petMove} from "@/components/PetBehaviors/petAnimationHandlers";
import {sleep} from "@antfu/utils";
import {chatWithLlmUsingPost} from "@/services/pet_ques/InteractionController";
import {TooltipPlacement} from "antd/es/tooltip";
import {getQuadrantOfEight} from "@/components/Utils/utils";

const {Search} = Input;

const chatResultDetainUnit = 300
const chatResultDetainBase = 3000

const chatPopoverTopShift = -80

const quadrantNamesReverse: TooltipPlacement[] = [
  'rightTop',
  'topRight',
  'topLeft',
  'leftTop',
  'leftBottom',
  'bottomLeft',
  'bottomRight',
  'rightBottom'
]

const AnimeDebug: React.FC = () => {
  const [customTargetX, setCustomTargetX] = useState(0);
  const [customTargetY, setCustomTargetY] = useState(0);
  const [chatPrompt, setChatPrompt] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const beginManualMove = async () => {
    setSpecialInterDrawerSwitch(false)
    petMove(customTargetX, customTargetY)
  }

  let chatHistory: API.ChatHistory[]

  const beginChat = async () => {
    if (isChatLoading) {
      return
    }
    setIsChatLoading(true)
    // TODO 流式应答
    try {
      setSpecialInterDrawerSwitch(false)
      const curQuery = chatPrompt
      const res = await chatWithLlmUsingPost({
        query: curQuery,
        history: chatHistory
      })

      // 根据当前坐标设置气泡卡片出现方向
      setPopoverPlacement(quadrantNamesReverse[getQuadrantOfEight(petLeftMargin + imgSize / 2, petTopMargin + imgSize / 2) - 1])

      setChatPopoverStyle({
        ...chatPopoverStyle,
        marginLeft: petLeftMargin,
        marginTop: petTopMargin + chatPopoverTopShift,
        display: 'block'
      })

      setChatResonpseDisplay({
        title: curQuery,
        content: res
      })

      chatHistory.push({
        role: 'user',
        content: curQuery
      })
      chatHistory.push({
        role: 'assistant',
        content: res
      })

      await sleep(res.length * chatResultDetainUnit + chatResultDetainBase)

      setChatPopoverStyle({
        ...chatPopoverStyle,
        marginLeft: petLeftMargin,
        marginTop: petTopMargin,
        display: 'none'
      })

    } catch (e) {
      message.error("错误" + e)
    }
  }

  return (
    <div>
      <Row>
        <Col span={12}>
          <InputNumber value={customTargetX} placeholder={'请填入目标X值'} onChange={(value: number | null) => {
            setCustomTargetX(value || 0)
          }}/>
        </Col>
        <Col span={12}>
          <InputNumber value={customTargetY} placeholder={'请填入目标Y值'} onChange={(value: number | null) => {
            setCustomTargetY(value || 0)
          }}/></Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button
            type="primary"
            icon={<SendOutline/>}
            onClick={beginManualMove}
          >
            开始调试
          </Button>
        </Col>
      </Row>
      <Divider/>
      <Row>
        <Col span={24}>
          <Search
            placeholder="输入你想说的话"
            onSearch={beginChat}
            enterButton={<SendOutline/>}
            loading={isChatLoading}
            value={chatPrompt}
            onChange={(e) => {
              setChatPrompt(e.target.value)
            }}/>
        </Col>
      </Row>
    </div>
  );
};

export default AnimeDebug;
