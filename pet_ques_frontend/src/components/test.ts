import {changeNum, getNum} from "@/pages/Test";

export const tryGetNum = () => {
  console.log(getNum.value())
}
export const trySetNum = () => {
  changeNum.value(Math.random() * 10)
}
