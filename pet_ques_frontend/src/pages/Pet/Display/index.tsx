import useState from 'react-usestateref'
import type {MenuProps} from 'antd';
import {
  Button,
  Col,
  Divider,
  Drawer,
  Image,
  Input,
  InputNumber,
  List,
  Menu,
  message,
  Popover,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Statistic
} from 'antd';
import React, {useEffect} from 'react';
import {BugOutlined, ClusterOutlined, ShoppingOutlined, SwapOutlined} from '@ant-design/icons';
import {
  boringAnimation,
  copyToggle,
  danceToggle,
  hungryAnimation,
  illAnimation,
  liveToggle,
  petMove,
  playOneToggle,
  recoverAnimation,
  removeObjectToggle,
  researchToggle,
  sleepToggle,
  studyToggle,
  thirstyAnimation,
  tryBoring,
  tryHungry,
  tryIll,
  tryRecover,
  tryThirsty,
  workCleanToggle
} from "@/components/PetBehaviors/petAnimationHandlers";
import FoodTable from "@/pages/Table/Food";
import DrinkTable from "@/pages/Table/Drink";
import MedicineTable from "@/pages/Table/Medicine";
import PresentTable from "@/pages/Table/Present";
import {TooltipPlacement} from "antd/es/tooltip";
import {
  boringAnimationFlag,
  durDebug,
  durSpeak,
  durSwitch,
  enableRandMov,
  hungryAnimationFlag,
  illAnimationFlag,
  imgSize,
  isDragged,
  isLaunched,
  petLeftGap,
  petLeftMargin,
  petTopGap,
  petTopMargin,
  preLaunched,
  recoverAnimationFlag,
  setBoringAnimationFlag,
  setDurDebug,
  setDurShutdown,
  setDurSwitch,
  setHungryAnimationFlag,
  setIllAnimationFlag,
  setIsDragged,
  setIsLaunched,
  setPetLeftGap,
  setPetLeftMargin,
  setPetTopGap,
  setPetTopMargin,
  setPreLaunched,
  setRecoverAnimationFlag,
  setThirstyAnimationFlag,
  thirstyAnimationFlag
} from "@/components/Entity/petStateProperty";
import * as animationFunctions from "@/components/PetBehaviors/petAnimationDebugs";
import {getCurTime, randomInt} from "@/components/Utils/utils";
import {sleep} from "@antfu/utils";
import {SendOutline} from "antd-mobile-icons";
import {
  curAnimation,
  curState,
  petWorkPerformance, preClickAnimation,
  setCurAnimation,
  setCurState,
  setPetWorkPerformance, setPreClickAnimation
} from "@/components/Entity/petProperty";
import {petAnimation, petAnimation3layers} from "@/components/PetBehaviors/petAnimationUtils";
import {
  animationGap, awaitSpecialInterNames,
  interactionNames,
  listenerGap,
  petValueChange,
  specialInteractionNames
} from "@/components/Entity/petConstants";
import {useModel} from "@umijs/max";

type MenuItem = Required<MenuProps>['items'][number];

const drawerWidth = 450
let myTimer = {
  value: null
}

// TODO 糟糕的做法
export const hooksToBeExported = {
  trySetPetFrontLayStyle: (value: React.CSSProperties) => {
    console.log(1)
  },
  tryGetPetFrontLayStyle: () => {
    return {} as React.CSSProperties
  },
  trySetPetItemLayStyle: (value: React.CSSProperties) => {
    console.log(1)
  },
  tryGetPetItemLayStyle: () => {
    return {} as React.CSSProperties
  },
  trySetPetBackLayStyle: (value: React.CSSProperties) => {
    console.log(1)
  },
  tryGetPetBackLayStyle: () => {
    return {} as React.CSSProperties
  },
  tryGetPetBackLayImgUrl: () => {
    return ''
  },
  trySetPetBackLayImgUrl: (value: string) => {
    console.log('string')
  },
  tryGetPetItemLayImgUrl: () => {
    return ''
  },
  trySetPetItemLayImgUrl: (value: string) => {
    console.log('string')
  },
  tryGetPetFrontLayImgUrl: () => {
    return ''
  },
  trySetPetFrontLayImgUrl: (value: string) => {
    console.log('string')
  },
}

const {Search} = Input;

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

