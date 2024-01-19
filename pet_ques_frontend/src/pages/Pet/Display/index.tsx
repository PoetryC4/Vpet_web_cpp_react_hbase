import {useModel} from '@@/exports';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import {Col, Drawer, Image, List, Popover, Row, Statistic, Typography} from 'antd';
import Title from 'antd/es/typography/Title';
import React, {useEffect, useState} from 'react';
import {
  AppstoreOutlined,
  ClusterOutlined,
  MailOutlined,
  SettingOutlined,
  ShoppingOutlined,
  SwapOutlined
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import {
  petBackLayImgUrl,
  petBackLayStyle,
  petFrontLayImgUrl, petFrontLayStyle,
  petItemLayImgUrl, petItemLayStyle, petMouseDownEvent, petMouseMoveEvent
} from "@/components/Entity/petStateProperty";
import {
  copyToggle,
  danceToggle, liveToggle, playOneToggle, removeObjectToggle, researchToggle,
  shutdown,
  sleepToggle,
  start,
  studyToggle, workCleanToggle
} from "@/components/PetBehaviors/petAnimationHandlers";
import FoodTable from "@/pages/Table/Food";
import DrinkTable from "@/pages/Table/Drink";
import MedicineTable from "@/pages/Table/Medicine";
import PresentTable from "@/pages/Table/Present";
import {petHealth} from "@/components/Entity/petProperty";
import AnimeDebug from "@/pages/Pet/AnimeDebug";
import {TooltipPlacement} from "antd/es/tooltip";

type MenuItem = Required<MenuProps>['items'][number];

const drawerWidth = 450

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};
/* eslint-enable no-template-curly-in-string */
const menuItems: MenuProps['items'] = [
  getItem('总控制栏', 'sub1', <ClusterOutlined/>, [
    getItem('开始', 'sub1-1'),
    getItem('关闭', 'sub1-2'),
    getItem('动画调试', 'sub1-3'),
    getItem('互动', 'sub1-4'),
  ]),

  {type: 'divider'},

  getItem('互动', 'sub2', <SwapOutlined/>, [
    getItem('痛并快乐着', 'sub2-1', null, [
      getItem('学习', 'sub2-1-1'),
      getItem('舞', 'sub2-1-2'),
      getItem('抄', 'sub2-1-3'),
      getItem('科研', 'sub2-1-4'),
      getItem('播', 'sub2-1-5'),
      getItem('清洁', 'sub2-1-6'),
      getItem('除物', 'sub2-1-7'),
    ], 'group'),
    getItem('爽', 'sub2-2', null, [
      getItem('睡', 'sub2-2-1'),
      getItem('玩耍', 'sub2-2-2'),
    ], 'group'),
  ]),

  {type: 'divider'},

  getItem('投喂', 'sub3', <ShoppingOutlined/>, [
    getItem('吃', 'sub3-1'),
    getItem('喝', 'sub3-2'),
    getItem('服药', 'sub3-3'),
    getItem('礼物', 'sub3-4'),
  ]),
];

const petValueDisplayData = [
  {
    title: '健康度',
  },
  {
    title: '钱',
  },
  {
    title: '经验',
  },
  {
    title: '体力',
  },
  {
    title: '心情',
  },
  {
    title: '饱腹度',
  },
  {
    title: '口渴度',
  },
];

const [foodDrawerSwitch, setFoodDrawerSwitch] = useState(false);
const [drinkDrawerSwitch, setDrinkDrawerSwitch] = useState(false);
const [medicineDrawerSwitch, setMedicineDrawerSwitch] = useState(false);
const [presentDrawerSwitch, setPresentDrawerSwitch] = useState(false);
export const [debugDrawerSwitch, setDebugDrawerSwitch] = useState(false);
export const [specialInterDrawerSwitch, setSpecialInterDrawerSwitch] = useState(false);

export const [chatPopoverStyle, setChatPopoverStyle] = useState<React.CSSProperties>({
  display: 'none',
  position: 'absolute'
});

export const [popoverPlacement, setPopoverPlacement] = useState<TooltipPlacement>('topLeft');

export const [chatResonpseDisplay, setChatResonpseDisplay] = useState<{ title: any, content: any }>({
  title: 'title',
  content: 'content'
});

