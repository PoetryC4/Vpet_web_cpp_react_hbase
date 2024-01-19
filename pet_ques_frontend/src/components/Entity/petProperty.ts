import {useState} from "react";

// 当前处于的动画状态
export const [curAnimation, setCurAnimation] = useState<string>('Default');
export const [petMoney, setPetMoney] = useState<number>(100.0);
export const [petExp, setPetExp] = useState<number>(10.0);
export const [petEndu, setPetEndu] = useState<number>(50.0);
export const [petMood, setPetMood] = useState<number>(50.0);
export const [petHunger, setPetHunger] = useState<number>(50.0);
export const [petThirsty, setPetThirsty] = useState<number>(50.0);
export const [petHealth, setPetHealth] = useState<number>(100.0);
export const [petWorkPerformance, setPetWorkPerformance] = useState<number>(1);
// 当前处于的人物状态
export const [curState, setCurState] = useState<string>('Normal');


