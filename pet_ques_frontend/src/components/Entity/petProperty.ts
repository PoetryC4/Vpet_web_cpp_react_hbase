import {useState} from "react";

const petProperty = () => {
// 当前处于的动画状态
  /*const [curAnimation.value, setCurAnimation] = useState<string>('Default');*//*
  const [petMoney, setPetMoney] = useState<number>(100.0);
  const [petExp, setPetExp] = useState<number>(10.0);
  const [petEndu, setPetEndu] = useState<number>(50.0);
  const [petMood, setPetMood] = useState<number>(50.0);
  const [petHunger, setPetHunger] = useState<number>(50.0);
  const [petThirsty, setPetThirsty] = useState<number>(50.0);
  const [petHealth, setPetHealth] = useState<number>(100.0);
  const [workPerformance, setWorkPerformance] = useState(1)*/
  /*const [petWorkPerformance, setPetWorkPerformance] = useState<number>(1);*/
// 当前处于的人物状态
  /*const [curState, setCurState] = useState<string>('Normal');*/

}

export const curAnimation = {
  value: 'Default'
}
export const setCurAnimation = (value: string) => {
  curAnimation.value = value
}
export const curState = {
  value: 'Normal'
}
export const setCurState = (value: string) => {
  curState.value = value
}
export const petWorkPerformance = {
  value: 1
}
export const setPetWorkPerformance = (value: number) => {
  petWorkPerformance.value = value
}