const PetDisplay: React.FC = () => {
  const {initialState, setInitialState} = useModel('@@initialState');
  const [curPresentId, setCurPresentId] = useState<number>(-1);

  if (!initialState) {
    return (<div>加载错误</div>);
  }


  const onClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case 'sub1-1': {
        start();
        break
      }
      case 'sub1-2': {
        shutdown();
        break
      }
      case 'sub1-3': {
        setDebugDrawerSwitch(true);
        break
      }
      case 'sub1-4': {
        setSpecialInterDrawerSwitch(true);
        break
      }
      case 'sub2-1': {
        studyToggle()
        break
      }
      case 'sub2-2': {
        danceToggle()
        break
      }
      case 'sub2-3': {
        sleepToggle()
        break
      }
      case 'sub2-4': {
        copyToggle()
        break
      }
      case 'sub2-5': {
        researchToggle()
        break
      }
      case 'sub2-6': {
        liveToggle()
        break
      }
      case 'sub2-7': {
        playOneToggle()
        break
      }
      case 'sub2-8': {
        workCleanToggle()
        break
      }
      case 'sub2-9': {
        removeObjectToggle()
        break
      }
      case 'sub3-1': {
        setFoodDrawerSwitch(true)
        break
      }
      case 'sub3-2': {
        setDrinkDrawerSwitch(true)
        break
      }
      case 'sub3-3': {
        setMedicineDrawerSwitch(true)
        break
      }
      case 'sub3-4': {
        setPresentDrawerSwitch(true)
        break
      }
      default: {
        console.error("你点了什么???", e)
      }
    }
  };

  return (
    <div id={'petDisplayView'}>
      <Menu
        onClick={onClick}
        style={{width: 256, marginLeft: 40, marginTop: 40, position: 'absolute'}}
        defaultSelectedKeys={['1']}
        mode="inline"
        items={menuItems}
      />
      <Popover placement={popoverPlacement} title={chatResonpseDisplay.title} content={chatResonpseDisplay.content}
               style={chatPopoverStyle}>
        <div></div>
      </Popover>
      <div id={'petMainPart'}>
        <Image
          id={'petBackLay'}
          preview={false}
          width={200}
          src={petBackLayImgUrl}
          style={petBackLayStyle}
          onMouseDown={petMouseDownEvent}
          onMouseMove={petMouseMoveEvent}
        />
        <Image
          id={'petItemLay'}
          preview={false}
          width={200}
          src={petItemLayImgUrl}
          style={petItemLayStyle}
        />
        <Image
          id={'petFrontLay'}
          preview={false}
          width={200}
          src={petFrontLayImgUrl}
          style={petFrontLayStyle}
        />
      </div>
      <List
        bordered
        itemLayout="horizontal"
        dataSource={petValueDisplayData}
        renderItem={(item, index) => (
          <List.Item>
            <Statistic title={item.title} value={petHealth}/>
          </List.Item>
        )}
      />
      <div id={'drawers'} style={{position: 'absolute'}}>
        <Drawer
          width={drawerWidth}
          title="动画调试"
          placement={'right'}
          closable={false}
          onClose={() => {
            setDebugDrawerSwitch(false)
          }}
          open={debugDrawerSwitch}
          key={'animeDebug'}
        >
          <AnimeDebug/>
        </Drawer>
        <Drawer
          width={drawerWidth}
          title="美食商店"
          placement={'left'}
          closable={false}
          onClose={() => {
            setFoodDrawerSwitch(false)
          }}
          open={foodDrawerSwitch}
          key={'food'}
        >
          <FoodTable width={'95%'}/>
        </Drawer>
        <Drawer
          width={drawerWidth}
          title="饮品商店"
          placement={'left'}
          closable={false}
          onClose={() => {
            setDrinkDrawerSwitch(false)
          }}
          open={drinkDrawerSwitch}
          key={'drink'}
        >
          <DrinkTable width={'95%'}/>
        </Drawer>
        <Drawer
          width={drawerWidth}
          title="大药房"
          placement={'left'}
          closable={false}
          onClose={() => {
            setMedicineDrawerSwitch(false)
          }}
          open={medicineDrawerSwitch}
          key={'medicine'}
        >
          <MedicineTable width={'95%'}/>
        </Drawer>
        <Drawer
          width={drawerWidth}
          title="礼物商店"
          placement={'left'}
          closable={false}
          onClose={() => {
            setPresentDrawerSwitch(false)
          }}
          open={presentDrawerSwitch}
          key={'present'}
        >
          <PresentTable width={'95%'}/>
        </Drawer>
      </div>
    </div>
  );
};
export default PetDisplay;
