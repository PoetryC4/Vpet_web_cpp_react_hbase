import {useState} from "react";
import {
  animationTimestamp,
  durDebug, imgSize,
  isLaunched, petBackLayStyle, petFrontLayStyle, petItemLayStyle, petLeftMargin, petTopMargin,
  setAnimationTimestamp, setPetBackLayImgUrl, setPetBackLayStyle,
  setPetFrontLayImgUrl, setPetFrontLayStyle, setPetItemLayImgUrl, setPetItemLayStyle, setPetLeftMargin, setPetTopMargin
} from "../Entity/petStateProperty";
import {getAllImgsNames, getCurTime} from "@/components/Utils/utils";
import {sleep} from "@antfu/utils";
import {animationGap, debugSleep, imgUrlPrefix} from "@/components/Entity/petConstants";
import {curAnimation} from "@/components/Entity/petProperty";

export const [itemTransformScale, setItemTransformScale] = useState(0.005)

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
export const itemTransformData = [
  [
    // x, y, rotation
    [-57, -50, 6],
    [-112, -311, 7.2],
    [-113, -306, 5.6],
    [-112, -311, 7.2],
    [-113, -306, 5.6],
    [-112, -311, 7.2],
    [-57, -50, 6],//drink_happy
    [1024, 1024, 1024],
  ],
  [
    [-7, 251, 8.3],
    [-29, 293, 19.6],
    [0, 175, 55.2],
    [34, 183, 74.4],
    [37, 186, 76.2],
    [34, 183, 74.4],
    [37, 186, 76.2],
    [34, 183, 74.4],
    [37, 186, 76.2],
    [34, 183, 74.4],
    [-7, 251, 8.3],//drink_ill
    [1024, 1024, 1024],
  ],
  [
    [-134, 273, 6],
    [-105, 296, 7.6],
    [-105, 296, 7.6],
    [-105, 296, 7.6],
    [-105, 296, 7.6],
    [-105, 296, 7.6],//eat_ill
    [1024, 1024, 1024],
  ],
  [
    [26, -100, 0],
    [26, -100, 0],
    [26, -100, 0],
    [26, -100, 0],
    [16, -52, 0],
    [26, -100, 0],
    [26, -100, 0],
    [26, -100, 0],
    [16, -52, 0],
    [26, -100, 0],
    [26, -100, 0],
    [26, -100, 0],//eat_normal_1
    [1024, 1024, 1024],
  ],
  [
    [-2, -120, 0],
    [-2, -120, 0],
    [-2, -120, 0],
    [-2, -120, 0],
    [11, -168, 0],
    [-2, -120, 0],
    [-2, -120, 0],
    [-2, -120, 0],
    [11, -168, 0],
    [-2, -120, 0],
    [-2, -120, 0],
    [-2, -120, 0],//eat_normal_2
    [1024, 1024, 1024],
  ],
  [
    [-27, -207, 0],
    [-20, -79, 0],
    [-21, -106, 0],
    [-16, -109, 0],
    [-12, -102, 0],
    [-12, -102, 0],
    [-12, -102, 0],
    [-21, -106, 0],
    [-16, -109, 0],
    [-12, -102, 0],
    [-12, -102, 0],
    [-12, -102, 0],
    [-12, -102, 0],
    [-12, -102, 0],//gift_happy
    [1024, 1024, 1024],
  ],
  [
    [-119, 87, 0],
    [-86, 101, 0],
    [-86, 101, 0],
    [-122, 129, 0],//gift_ill
    [1024, 1024, 1024],
  ],
  [
    [-27, -207, 0],
    [-20, -79, 0],
    [-21, -106, 0],
    [-21, -106, 0],
    [-21, -106, 0],
    [-21, -106, 0],
    [-21, -106, 0],
    [-21, -106, 0],
    [-21, -106, 0],//gift_normal
    [1024, 1024, 1024],
  ],
  [
    [-27, -207, 0],
    [-20, -79, 0],
    [-21, -106, 0],
    [-21, -106, 0],
    [-21, -106, 0],
    [-21, -106, 0],//gift_poorcondition
    [1024, 1024, 1024],
  ]
]

export async function petAnimation(path: string, isDebug: boolean) {
  if (!isLaunched || (durDebug && !isDebug)) return
  //console.log(path)
  let allFrontLayImgs = await getAllImgsNames(path)
  if (!allFrontLayImgs) return
  //console.log(allFrontLayImgs)
  setAnimationTimestamp(getCurTime())
  let curAnimationTimestamp = animationTimestamp
  for (let imgName in allFrontLayImgs) {
    if (!isLaunched || (durDebug && !isDebug)) return
    // 另一个动画开始后，当前动画结束
    if (curAnimationTimestamp !== animationTimestamp) break
    setPetFrontLayImgUrl(imgUrlPrefix + path + imgName)
    await sleep(animationGap)
  }
  if (isDebug) {
    await sleep(debugSleep)
  }
}

