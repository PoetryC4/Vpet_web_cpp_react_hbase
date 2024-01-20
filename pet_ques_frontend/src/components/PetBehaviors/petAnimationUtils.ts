import {getAllImgsNames, getCurTime} from "@/components/Utils/utils";
import {sleep} from "@antfu/utils";
import {animationGap, debugSleep, imgUrlPrefix} from "@/components/Entity/petConstants";
import {
  animationTimestamp,
  durDebug,
  imgSize,
  isLaunched, petLeftMargin, petTopMargin,
  setAnimationTimestamp, setItemTransformScale, setPetLeftMargin, setPetTopMargin
} from "@/components/Entity/petStateProperty";
import {curAnimation} from "@/components/Entity/petProperty";
import {hooksToBeExported} from "@/pages/Pet/Display";

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
// 物品的变换参数
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
  if (!isLaunched.value || (durDebug.value && !isDebug)) return
  //console.log(path)
  let allBackLayImgs = await getAllImgsNames(path)
  if (!allBackLayImgs) return
  console.log(allBackLayImgs)
  setAnimationTimestamp(getCurTime())
  let thisAnimationTimestamp = animationTimestamp.value
  for (let imgName of allBackLayImgs) {
    if (!isLaunched.value || (durDebug.value && !isDebug)) return
    // 另一个动画开始后，当前动画结束
    if (thisAnimationTimestamp !== animationTimestamp.value) break
    hooksToBeExported.trySetPetBackLayImgUrl(imgUrlPrefix + path + '/' + imgName)
    await sleep(animationGap)
  }
  if (isDebug) {
    await sleep(debugSleep)
  }
}

export async function petAnimation3layers(charPath: string, itemPath: string, startIndex: number, itemTransformIndex: number, isDebug: boolean) {
  if (!isLaunched.value || (durDebug.value && !isDebug)) return
  // 180是试出来的值
  setItemTransformScale(180 / imgSize.value)
  let allBackLayImgs = await getAllImgsNames(charPath + '/back_lay')
  if (!allBackLayImgs) return
  let allFrontLayImgs = await getAllImgsNames(charPath + '/front_lay')
  if (!allFrontLayImgs) return

  hooksToBeExported.trySetPetFrontLayStyle({
    ...(hooksToBeExported.tryGetPetFrontLayStyle()),
    marginLeft: petLeftMargin.value + 'px',
    marginTop: petTopMargin.value + 'px'
  })
  hooksToBeExported.trySetPetItemLayStyle({
    ...(hooksToBeExported.tryGetPetItemLayStyle()),
    marginLeft: petLeftMargin.value + 'px',
    marginTop: petTopMargin.value + 'px'
  })

  setAnimationTimestamp(getCurTime())
  let thisAnimationTimestamp = animationTimestamp.value
  for (let i = 0; i < allBackLayImgs.length; i++) {
    if (!isLaunched.value || (durDebug.value && !isDebug)) return
    // 另一个动画开始后，当前动画结束
    if (thisAnimationTimestamp !== animationTimestamp.value) break
    hooksToBeExported.trySetPetBackLayImgUrl(imgUrlPrefix + charPath + '/' + allBackLayImgs[i])
    // 处理前置层和物品图层
    if (i >= startIndex && i < startIndex + allFrontLayImgs.length) {
      hooksToBeExported.trySetPetFrontLayStyle({...(hooksToBeExported.tryGetPetFrontLayStyle()), display: 'block'})
      hooksToBeExported.trySetPetFrontLayImgUrl(imgUrlPrefix + charPath + '/' + allFrontLayImgs[i - startIndex])
      if (itemTransformData[itemTransformIndex][i - startIndex][0] !== 1024) {
        hooksToBeExported.trySetPetItemLayStyle({
          ...(hooksToBeExported.tryGetPetItemLayStyle()),
          display: 'block',
          transform: 'scale(0.16) rotate(' + itemTransformData[itemTransformIndex][i - startIndex][2] + 'deg) translateX(' + itemTransformData[itemTransformIndex][i - startIndex][0] + 'px) translateY(' + itemTransformData[itemTransformIndex][i - startIndex][1] + 'px)'
        })
      }
      hooksToBeExported.trySetPetItemLayImgUrl(imgUrlPrefix + '/' + itemPath)
    } else {
      hooksToBeExported.trySetPetFrontLayStyle({...(hooksToBeExported.tryGetPetFrontLayStyle()), display: 'none'})
      hooksToBeExported.trySetPetItemLayStyle({...(hooksToBeExported.tryGetPetItemLayStyle()), display: 'none'})
    }
    await sleep(animationGap)
  }
  hooksToBeExported.trySetPetFrontLayStyle({...(hooksToBeExported.tryGetPetFrontLayStyle()), display: 'none'})
  hooksToBeExported.trySetPetItemLayStyle({...(hooksToBeExported.tryGetPetItemLayStyle()), display: 'none'})
  if (isDebug) {
    await sleep(debugSleep)
  }
}


