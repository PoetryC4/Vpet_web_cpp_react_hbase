import {getBaseLog} from "@/components/Utils/utils";

export const interactionNames = [
  'Sleep',
  'Study',
  'Live',
  'Copy',
  'Dance',
  'WorkClean',
  'RemoveObject',
  'PlayONE',
  'Research'
]
export const specialInteractionNames = [
  'Raise',
  'Falling',
  'Touch_Head',
  'Touch_Body'
]
// 监听后根据状态值改变不同
export const petValueChange = {
  'Dance':{
    hungerChange: -0.003,
    thirstyChange: -0.003,
    enduranceChange: -0.004,
    healthChange: 0.002
  },
  'Sleep':{
    hungerChange: -0.001,
    thirstyChange: -0.001,
    enduranceChange: 0.006,
    healthChange: 0.001
  },
  'Study':{
    hungerChange: -0.003,
    thirstyChange: -0.004,
    enduranceChange: -0.002,
    moodChange: -0.007,
    expChange: 0.05,
    healthChange: -0.003
  },
  'Live':{
    hungerChange: -0.004,
    thirstyChange: -0.005,
    enduranceChange: -0.003,
    moodChange: -0.008,
    expChange: 0.01,
    moneyChange: ((curExp:number, curWorkPerformance: number)=>{
      return 0.3 * parseFloat(getBaseLog(10, curExp).toFixed(2)) * curWorkPerformance
    }),
    healthChange: -0.003
  },
  'Copy':{
    hungerChange: -0.003,
    thirstyChange: -0.004,
    enduranceChange: -0.002,
    moodChange: -0.005,
    expChange: 0.02,
    moneyChange: ((curExp:number, curWorkPerformance: number)=>{
      return 0.1 * parseFloat(getBaseLog(10, curExp).toFixed(2)) * curWorkPerformance / 2
    }),
    healthChange: -0.002
  },
  'Research':{
    hungerChange: -0.003,
    thirstyChange: -0.004,
    enduranceChange: -0.002,
    moodChange: -0.004,
    expChange: 0.06,
    moneyChange: ((curExp:number, curWorkPerformance: number)=>{
      return -0.02 * parseFloat(getBaseLog(10, curExp).toFixed(2)) * curWorkPerformance / 2
    }),
    healthChange: -0.004
  },
  'PlayONE':{
    hungerChange: -0.003,
    thirstyChange: -0.004,
    enduranceChange: -0.003,
    moodChange: 0.006,
    expChange: 0.01,
    healthChange: -0.001
  },
  'WorkClean':{
    hungerChange: -0.005,
    thirstyChange: -0.006,
    enduranceChange: -0.005,
    moodChange: -0.002,
    expChange: 0.02,
    moneyChange: ((curExp:number, curWorkPerformance: number)=>{
      return 0.04 * parseFloat(getBaseLog(10, curExp).toFixed(2)) * curWorkPerformance / 2
    }),
    healthChange: -0.002
  },
  'RemoveObject':{
    hungerChange: -0.003,
    thirstyChange: -0.004,
    enduranceChange: -0.001,
    moodChange: -0.005,
    expChange: 0.01,
    moneyChange: ((curExp:number, curWorkPerformance: number)=>{
      return 0.07 * parseFloat(getBaseLog(10, curExp).toFixed(2)) * curWorkPerformance / 2
    }),
    healthChange: -0.002
  },
  'Default':{
    hungerChange: -0.002,
    thirstyChange: -0.003,
    enduranceChange: -0.001,
    moodChange: -0.001
  }
}

export const speedFast = 12
export const speedNormal = 9
export const speedSlow = 6
export const speedFalling = 17

// export const imgUrlPrefix = "http://192.168.116.129:12432/static"


export const imgUrlPrefix = "http://127.0.0.1:12432/static"

// 两帧图片之间的间隔
export const animationGap = 110

// 两帧图片之间的间隔
export const debugSleep = 500
// 监听数值以出发函数的间隔
export const listenerGap = 500
// 尝试触发特殊状态的间隔
export const trialGap = 5000
// 触发无聊默认动作的间隔
export const boringMidGap = 2000


export const itemTransformDataIdx = {
  drinkHappyIdx: 0,
  drinkIllIdx: 1,
  eatIllIdx: 2,
  eatNormalOneIdx: 3,
  eatNormalTwoIdx: 4,
  giftHappyIdx: 5,
  giftIllIdx: 6,
  giftNormalIdx: 7,
  giftPoorConditionIdx: 8,
}