export async function petAnimation3layers(charPath: string, itemPath: string, startIndex: number, itemTransformIndex: number, isDebug: boolean) {
  if (!isLaunched || (durDebug && !isDebug)) return
  // 180是试出来的值
  setItemTransformScale(180 / imgSize)
  let allBackLayImgs: string[] = await getAllImgsNames(charPath + '/back_lay')
  if (!allBackLayImgs) return
  let allFrontLayImgs: string[] = await getAllImgsNames(charPath + '/front_lay')
  if (!allFrontLayImgs) return

  setPetFrontLayStyle({...petFrontLayStyle, marginLeft: petLeftMargin + 'px', marginTop: petTopMargin + 'px'})
  setPetItemLayStyle({...petItemLayStyle, marginLeft: petLeftMargin + 'px', marginTop: petTopMargin + 'px'})

  setAnimationTimestamp(getCurTime())
  let curAnimationTimestamp = animationTimestamp
  for (let i = 0; i < allBackLayImgs.length; i++) {
    if (!isLaunched || (durDebug && !isDebug)) return
    // 另一个动画开始后，当前动画结束
    if (curAnimationTimestamp !== animationTimestamp) break
    setPetBackLayImgUrl(imgUrlPrefix + charPath + allBackLayImgs[i])
    // 处理前置层和物品图层
    if (i >= startIndex && i < startIndex + allFrontLayImgs.length) {
      setPetFrontLayStyle({...petFrontLayStyle, display: 'block'})
      setPetFrontLayImgUrl(imgUrlPrefix + charPath + allFrontLayImgs[i - startIndex])
      if (itemTransformData[itemTransformIndex][i - startIndex][0] !== 1024) {
        setPetItemLayStyle({
          ...petItemLayStyle,
          display: 'block',
          transform: 'scale(0.16) rotate(' + itemTransformData[itemTransformIndex][i - startIndex][2] + 'deg) translateX(' + itemTransformData[itemTransformIndex][i - startIndex][0] + 'px) translateY(' + itemTransformData[itemTransformIndex][i - startIndex][1] + 'px)'
        })
      }
      setPetItemLayImgUrl(imgUrlPrefix + itemPath)
    } else {
      setPetFrontLayStyle({...petFrontLayStyle, display: 'none'})
      setPetItemLayStyle({...petItemLayStyle, display: 'none'})
    }
    await sleep(animationGap)
  }
  setPetFrontLayStyle({...petFrontLayStyle, display: 'none'})
  setPetItemLayStyle({...petItemLayStyle, display: 'none'})
  if (isDebug) {
    await sleep(debugSleep)
  }
}


export async function petMovementAnimation_B(path: string, speed: number, direction: string, target: number, startX: number, startY: number, isDebug: boolean) {
  if (!isLaunched || (durDebug && !isDebug)) return
  console.log(path)
  if (curAnimation === 'Raise') return
  let allFrontLayImgs: string[] = await getAllImgsNames(path)
  if (!allFrontLayImgs) return
  setAnimationTimestamp(getCurTime())
  let curAnimationTimestamp = animationTimestamp
  switch (direction) {
    case 'R':
    case 'r': {
      while (petLeftMargin + imgSize / 2 < target) {
        if (!isLaunched || (durDebug && !isDebug)) return
        if (curAnimationTimestamp !== animationTimestamp) break
        for (let i = 0; i < allFrontLayImgs.length; i++) {
          if (curAnimationTimestamp !== animationTimestamp) break
          let newLeftMargin = petLeftMargin + speed
          setPetLeftMargin(newLeftMargin)
          setPetBackLayStyle({...petBackLayStyle, marginLeft: newLeftMargin + 'px'})
          if (petLeftMargin + imgSize / 2 >= target) break
          setPetFrontLayImgUrl(imgUrlPrefix + path + allFrontLayImgs[i])
          await sleep(animationGap)
        }
      }
      break
    }
    case 'L':
    case 'l': {
      while (petLeftMargin + imgSize / 2 > target) {
        if (!isLaunched || (durDebug && !isDebug)) return
        if (curAnimationTimestamp !== animationTimestamp) break
        for (let i = 0; i < allFrontLayImgs.length; i++) {
          if (curAnimationTimestamp !== animationTimestamp) break
          let newLeftMargin = petLeftMargin - speed
          setPetLeftMargin(newLeftMargin)
          setPetBackLayStyle({...petBackLayStyle, marginLeft: newLeftMargin + 'px'})
          if (petLeftMargin + imgSize / 2 <= target) break
          setPetFrontLayImgUrl(imgUrlPrefix + path + allFrontLayImgs[i])
          await sleep(animationGap)
        }
      }
      break
    }
    case 'D':
    case 'd': {
      while (petTopMargin + imgSize / 2 < target) {
        if (!isLaunched || (durDebug && !isDebug)) return
        if (curAnimationTimestamp !== animationTimestamp) break
        for (let i = 0; i < allFrontLayImgs.length; i++) {
          if (curAnimationTimestamp !== animationTimestamp) break
          let newTopMargin = petTopMargin + speed
          setPetTopMargin(newTopMargin)
          setPetBackLayStyle({...petBackLayStyle, marginTop: newTopMargin + 'px'})
          if (petTopMargin + imgSize / 2 >= target) break
          setPetFrontLayImgUrl(imgUrlPrefix + path + allFrontLayImgs[i])
          await sleep(animationGap)
        }
      }
      break
    }
    case 'U':
    case 'u': {
      while (petTopMargin + imgSize / 2 > target) {
        if (!isLaunched || (durDebug && !isDebug)) return
        if (curAnimationTimestamp !== animationTimestamp) break
        for (let i = 0; i < allFrontLayImgs.length; i++) {
          if (curAnimationTimestamp !== animationTimestamp) break
          let newTopMargin = petTopMargin - speed
          setPetTopMargin(newTopMargin)
          setPetBackLayStyle({...petBackLayStyle, marginTop: newTopMargin + 'px'})
          if (petTopMargin + imgSize / 2 <= target) break
          setPetFrontLayImgUrl(imgUrlPrefix + path + allFrontLayImgs[i])
          await sleep(animationGap)
        }
      }
      break
    }
  }
  if (isDebug) {
    await sleep(debugSleep)
  }
}