const PetDisplay: React.FC = () => {
  const {initialState, setInitialState} = useModel('@@initialState');

  const [customTargetX, setCustomTargetX, refCustomTargetX] = useState(0);
  const [customTargetY, setCustomTargetY, refCustomTargetY] = useState(0);
  const [chatPrompt, setChatPrompt, refChatPrompt] = useState('');
  const [isChatLoading, setIsChatLoading, refIsChatLoading] = useState(false);

  const [foodDrawerSwitch, setFoodDrawerSwitch] = useState(false);
  const [drinkDrawerSwitch, setDrinkDrawerSwitch] = useState(false);
  const [medicineDrawerSwitch, setMedicineDrawerSwitch] = useState(false);
  const [presentDrawerSwitch, setPresentDrawerSwitch] = useState(false);
  const [debugDrawerSwitch, setDebugDrawerSwitch] = useState(false);
  const [specialInterDrawerSwitch, setSpecialInterDrawerSwitch] = useState(false);

  const [chatPopoverStyle, setChatPopoverStyle, refChatPopoverStyle] = useState<React.CSSProperties>({
    display: 'none',
    position: 'absolute'
  });

  const [popoverSwitch, setPopoverSwitch, refPopoverSwitch] = useState(false);

  const [popoverPlacement, setPopoverPlacement, refPopoverPlacement] = useState<TooltipPlacement>('topLeft');

  const [chatResponseDisplay, setChatResponseDisplay, refChatResponseDisplay] = useState<{
    title: any,
    content: any
  }>({
    title: 'title',
    content: 'content'
  })


  const [petBackLayImgUrl, setPetBackLayImgUrl, refPetBackLayImgUrl] = useState("string");
  const [petItemLayImgUrl, setPetItemLayImgUrl, refPetItemLayImgUrl] = useState("string");
  const [petFrontLayImgUrl, setPetFrontLayImgUrl, refPetFrontLayImgUrl] = useState("string");

  const [petBackLayStyle, setPetBackLayStyle, refPetBackLayStyle] = useState<React.CSSProperties>({
    position: 'absolute', display: 'none', width: 400 + 'px', height: 400 + 'px', marginTop: petTopMargin.value + 'px'
  });
  const [petItemLayStyle, setPetItemLayStyle, refPetItemLayStyle] = useState<React.CSSProperties>({
    position: 'absolute', display: 'none', width: 400 + 'px', height: 400 + 'px'
  });
  const [petFrontLayStyle, setPetFrontLayStyle, refPetFrontLayStyle] = useState<React.CSSProperties>({
    position: 'absolute', display: 'none', width: 400 + 'px', height: 400 + 'px'
  });

  // const [petMouseDownEvent, setPetMouseDownEvent] = useState<MouseEventHandler<HTMLImageElement>>();
  // const [petMouseMoveEvent, setPetMouseMoveEvent] = useState<MouseEventHandler<HTMLImageElement>>();

  const [petMoney, setPetMoney, refPetMoney] = useState(100)
  const [petExp, setPetExp, refPetExp] = useState<number>(10.0);
  const [petEndu, setPetEndu, refPetEndu] = useState<number>(50.0);
  const [petMood, setPetMood, refPetMood] = useState<number>(50.0);
  const [petHunger, setPetHunger, refPetHunger] = useState<number>(50.0);
  const [petThirsty, setPetThirsty, refPetThirsty] = useState<number>(50.0);
  const [petHealth, setPetHealth, refPetHealth] = useState<number>(100.0);
  const [workPerformance, setWorkPerformance, refWorkPerformance] = useState(1)

  const [stateSelected, setStateSelected] = useState(0);
  const [functionSelected, setFunctionSelected] = useState(0);
  const [functionOptions, setFunctionOptions] = useState<{
    label: string;
    value: any;
  }[]>([]);
  const [loadPerc, setLoadPerc] = useState("0%");
  const [preLaunchViewStyle, setPreLaunchViewStyle] = useState<React.CSSProperties>({
    display: "block",
    height: '100%',
    width: '100%'
  });
  const [petMainViewStyle, setPetMainViewStyle] = useState<React.CSSProperties>({display: "none"});

  if (!initialState) {
    return (<div>加载错误</div>);
  }

  hooksToBeExported.tryGetPetBackLayStyle = () => {
    return petBackLayStyle
  }
  hooksToBeExported.trySetPetBackLayStyle = (value: React.CSSProperties) => {
    setPetBackLayStyle(value)
  }
  hooksToBeExported.tryGetPetItemLayStyle = () => {
    return petItemLayStyle
  }
  hooksToBeExported.trySetPetItemLayStyle = (value: React.CSSProperties) => {
    setPetItemLayStyle(value)
  }
  hooksToBeExported.tryGetPetFrontLayStyle = () => {
    return petFrontLayStyle
  }
  hooksToBeExported.trySetPetFrontLayStyle = (value: React.CSSProperties) => {
    setPetFrontLayStyle(value)
  }
  hooksToBeExported.tryGetPetBackLayImgUrl = () => {
    return petBackLayImgUrl
  }
  hooksToBeExported.trySetPetBackLayImgUrl = (value: string) => {
    setPetBackLayImgUrl(value)
  }
  hooksToBeExported.tryGetPetItemLayImgUrl = () => {
    return petItemLayImgUrl
  }
  hooksToBeExported.trySetPetItemLayImgUrl = (value: string) => {
    setPetItemLayImgUrl(value)
  }
  hooksToBeExported.tryGetPetFrontLayImgUrl = () => {
    return petFrontLayImgUrl
  }
  hooksToBeExported.trySetPetFrontLayImgUrl = (value: string) => {
    setPetFrontLayImgUrl(value)
  }

  async function petDragMove(event) {
    if (!isLaunched.value || !isDragged.value || curAnimation.value === "Falling") return

    let nativeEvent = event.nativeEvent
    const mouseX = nativeEvent.clientX
    const mouseY = nativeEvent.clientY
    if (mouseX === undefined || mouseY === undefined) return
    const scrollX = window.scrollX
    const scrollY = window.scrollY

    let newPetLeftMargin = mouseX + scrollX - petLeftGap.value
    let newPetTopMargin = mouseY + scrollY - petTopGap.value
    setPetLeftMargin(newPetLeftMargin)
    setPetTopMargin(newPetTopMargin)

    setPetBackLayStyle({...petBackLayStyle, marginLeft: newPetLeftMargin + 'px', marginTop: newPetTopMargin + 'px'})
  }

  async function petClickedUp(event: MouseEvent) {

    // setPetMouseMoveEvent(undefined)

    if (myTimer.value != null) {
      clearInterval(myTimer.value);
      myTimer.value = null
    } else {
      setTimeout(() => {
        if (myTimer.value != null) {
          clearInterval(myTimer.value);
          myTimer.value = null
        }
      }, 200)
    }

    const mouseX = event.clientX
    const mouseY = event.clientY

    if (!isDragged.value || curAnimation.value !== 'Raise') {
      const mousePerX = (mouseX - petLeftMargin.value) / imgSize.value
      const mousePerY = (mouseY - petTopMargin.value) / imgSize.value

      if (mousePerX >= 0.3 && mousePerX <= 0.7 && mousePerY <= 0.3 && mousePerY >= 0.1) {
        console.log('Head')
        // 解决莫名丢失点击之前的curAnimation值
        const preClickAnimation = curAnimation.value
        setCurAnimation("Touch_Head")
        setPetMood(petMood + 2)
        setPetEndu(petEndu - 4)
        switch (curState.value) {
          case 'Ill':
          case 'PoorCondition': {
            await petAnimation('vup/' + curAnimation.value + '/A_Ill', false)
            await petAnimation('vup/' + curAnimation.value + '/B_Ill', false)
            await petAnimation('vup/' + curAnimation.value + '/C_Ill', false)
            break
          }
          default: {
            await petAnimation('vup/' + curAnimation.value + '/A_' + curState.value, false)
            await petAnimation('vup/' + curAnimation.value + '/B_' + curState.value, false)
            await petAnimation('vup/' + curAnimation.value + '/C_' + curState.value, false)
            break
          }
        }
        setCurAnimation(preClickAnimation)
      } else if (mousePerX >= 0.15 && mousePerX <= 0.85 && mousePerY >= 0.25 && mousePerY <= 0.95) {
        console.log('Body')
        const preClickAnimation = curAnimation.value
        setCurAnimation("Touch_Body")
        setPetMood(petMood + 2)
        setPetEndu(petEndu - 4)
        switch (curState.value) {
          case 'Ill':
          case 'PoorCondition': {
            await petAnimation('vup/' + curAnimation.value + '/A_Ill', false)
            await petAnimation('vup/' + curAnimation.value + '/B_Ill', false)
            await petAnimation('vup/' + curAnimation.value + '/C_Ill', false)
            break
          }
          default: {
            let rand = randomInt(1, 3)
            await petAnimation('vup/' + curAnimation.value + '/A_Happy/tb' + rand, false)
            await petAnimation('vup/' + curAnimation.value + '/B_Happy/tb' + rand, false)
            await petAnimation('vup/' + curAnimation.value + '/C_Happy/tb' + rand, false)
            break
          }
        }
        setCurAnimation(preClickAnimation)
      }
    }
    if (curAnimation.value !== 'Raise' && !isDragged.value) return
    setCurAnimation("Falling")
    await petAnimation('vup/Raise/Raised_Static/C_' + curState.value, false)
    setIsDragged(false)
    setCurAnimation(preClickAnimation.value)
  }

  async function petClickedDown(event) {
    if (!isLaunched.value || durSwitch.value) return

    //setInterval会每100毫秒执行一次，也就是每100毫秒获取一次时间
    if (curAnimation.value !== 'Raise' && curAnimation.value !== 'Falling') {
      let nativeEvent = event.nativeEvent
      const mouseX = nativeEvent.clientX
      const mouseY = nativeEvent.clientY
      //获取鼠标按下时的时间
      let timeStart = getCurTime();
      myTimer.value = setInterval(async function () {
        let timeEnd = getCurTime();

        //如果此时检测到的时间与第一次获取的时间差有1000毫秒
        if (timeEnd - timeStart > 1000) {
          setIsDragged(true)
          //便不再继续重复此函数 （clearInterval取消周期性执行）
          clearInterval(myTimer.value);
          myTimer.value = null
          setPreClickAnimation(curAnimation.value)
          setCurAnimation('Raise')
          setPetTopGap(mouseY - petTopMargin.value)
          setPetLeftGap(mouseX - petLeftMargin.value)
          // setPetMouseMoveEvent(petDragMove)
          await petAnimation('vup/' + curAnimation.value + '/Raised_Static/A_' + curState.value, false)
          while (curAnimation.value === 'Raise') {
            if (curState.value !== 'Normal') {
              await petAnimation('vup/' + curAnimation.value + '/Raised_Dynamic/' + curState.value, false)
            } else {
              await petAnimation('vup/' + curAnimation.value + '/Raised_Dynamic/Normal/' + randomInt(1, 3), false)
            }
          }
          return
        }
      }, 100);
    }
  }

  async function buyDrink(drinkInfo: API.Drink) {
    if (!isLaunched.value || !drinkInfo.drink_price || petMoney < drinkInfo.drink_price || durSwitch.value) return
    setDurSwitch(true)
    await petAnimation3layers('vup/Drink/' + curState.value, '/drink/' + drinkInfo.drink_pic_path, curState.value === 'Ill' ? 4 : 9, curState.value === 'Ill' ? 1 : 0, false)
    setPetMoney(refPetMoney.current - drinkInfo.drink_price)
    setPetEndu(refPetEndu.current + (drinkInfo.drink_endu || 0))
    setPetExp(refPetExp.current + (drinkInfo.drink_exp || 0))
    setPetHunger(refPetHunger.current + (drinkInfo.drink_hunger || 0))
    setPetThirsty(refPetThirsty.current + (drinkInfo.drink_thirsty || 0))
    setPetMood(refPetMood.current + (drinkInfo.drink_mood || 0))
    setPetHealth(refPetHealth.current + (drinkInfo.drink_health || 0))

    setDurSwitch(false)
  }

  async function buyFood(foodInfo: API.Food) {
    if (!isLaunched.value || !foodInfo.food_price || petMoney < foodInfo.food_price || durSwitch.value) return
    setDurSwitch(true)
    switch (curState.value) {
      case 'Ill' : {
        await petAnimation3layers('vup/Eat/Ill', '/food/' + foodInfo.food_pic_path, 5, 2, false)
        break
      }
      default: {
        if (Math.random() < 1 / 2) {
          await petAnimation3layers('vup/Eat/Normal_1', '/food/' + foodInfo.food_pic_path, 4, 3, false)
        } else {
          await petAnimation3layers('vup/Eat/Normal_2', '/food/' + foodInfo.food_pic_path, 4, 4, false)
        }
        break
      }
    }
    setPetMoney(refPetMoney.current - foodInfo.food_price)
    setPetEndu(refPetEndu.current + (foodInfo.food_endu || 0))
    setPetExp(refPetExp.current + (foodInfo.food_exp || 0))
    setPetHunger(refPetHunger.current + (foodInfo.food_hunger || 0))
    setPetThirsty(refPetThirsty.current + (foodInfo.food_thirsty || 0))
    setPetMood(refPetMood.current + (foodInfo.food_mood || 0))
    setPetHealth(refPetHealth.current + (foodInfo.food_health || 0))

    setDurSwitch(false)
  }

  async function buyMedicine(medicineInfo: API.Medicine) {
    if (!isLaunched.value || curState.value !== 'Ill' || !medicineInfo.medicine_price || petMoney < medicineInfo.medicine_price || durSwitch.value) return
    setDurSwitch(true)
    switch (curState.value) {
      case 'Ill' : {
        await petAnimation3layers('vup/Eat/Ill', '/medicine/' + medicineInfo.medicine_pic_path, 5, 2, false)
        break
      }
      default: {
        if (Math.random() < 1 / 2) {
          await petAnimation3layers('vup/Eat/Normal_1', '/medicine/' + medicineInfo.medicine_pic_path, 4, 3, false)
        } else {
          await petAnimation3layers('vup/Eat/Normal_2', '/medicine/' + medicineInfo.medicine_pic_path, 4, 4, false)
        }
        break
      }
    }

    setPetMoney(refPetMoney.current - medicineInfo.medicine_price)
    setPetEndu(refPetEndu.current + (medicineInfo.medicine_endu || 0))
    setPetExp(refPetExp.current + (medicineInfo.medicine_exp || 0))
    setPetMood(refPetMood.current + (medicineInfo.medicine_mood || 0))
    setPetHealth(refPetHealth.current + (medicineInfo.medicine_health || 0))

    setDurSwitch(false)
  }

  async function buyPresent(presentInfo: API.Present) {
    if (!isLaunched.value || !presentInfo.present_price || petMoney < presentInfo.present_price || durSwitch.value) return
    setDurSwitch(true)
    let startIndex = -1
    let transformIndex = -1
    switch (curState.value) {
      case 'Ill': {
        startIndex = 11
        transformIndex = 6
        break
      }
      case 'Happy': {
        startIndex = 4
        transformIndex = 5
        break
      }
      case 'PoorCondition': {
        startIndex = 4
        transformIndex = 8
        break
      }
      case 'Normal': {
        startIndex = 4
        transformIndex = 7
        break
      }
      default: {
        break
      }
    }
    await petAnimation3layers('vup/Gift/' + curState.value, '/present/' + presentInfo.present_pic_path, startIndex, transformIndex, false)

    setPetMoney(refPetMoney.current - presentInfo.present_price)
    setPetExp(refPetExp.current + (presentInfo.present_exp || 0))
    setPetMood(refPetMood.current + (presentInfo.present_mood || 0))
    setPetWorkPerformance(petWorkPerformance.value + (presentInfo.present_performance || 0))

    setDurSwitch(false)
  }

  async function chatSpeak() {
    setDurSwitch(true)
    let curTimeLine = 0
    switch (curState.value) {
      case 'Ill':
      case 'PoorCondition': {
        await petAnimation('vup/Say/Serious/A', false)
        while (durSpeak.value) {
          await petAnimation('vup/Say/Serious/B', false)
        }
        await petAnimation('vup/Say/Serious/C', false)
        break
      }
      case 'Happy': {
        await petAnimation('vup/Say/Shining/A', false)
        let rand = 1
        while (durSpeak.value) {
          rand = randomInt(1, 3)
          await petAnimation('vup/Say/Shining/B_' + rand, false)
        }
        await petAnimation('vup/Say/Shining/C', false)
        break
      }
      default: {
        await petAnimation('vup/Say/Self/A', false)
        let rand = 1
        while (durSpeak.value) {
          rand = randomInt(1, 3)
          await petAnimation('vup/Say/Self/B_' + rand, false)
        }
        await petAnimation('vup/Say/Self/C', false)
        break
      }
    }
    setDurSwitch(false)
  }

  async function petListener() {

    if (interactionNames.includes(curAnimation.value)) {
      setPetHunger(refPetHunger.current + (petValueChange[curAnimation.value].hungerChange || 0))
      setPetThirsty(refPetThirsty.current + (petValueChange[curAnimation.value].thirstyChange || 0))
      setPetExp(refPetExp.current + (petValueChange[curAnimation.value].expChange || 0))
      setPetEndu(refPetEndu.current + (petValueChange[curAnimation.value].enduranceChange || 0))
      setPetMood(refPetMood.current + (petValueChange[curAnimation.value].moodChange || 0))
      setPetHealth(refPetHealth.current + (petValueChange[curAnimation.value].healthChange || 0))
      setPetMoney(refPetMoney.current + (petValueChange[curAnimation.value].moneyChange ? (petValueChange[curAnimation.value].moneyChange(petExp, petWorkPerformance.value)) : 0))
      return
    }
    setPetHunger(refPetHunger.current + (petValueChange['Default'].hungerChange || 0))
    setPetThirsty(refPetThirsty.current + (petValueChange['Default'].thirstyChange || 0))
    setPetEndu(refPetEndu.current + (petValueChange['Default'].enduranceChange || 0))
    setPetMood(refPetMood.current + (petValueChange['Default'].moodChange || 0))
    if (durSwitch.value) return

    if (curState.value === 'Ill') {
      if (refPetHealth.current >= 60) {
        tryRecover(10 - Math.floor(petHealth / 10))
      }
    } else if (refPetHealth.current <= 60) {
      setCurState('PoorCondition')
      if (refPetHealth.current <= 40) {
        tryIll(6)
      }
    } else if (refPetMood.current >= 75) {
      setCurState('Happy')
    } else {
      setCurState('Normal')
    }

    if (refPetHunger.current <= 30) {
      tryHungry(5)
    } else if (refPetHunger.current <= 30) {
      tryThirsty(6)
    } else if (curState.value !== 'Ill') {
      tryBoring(8)
    }
  }

  async function defaultAnimation() {
    while (isLaunched.value) {
      for (; durSwitch.value || specialInteractionNames.includes(curAnimation.value) || interactionNames.includes(curAnimation.value) || durDebug.value;) {
        await sleep(animationGap)
      }
      switch (curState.value) {
        case 'Normal': {
          await petAnimation('vup/Default/Normal', false)
          break
        }
        case 'Ill': {
          await petAnimation('vup/Default/Ill/' + randomInt(1, 3), false)
          break
        }
        case 'Happy': {
          await petAnimation('vup/Default/Happy/' + Math.round(0.5 + Math.random() * 3), false)
          break
        }
        case 'PoorCondition': {
          await petAnimation('vup/Default/PoorCondition/' + Math.round(0.5 + Math.random() * 4), false)
          break
        }
      }
    }
  }

  async function start() {
    if (!preLaunched.value || isLaunched.value) return

    setIsLaunched(true)
    setPetBackLayStyle({...petBackLayStyle, display: 'block'})

    let storage = window.localStorage;
    // storage.clear();
    if (storage.vPetMoney) setPetMoney(Number.parseFloat(storage.vPetMoney))
    if (storage.vPetExp) setPetExp(Number.parseFloat(storage.vPetExp))
    if (storage.vPetEndu) setPetEndu(Number.parseFloat(storage.vPetEndu))
    if (storage.vPetMood) setPetMood(Number.parseFloat(storage.vPetMood))
    if (storage.vPetHunger) setPetHunger(Number.parseFloat(storage.vPetHunger))
    if (storage.vPetThirsty) setPetThirsty(Number.parseFloat(storage.vPetThirsty))
    if (storage.vPetHealth) setPetHealth(Number.parseFloat(storage.vPetHealth))
    if (storage.vPetWorkPerformance) setPetWorkPerformance(Number.parseFloat(storage.vPetWorkPerformance))
    if (storage.vPetState) setCurState(storage.vPetState)

    //curState.value = 'Ill'

    // setPetMouseDownEvent(petClickedDown)
    window.addEventListener("mouseup", petClickedUp);

    switch (curState.value) {
      case 'Normal': {
        await petAnimation('vup/StartUP/Normal', false)
        break
      }
      case 'Ill': {
        await petAnimation('vup/StartUP/Ill', false)
        break
      }
      case 'Happy': {
        await petAnimation('vup/StartUP/Happy/' + randomInt(1, 3), false)
        break
      }
      case 'PoorCondition': {
        await petAnimation('vup/StartUP/PoorCondition', false)
        break
      }
      default: {
        setCurState('Normal')
        break
      }
    }

    defaultAnimation()

    while (isLaunched.value) {
      await awaitSpecialInterNames()
      if (durDebug.value) {
        await sleep(listenerGap)
        continue
      }
      if (interactionNames.includes(curAnimation.value)) {
        petListener()
        await sleep(listenerGap)
        continue
      }
      if (recoverAnimationFlag.value) {
        await recoverAnimation()
        setRecoverAnimationFlag(false)
      }
      if (illAnimationFlag.value) {
        await illAnimation()
        setIllAnimationFlag(false)
      }
      if (hungryAnimationFlag.value) {
        await hungryAnimation()
        setHungryAnimationFlag(false)
      }
      if (thirstyAnimationFlag.value) {
        await thirstyAnimation()
        setThirstyAnimationFlag(false)
      }
      if (boringAnimationFlag.value) {
        await boringAnimation()
        setBoringAnimationFlag(false)
      }
      if (enableRandMov.value && curState.value !== 'Ill' && !durSwitch.value) {
        if (Math.random() * 100 < 2) {
          let targetX = window.innerHeight * (Math.random() * 0.8 + 0.1)
          let targetY = window.innerHeight * (Math.random() * 0.8 + 0.1)

          await petMove(targetX, targetY)
        }
      }
      petListener()
      await sleep(listenerGap)
    }
  }

  async function shutdown() {
    if (!isLaunched.value) {
      return
    }
    setIsLaunched(false)

    let storage = window.localStorage;
    storage.vPetMoney = petMoney
    storage.vPetExp = petExp
    storage.vPetEndu = petEndu
    storage.vPetMood = petMood
    storage.vPetHunger = petHunger
    storage.vPetThirsty = petThirsty
    storage.vPetHealth = petHealth
    storage.vPetWorkPerformance = petWorkPerformance.value
    storage.vPetState = curState.value

    //setPetMouseDownEvent(undefined)
    window.removeEventListener("mouseup", petClickedUp);

    setDurShutdown(true)
    switch (curState.value) {
      case 'Normal': {
        await petAnimation('vup/Shutdown/Normal/' + randomInt(1, 3), false)
        break
      }
      case 'Ill': {
        await petAnimation('vup/Shutdown/Ill', false)
        break
      }
      case 'Happy': {
        await petAnimation('vup/Shutdown/Happy', false)
        break
      }
      case 'PoorCondition': {
        await petAnimation('vup/Shutdown/PoorCondition', false)
        break
      }
      default: {
        setCurState('Normal')
        console.error("curState Not Found:", curState)
        break
      }
    }
    setDurShutdown(false)
    setPetBackLayStyle({...petBackLayStyle, display: 'none'})
  }

  const stateOptions = [
    'Happy',
    'Normal',
    'Ill',
    'PoorCondition'
  ]

  const petValueDisplayData = [
    {
      title: '健康度',
      value: petHealth.toFixed(2)
    },
    {
      title: '钱',
      value: petMoney.toFixed(2) + '￥'
    },
    {
      title: '经验',
      value: petExp.toFixed(2)
    },
    {
      title: '体力',
      value: petEndu.toFixed(2)
    },
    {
      title: '心情',
      value: petMood.toFixed(2)
    },
    {
      title: '饱腹度',
      value: petHunger.toFixed(2)
    },
    {
      title: '口渴度',
      value: petThirsty.toFixed(2)
    },
  ];

  const onDebugStateChange = (e: RadioChangeEvent) => {
    setStateSelected(e.target.value);
  };

  const onDebugFunctionChange = (value: number) => {
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

  const debugFuncFilterOption = (input: string, option?: {
    label: string;
    value: string
  }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


  const beginManualMove = async () => {
    setSpecialInterDrawerSwitch(false)
    petMove(customTargetX, customTargetY)
  }

  const beginChat = async () => {
    message.error("纯前端废弃")
  }

  const onMenuClick: MenuProps['onClick'] = (e) => {
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
      case 'sub2-1-1': {
        studyToggle()
        break
      }
      case 'sub2-1-2': {
        danceToggle()
        break
      }
      case 'sub2-2-1': {
        sleepToggle()
        break
      }
      case 'sub2-1-3': {
        copyToggle()
        break
      }
      case 'sub2-1-4': {
        researchToggle()
        break
      }
      case 'sub2-1-5': {
        liveToggle()
        break
      }
      case 'sub2-2-2': {
        playOneToggle()
        break
      }
      case 'sub2-1-6': {
        workCleanToggle()
        break
      }
      case 'sub2-1-7': {
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
  useEffect(() => {
    setPreLaunched(true)
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
    setPreLaunchViewStyle({...preLaunchViewStyle, display: "none"})
    setPetMainViewStyle({display: "block"})
  }, []);
  return (
    <div id={'petDisplayView'}>
      <div style={preLaunchViewStyle}>
        <div
          style={{
            height: '100%',
            width: '100%',
            inset: 0,
            margin: "auto auto auto auto",
            position: "absolute"
          }}>{loadPerc}</div>
      </div>
      <div style={petMainViewStyle}>
        <Menu
          onClick={onMenuClick}
          style={{
            position: 'absolute', width: 256, inset: 0, margin: '6% auto auto 2%'
          }}
          defaultSelectedKeys={['1']}
          mode="inline"
          items={menuItems}
        />
        <Popover placement={popoverPlacement} title={chatResponseDisplay.title}
                 content={chatResponseDisplay.content}
                 open={popoverSwitch}
                 onOpenChange={(newOpen: boolean) => {
                   setPopoverSwitch(newOpen);
                 }}>
          <div style={chatPopoverStyle}>
          </div>
        </Popover>
        <div id={'petMainPart'}>
          <Image
            id={'petBackLay'}
            preview={false}
            width={400}
            src={petBackLayImgUrl}
            style={petBackLayStyle}
            onMouseDown={petClickedDown}
            onMouseMove={petDragMove}
          />
          <Image
            id={'petItemLay'}
            preview={false}
            width={400}
            src={petItemLayImgUrl}
            style={petItemLayStyle}
          />
          <Image
            id={'petFrontLay'}
            preview={false}
            width={400}
            src={petFrontLayImgUrl}
            style={petFrontLayStyle}
          />
        </div>
        <List
          bordered
          itemLayout="horizontal"
          dataSource={petValueDisplayData}
          style={{
            position: 'absolute', width: 200, inset: 0, margin: '2% 2% auto auto'
          }}
          renderItem={(item, index) => (
            <List.Item>
              <Statistic title={item.title} value={item.value}/>
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

            <div>
              <Row>
                <Col span={24}>
                  <Radio.Group onChange={onDebugStateChange} value={stateSelected}>
                    <Radio value={0}>Happy</Radio>
                    <Radio value={1}>Normal</Radio>
                    <Radio value={2}>Ill</Radio>
                    <Radio value={3}>PoorCondition</Radio>
                  </Radio.Group></Col>
              </Row>
              <Row style={{marginTop: 20, marginBottom: 20}}>
                <Col span={24}>
                  <Select
                    showSearch
                    placeholder="选择要调试的动画"
                    optionFilterProp="children"
                    onChange={onDebugFunctionChange}
                    filterOption={debugFuncFilterOption}
                    options={functionOptions}
                  />
                </Col>
              </Row>
              <Row style={{marginTop: 20, marginBottom: 20}}>
                <Col span={24}>
                  <Button
                    type="primary"
                    icon={<BugOutlined/>}
                    onClick={beginAnimationDebug}
                  >
                    开始调试
                  </Button>
                </Col>
              </Row>
            </div>
          </Drawer>
          <Drawer
            width={drawerWidth}
            title="特殊互动"
            placement={'right'}
            closable={false}
            onClose={() => {
              setSpecialInterDrawerSwitch(false)
            }}
            open={specialInterDrawerSwitch}
            key={'specialInter'}
          >

            <div>
              <Row>
                <Col span={12}>
                  <InputNumber value={customTargetX} placeholder={'请填入目标X值'}
                               onChange={(value: number | null) => {
                                 setCustomTargetX(value || 0)
                               }}/>
                </Col>
                <Col span={12}>
                  <InputNumber value={customTargetY} placeholder={'请填入目标Y值'}
                               onChange={(value: number | null) => {
                                 setCustomTargetY(value || 0)
                               }}/></Col>
              </Row>
              <Row style={{marginTop: 20, marginBottom: 20}}>
                <Col span={24}>
                  <Button
                    type="primary"
                    icon={<SendOutline/>}
                    onClick={beginManualMove}
                  >
                    移动
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
            <FoodTable width={'95%'} handleBuyFood={(food: API.Food) => {
              console.log(food);
              setFoodDrawerSwitch(false)
              buyFood(food)
            }}/>
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
            <DrinkTable width={'95%'} handleBuyDrink={(drink: API.Drink) => {
              console.log(drink);
              setDrinkDrawerSwitch(false)
              buyDrink(drink);
            }}/>
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
            <MedicineTable width={'95%'} handleBuyMedicine={(medicine: API.Medicine) => {
              console.log(medicine);
              setMedicineDrawerSwitch(false)
              buyMedicine(medicine)
            }}/>
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
            <PresentTable width={'95%'} handleBuyPresent={(present: API.Present) => {
              console.log(present);
              setPresentDrawerSwitch(false)
              buyPresent(present)
            }}/>
          </Drawer>
        </div>
      </div>
    </div>
  );
};
export default PetDisplay;
