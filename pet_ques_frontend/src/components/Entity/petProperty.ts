
// 解决莫名丢失点击之前的curAnimation值
export const preClickAnimation = {
  value: 'Default'
}
export const setPreClickAnimation = (value: string) => {
  preClickAnimation.value = value
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