export async function petMovementAnimation_B(path: string, speed: number, direction: string, target: number, startX: number, startY: number, isDebug: boolean) {
  if (!isLaunched.value || (durDebug.value && !isDebug)) return
  console.log(path)

  if (curAnimation.value === 'Raise') return
  let allFrontLayImgs = await getAllImgsNames(path)
  if (!allFrontLayImgs) return
  setAnimationTimestamp(getCurTime())
  let thisAnimationTimestamp = animationTimestamp.value
  switch (direction) {
    case 'R':
    case 'r': {
      while (petLeftMargin.value + imgSize.value / 2 < target) {
        if (!isLaunched.value || (durDebug.value && !isDebug)) return
        if (thisAnimationTimestamp !== animationTimestamp.value) break
        for (let i = 0; i < allFrontLayImgs.length; i++) {
          if (thisAnimationTimestamp !== animationTimestamp.value) break
          let newLeftMargin = petLeftMargin.value + speed
          setPetLeftMargin(newLeftMargin)
          hooksToBeExported.trySetPetBackLayStyle({
            ...(hooksToBeExported.tryGetPetBackLayStyle()),
            marginLeft: newLeftMargin + 'px'
          })
          if (petLeftMargin.value + imgSize.value / 2 >= target) break
          hooksToBeExported.trySetPetFrontLayImgUrl(imgUrlPrefix + path + '/' + allFrontLayImgs[i])
          await sleep(animationGap)
        }
      }
      break
    }
    case 'L':
    case 'l': {
      while (petLeftMargin.value + imgSize.value / 2 > target) {
        if (!isLaunched.value || (durDebug.value && !isDebug)) return
        if (thisAnimationTimestamp !== animationTimestamp.value) break
        for (let i = 0; i < allFrontLayImgs.length; i++) {
          if (thisAnimationTimestamp !== animationTimestamp.value) break
          let newLeftMargin = petLeftMargin.value - speed
          setPetLeftMargin(newLeftMargin)
          hooksToBeExported.trySetPetBackLayStyle({
            ...(hooksToBeExported.tryGetPetBackLayStyle()),
            marginLeft: newLeftMargin + 'px'
          })
          if (petLeftMargin.value + imgSize.value / 2 <= target) break
          hooksToBeExported.trySetPetFrontLayImgUrl(imgUrlPrefix + path + '/' + allFrontLayImgs[i])
          await sleep(animationGap)
        }
      }
      break
    }
    case 'D':
    case 'd': {
      while (petTopMargin.value + imgSize.value / 2 < target) {
        if (!isLaunched.value || (durDebug.value && !isDebug)) return
        if (thisAnimationTimestamp !== animationTimestamp.value) break
        for (let i = 0; i < allFrontLayImgs.length; i++) {
          if (thisAnimationTimestamp !== animationTimestamp.value) break
          let newTopMargin = petTopMargin.value + speed
          setPetTopMargin(newTopMargin)
          hooksToBeExported.trySetPetBackLayStyle({
            ...(hooksToBeExported.tryGetPetBackLayStyle()),
            marginTop: newTopMargin + 'px'
          })
          if (petTopMargin.value + imgSize.value / 2 >= target) break
          hooksToBeExported.trySetPetFrontLayImgUrl(imgUrlPrefix + path + '/' + allFrontLayImgs[i])
          await sleep(animationGap)
        }
      }
      break
    }
    case 'U':
    case 'u': {
      while (petTopMargin.value + imgSize.value / 2 > target) {
        if (!isLaunched.value || (durDebug.value && !isDebug)) return
        if (thisAnimationTimestamp !== animationTimestamp.value) break
        for (let i = 0; i < allFrontLayImgs.length; i++) {
          if (thisAnimationTimestamp !== animationTimestamp.value) break
          let newTopMargin = petTopMargin.value - speed
          setPetTopMargin(newTopMargin)
          hooksToBeExported.trySetPetBackLayStyle({
            ...(hooksToBeExported.tryGetPetBackLayStyle()),
            marginTop: newTopMargin + 'px'
          })
          if (petTopMargin.value + imgSize.value / 2 <= target) break
          hooksToBeExported.trySetPetFrontLayImgUrl(imgUrlPrefix + path + '/' + allFrontLayImgs[i])
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
