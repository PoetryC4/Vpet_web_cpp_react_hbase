import {petAnimation, petAnimation3layers, petMovementAnimation_B} from "./petAnimationUtils";
import {sleep} from "@antfu/utils";
import {
  animationGap,
  boringMidGap,
  interactionNames, listenerGap,
  petValueChange,
  specialInteractionNames, speedFalling, speedFast, speedNormal,
  speedSlow,
  trialGap
} from "@/components/Entity/petConstants";
import {getCurTime, randomInt} from "@/components/Utils/utils";
import {
  boringAnimationFlag,
  durDebug,
  durSwitch, enableRandMov,
  hungryAnimationFlag, illAnimationFlag,
  imgSize, isCopy, isDance,
  isDragged,
  isLaunched, isLive, isPlayOne, isRemoveObject, isResearch, isSleep, isStudy, isWorkClean,
  petLeftMargin,
  petTopMargin,
  preLaunched,
  recoverAnimationFlag,
  setBoringAnimationFlag, setDurShutdown,
  setDurSwitch,
  setHungryAnimationFlag,
  setIllAnimationFlag, setIsCopy, setIsDance,
  setIsDragged,
  setIsLaunched, setIsLive, setIsPlayOne, setIsRemoveObject, setIsResearch, setIsSleep, setIsStudy, setIsWorkClean,
  setPetLeftMargin,
  setPetTopMargin,
  setRecoverAnimationFlag,
  setThirstyAnimationFlag,
  thirstyAnimationFlag
} from "@/components/Entity/petStateProperty";
import {
  curAnimation,
  curState,
  petWorkPerformance,
  setCurAnimation,
  setCurState
} from "@/components/Entity/petProperty";
/*
let time: any

async function dragMove(event: { clientX: any; clientY: any; }) {

  const mouseX = event.clientX
  const mouseY = event.clientY
  if (mouseX === undefined || mouseY === undefined) return
  const scrollX = window.scrollX
  const scrollY = window.scrollY

  let newPetLeftMargin = mouseX + scrollX - petLeftMargin.value
  let newPetTopMargin = mouseY + scrollY - petTopMargin.value

  setPetBackLayStyle({...(getPetBackLayStyle()), marginLeft: newPetLeftMargin + 'px', marginTop: newPetTopMargin + 'px'})
}

async function petClickedUp(event: MouseEvent) {

  setPetMouseMoveEvent(undefined)

  const mouseX = event.clientX
  const mouseY = event.clientY

  if (time) {
    clearInterval(time);
    time = null
  }

  if (!isDragged.value || curAnimation.value !== 'Raise') {
    const mousePerX = (mouseX - petLeftMargin.value) / imgSize.value
    const mousePerY = (mouseY - petTopMargin.value) / imgSize.value

    if (mousePerX >= 0.3 && mousePerX <= 0.7 && mousePerY <= 0.3 && mousePerY >= 0.1) {
      console.log('Head')
      setCurAnimation("Touch_Head")
      setPetMood(petMood + 2)
      setPetEndu(petEndu - 4)
      switch (curState.value) {
        case 'Ill':
        case 'PoorCondition': {
          await petAnimation('/vup/' + curAnimation.value + '/A_Ill', false)
          await petAnimation('/vup/' + curAnimation.value + '/B_Ill', false)
          await petAnimation('/vup/' + curAnimation.value + '/C_Ill', false)
          break
        }
        default: {
          await petAnimation('/vup/' + curAnimation.value + '/A_' + curState.value, false)
          await petAnimation('/vup/' + curAnimation.value + '/B_' + curState.value, false)
          await petAnimation('/vup/' + curAnimation.value + '/C_' + curState.value, false)
          break
        }
      }
      setCurAnimation('Default')
    } else if (mousePerX >= 0.15 && mousePerX <= 0.85 && mousePerY >= 0.25 && mousePerY <= 0.95) {
      console.log('Body')
      setCurAnimation("Touch_Body")
      setPetMood(petMood + 2)
      setPetEndu(petEndu - 4)
      switch (curState.value) {
        case 'Ill':
        case 'PoorCondition': {
          await petAnimation('/vup/' + curAnimation.value + '/A_Ill', false)
          await petAnimation('/vup/' + curAnimation.value + '/B_Ill', false)
          await petAnimation('/vup/' + curAnimation.value + '/C_Ill', false)
          break
        }
        default: {
          let rand = randomInt(1, 3)
          await petAnimation('/vup/' + curAnimation.value + '/A_Happy/tb' + rand, false)
          await petAnimation('/vup/' + curAnimation.value + '/B_Happy/tb' + rand, false)
          await petAnimation('/vup/' + curAnimation.value + '/C_Happy/tb' + rand, false)
          break
        }
      }
      setCurAnimation('Default')
    }
  }
  if (curAnimation.value !== 'Raise') return
  setCurAnimation("Falling")
  await petAnimation('/vup/Raise/Raised_Static/C_' + curState.value, false)
  setIsDragged(false)
  setCurAnimation('Default')
}

async function petClickedDown(event: { clientX: any; clientY: any; }) {
  console.log(event)
  const mouseX = event.clientX
  const mouseY = event.clientY
  //获取鼠标按下时的时间
  let timeStart = getCurTime();

  //setInterval会每100毫秒执行一次，也就是每100毫秒获取一次时间
  if (curAnimation.value !== 'Raise' && curAnimation.value !== 'Falling') {
    time = setInterval(async function () {
      let timeEnd = getCurTime();

      //如果此时检测到的时间与第一次获取的时间差有1000毫秒
      if (timeEnd - timeStart > 1000) {
        setIsDragged(true)
        //便不再继续重复此函数 （clearInterval取消周期性执行）
        clearInterval(time);
        time = null
        setCurAnimation('Raise')
        setPetTopMargin(mouseY - petTopMargin.value)
        setPetLeftMargin(mouseY - petLeftMargin.value)
        setPetMouseMoveEvent(dragMove)
        await petAnimation('/vup/' + curAnimation.value + '/Raised_Static/A_' + curState.value, false)
        while (curAnimation.value === 'Raise') {
          if (curState.value !== 'Normal') {
            await petAnimation('/vup/' + curAnimation.value + '/Raised_Dynamic/' + curState.value, false)
          } else {
            await petAnimation('/vup/' + curAnimation.value + '/Raised_Dynamic/Normal/' + randomInt(1, 3), false)
          }
        }
        return
      }
    }, 100);
  }
}
*/

export async function illAnimation() {
  if (curState.value === 'Ill') {
    setDurSwitch(true)
    await petAnimation('/vup/Switch/Down/PoorCondition', false)
    setDurSwitch(false)
  } else {
    setDurSwitch(true)
    await petAnimation('/vup/Switch/Down/' + curState.value, false)
    setDurSwitch(false)
  }
  setCurState('Ill')
}

export async function tryIll(ext: number) {
  await sleep(trialGap)
  if (curState.value === 'Ill' || durSwitch.value) return
  else if (Math.random() * Math.pow(2, ext) < 2) {
    setIllAnimationFlag(true)
  } else {
    tryIll(Math.max(1, ext - 1))
  }
}

export async function recoverAnimation() {
  if (curState.value === 'Happy') {
    await petAnimation('/vup/Switch/Up/Normal', false)
  } else {
    await petAnimation('/vup/Switch/Up/' + curState.value, false)
  }
  setCurState('Normal')
}

export async function tryRecover(ext: number) {
  await sleep(trialGap)
  if (curState.value !== 'Ill' || durSwitch.value) return
  else if (Math.random() * Math.pow(2, ext) < 2) {
    setRecoverAnimationFlag(true)
    setIllAnimationFlag(false)
  } else {
    tryRecover(Math.max(1, ext - 1))
  }
}

export async function hungryAnimation() {
  if (curState.value === 'Ill') {
    setDurSwitch(true)
    await petAnimation('/vup/Switch/Hunger/PoorCondition', false)
    setDurSwitch(false)
  } else {
    setDurSwitch(true)
    await petAnimation('/vup/Switch/Hunger/' + curState.value, false)
    setDurSwitch(false)
  }
}

export async function tryHungry(ext: number) {
  await sleep(trialGap)

  if (curState.value === 'Ill' || durSwitch.value || hungryAnimationFlag.value) return
  else if (Math.random() * Math.pow(2, ext) < 2) {
    setHungryAnimationFlag(true)
  } else {
    await tryHungry(Math.max(1, ext - 1))
  }
}

export async function thirstyAnimation() {
  setDurSwitch(true)
  await petAnimation('/vup/Switch/Thirsty', false)
  setDurSwitch(false)
}

export async function tryThirsty(ext: number) {
  await sleep(trialGap)
  if (curState.value === 'Ill' || durSwitch.value || thirstyAnimationFlag.value) return
  else if (Math.random() * Math.pow(2, ext) < 2) {
    setThirstyAnimationFlag(true)
  } else {
    await tryThirsty(Math.max(1, ext - 1))
  }
}

export async function boringAnimation() {
  setDurSwitch(true)
  let rand = randomInt(0, 3)
  switch (rand) {
    case 0: {
      await petAnimation('/vup/IDEL/Boring/A_Normal', false)
      let loop = randomInt(1, 3)
      for (let i = 0; i < loop; i++) {
        await petAnimation('/vup/IDEL/Boring/B_Normal', false)
      }
      await petAnimation('/vup/IDEL/Boring/C_Normal', false)
      break
    }
    case 1: {
      if (curState.value === 'Ill' || curState.value === 'PoorCondition') {
        await petAnimation('/vup/IDEL/Squat/A_PoorCondition', false)
        let loop = randomInt(1, 3)
        for (let i = 0; i < loop; i++) {
          await petAnimation('/vup/IDEL/Squat/B_PoorCondition/' + randomInt(1, 3), false)
          await sleep(boringMidGap / 2)
        }
        await petAnimation('/vup/IDEL/Squat/C_PoorCondition', false)
      } else {
        await petAnimation('/vup/IDEL/Squat/A_Normal', false)
        let loop = randomInt(1, 3)
        for (let i = 0; i < loop; i++) {
          await petAnimation('/vup/IDEL/Squat/B_Normal/' + randomInt(1, 3), false)
          await sleep(boringMidGap / 2)
        }
        await petAnimation('/vup/IDEL/Squat/C_Normal', false)
      }
      break
    }
    case 2: {
      if (curState.value === 'Ill' || curState.value === 'PoorCondition') {
        await petAnimation('/vup/State/StateONE/A_PoorCondition', false)
        let loop = randomInt(1, 3)
        for (let i = 0; i < loop; i++) {
          await petAnimation('/vup/State/StateONE/B_PoorCondition', false)
          await sleep(boringMidGap)
        }
        await petAnimation('/vup/State/StateONE/C_PoorCondition', false)
      } else {
        await petAnimation('/vup/State/StateONE/A_' + curState.value, false)
        let loop = randomInt(1, 3)
        for (let i = 0; i < loop; i++) {
          await petAnimation('/vup/State/StateONE/B_' + curState.value + '/' + randomInt(1, 3), false)
          await sleep(boringMidGap)
        }
        await petAnimation('/vup/State/StateONE/C_' + curState.value, false)
      }
      break
    }
    case 3: {
      if (curState.value === 'Ill' || curState.value === 'PoorCondition') {
        await petAnimation('/vup/State/StateTWO/A_PoorCondition', false)
        let loop = randomInt(1, 3)
        for (let i = 0; i < loop; i++) {
          await petAnimation('/vup/State/StateTWO/B_PoorCondition', false)
          await sleep(boringMidGap)
        }
        await petAnimation('/vup/State/StateTWO/C_PoorCondition', false)
      } else {
        await petAnimation('/vup/State/StateTWO/A_Normal', false)
        let loop = randomInt(1, 3)
        for (let i = 0; i < loop; i++) {
          await petAnimation('/vup/State/StateTWO/B_Normal', false)
          await sleep(boringMidGap)
        }
        await petAnimation('/vup/State/StateTWO/C_Normal', false)
      }
      break
    }
    default: {
      break
    }
  }
  setDurSwitch(false)
}

export async function tryBoring(ext: number) {
  if (curState.value === 'Ill' || durSwitch.value || boringAnimationFlag.value) return
  await sleep(trialGap)
  if (Math.random() * Math.pow(2, ext) < 2) {
    setBoringAnimationFlag(true)
  } else {
    await tryBoring(Math.max(1, ext - 1))
  }
}
/*
async function petListener() {
  if (curAnimation.value in interactionNames) {
    setPetHunger(petHunger + (petValueChange[curAnimation.value].hungerChange || 0))
    setPetThirsty(petThirsty + (petValueChange[curAnimation.value].thirstyChange || 0))
    setPetExp(petExp + (petValueChange[curAnimation.value].expChange || 0))
    setPetEndu(petEndu + (petValueChange[curAnimation.value].enduranceChange || 0))
    setPetMood(petMood + (petValueChange[curAnimation.value].moodChange || 0))
    setPetHealth(petHealth + (petValueChange[curAnimation.value].healthChange || 0))
    setPetMoney(petMoney + ((petValueChange[curAnimation.value].moneyChange(petExp, petWorkPerformance.value)) || 0))
    return
  }
  setPetHunger(petHunger + (petValueChange['Default'].hungerChange || 0))
  setPetThirsty(petThirsty + (petValueChange['Default'].thirstyChange || 0))
  setPetEndu(petEndu + (petValueChange['Default'].enduranceChange || 0))
  setPetMood(petMood + (petValueChange['Default'].moodChange || 0))
  //console.log(curState.value)
  if (durSwitch.value) return

  if (curState.value === 'Ill') {
    if (petHealth >= 60) {
      tryRecover(10 - Math.floor(petHealth / 10))
    }
  } else if (petHealth <= 60) {
    setCurState('PoorCondition')
    if (petHealth <= 40) {
      tryIll(6)
    }
  } else if (petMood >= 75) {
    setCurState('Happy')
  } else {
    setCurState('Normal')
  }

  if (petHunger <= 30) {
    tryHungry(5)
  } else if (petThirsty <= 30) {
    tryThirsty(6)
  } else if (curState.value !== 'Ill') {
    tryBoring(8)
  }
}

async function defaultAnimation() {
  while (isLaunched.value) {
    for (; durSwitch.value || curAnimation.value in specialInteractionNames || curAnimation.value in interactionNames || durDebug.value;) {
      await sleep(animationGap)
    }
    switch (curState.value) {
      case 'Normal': {
        await petAnimation('/vup/Default/Normal', false)
        break
      }
      case 'Ill': {
        await petAnimation('/vup/Default/Ill/' + randomInt(1, 3), false)
        break
      }
      case 'Happy': {
        await petAnimation('/vup/Default/Happy/' + Math.round(0.5 + Math.random() * 3), false)
        break
      }
      case 'PoorCondition': {
        await petAnimation('/vup/Default/PoorCondition/' + Math.round(0.5 + Math.random() * 4), false)
        break
      }
    }
  }
}

export async function start() {
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

  setPetMouseDownEvent(petClickedDown)
  window.addEventListener("mouseup", petClickedUp);

  switch (curState.value) {
    case 'Normal': {
      await petAnimation('/vup/StartUP/Normal', false)
      break
    }
    case 'Ill': {
      await petAnimation('/vup/StartUP/Ill', false)
      break
    }
    case 'Happy': {
      await petAnimation('/vup/StartUP/Happy/' + randomInt(1, 3), false)
      break
    }
    case 'PoorCondition': {
      await petAnimation('/vup/StartUP/PoorCondition', false)
      break
    }
    default: {
      setCurState('Normal')
      break
    }
  }

  defaultAnimation()

  while (isLaunched.value) {
    for (; curAnimation.value in specialInteractionNames;) {
      await sleep(animationGap)
    }
    if (durDebug.value) {
      await sleep(listenerGap)
      continue
    }
    if (curAnimation.value in interactionNames) {
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

export async function shutdown() {
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

  setPetMouseDownEvent(undefined)
  window.removeEventListener("mouseup", petClickedUp);

  setDurShutdown(true)
  switch (curState.value) {
    case 'Normal': {
      await petAnimation('/vup/Shutdown/Normal/' + randomInt(1, 3), false)
      break
    }
    case 'Ill': {
      await petAnimation('/vup/Shutdown/Ill', false)
      break
    }
    case 'Happy': {
      await petAnimation('/vup/Shutdown/Happy', false)
      break
    }
    case 'PoorCondition': {
      await petAnimation('/vup/Shutdown/PoorCondition', false)
      break
    }
    default: {
      setCurState('Normal')
      break
    }
  }
  setDurShutdown(false)
  setPetBackLayStyle({...petBackLayStyle, display: 'none'})
}*/

export async function researchToggle() {
  if (!isLaunched.value) return
  if (isResearch.value && curAnimation.value === 'Research') {
    setIsResearch(false)
    return
  }
  setCurAnimation('Research')
  setIsResearch(true)
  await petAnimation('/vup/WORK/Research/' + curState.value + '/A', false)
  while (isResearch.value) {
    switch (curState.value) {
      case 'Ill':
      case 'PoorCondition': {
        await petAnimation('/vup/WORK/Research/PoorCondition/B_' + randomInt(1, 3), false)
        break
      }
      case 'Happy': {
        await petAnimation('/vup/WORK/Research/Happy/B_' + randomInt(1, 4), false)
        break
      }
      case 'Normal': {
        await petAnimation('/vup/WORK/Research/Normal/B_' + randomInt(1, 3), false)
        break
      }
    }
  }
  await petAnimation('/vup/WORK/Research/' + curState.value + '/C', false)
  setCurAnimation('Default')
}

export async function petMove(targetX: number, targetY: number) {
  if (!isLaunched.value) return
  setDurSwitch(true)
  if (Math.random() < 0.5) {
    await goToX(targetX, petLeftMargin.value + imgSize.value / 2, petTopMargin.value + imgSize.value / 2)
    await goToY(targetY, targetX, petLeftMargin.value + imgSize.value / 2, petTopMargin.value + imgSize.value / 2)
  } else {
    await goToY(targetY, targetX, petLeftMargin.value + imgSize.value / 2, petTopMargin.value + imgSize.value / 2)
    await goToX(targetX, petLeftMargin.value + imgSize.value / 2, petTopMargin.value + imgSize.value / 2)
  }
  setDurSwitch(false)
}

async function goToX(targetX: number | undefined, startX: number, startY: number) {
  if (targetX === undefined) return
  const windowHeight = window.innerHeight
  if (windowHeight) {
    setDurSwitch(true)
    if ((petTopMargin.value + imgSize.value / 2) / windowHeight < 0.2) {
      if (targetX < startX) {
        await petAnimation('/vup/MOVE/climb.top.left/A_' + curState.value, false)
        await petMovementAnimation_B('/vup/MOVE/climb.top.left/B_' + curState.value, speedSlow, 'L', targetX, startX, startY, false)
        await petAnimation('/vup/MOVE/climb.top.left/C_' + curState.value, false)
      } else {
        await petAnimation('/vup/MOVE/climb.top.right/A_' + curState.value, false)
        await petMovementAnimation_B('/vup/MOVE/climb.top.right/B_' + curState.value, speedSlow, 'R', targetX, startX, startY, false)
        await petAnimation('/vup/MOVE/climb.top.right/C_' + curState.value, false)
      }
    } else {
      if (targetX < startX) {
        if (Math.random() < 1 / 3) {
          await petAnimation('/vup/MOVE/crawl.left/A_' + curState.value, false)
          await petMovementAnimation_B('/vup/MOVE/crawl.left/B_' + curState.value, speedSlow, 'L', targetX, startX, startY, false)
          await petAnimation('/vup/MOVE/crawl.left/C_' + curState.value, false)
        } else if (curState.value !== 'Happy') {
          await petAnimation('/vup/MOVE/walk.left/A_Normal', false)
          await petMovementAnimation_B('/vup/MOVE/walk.left/B_Normal', speedNormal, 'L', targetX, startX, startY, false)
          await petAnimation('/vup/MOVE/walk.left/C_Normal', false)
        } else {
          await petAnimation('/vup/MOVE/walk.left.faster/A_Happy', false)
          await petMovementAnimation_B('/vup/MOVE/walk.left.faster/B_Happy', speedFast, 'L', targetX, startX, startY, false)
          await petAnimation('/vup/MOVE/walk.left.faster/C_Happy', false)
        }
      } else {
        if (Math.random() < 1 / 4) {
          await petAnimation('/vup/MOVE/crawl.right/A_' + curState.value, false)
          await petMovementAnimation_B('/vup/MOVE/crawl.right/B_' + curState.value, speedSlow, 'R', targetX, startX, startY, false)
          await petAnimation('/vup/MOVE/crawl.right/C_' + curState.value, false)
        } else if (curState.value === 'Normal') {
          await petAnimation('/vup/MOVE/walk.right/A_Normal', false)
          await petMovementAnimation_B('/vup/MOVE/walk.right/B_Normal', speedNormal, 'R', targetX, startX, startY, false)
          await petAnimation('/vup/MOVE/walk.right/C_Normal', false)
        } else if (curState.value === 'Happy') {
          await petAnimation('/vup/MOVE/walk.right.faster/A_Happy', false)
          await petMovementAnimation_B('/vup/MOVE/walk.right.faster/B_Happy', speedFast, 'R', targetX, startX, startY, false)
          await petAnimation('/vup/MOVE/walk.right.faster/C_Happy', false)
        } else {
          await petAnimation('/vup/MOVE/walk.right.slow/A_PoorCondition', false)
          await petMovementAnimation_B('/vup/MOVE/walk.right.slow/B_PoorCondition', speedSlow, 'R', targetX, startX, startY, false)
          await petAnimation('/vup/MOVE/walk.right.slow/C_PoorCondition', false)
        }
      }
    }
    setDurSwitch(false)
  }
}

async function goToY(targetY: number | undefined, targetX: number | undefined, startX: number, startY: number) {
  if (targetY === undefined) return
  if (targetX === undefined) return
  setDurSwitch(true)
  if (targetY < startY) {
    if (startX < targetX) {
      if (curState.value !== 'PoorCondition') {
        await petAnimation('/vup/MOVE/climb.left/A_' + curState.value, false)
        await petMovementAnimation_B('/vup/MOVE/climb.left/B_' + curState.value, speedSlow, 'U', targetY, startX, startY, false)
        //await petAnimation(baseLocalUrl.value+'/vup/MOVE/climb.left/C_'+curState.value, false)
      } else {
        if (Math.random() < 0.5) {
          await petAnimation('/vup/MOVE/climb.left/PoorCondition/A_1', false)
          await petMovementAnimation_B('/vup/MOVE/climb.left/PoorCondition/B_1', speedSlow, 'U', targetY, startX, startY, false)
          await petAnimation('/vup/MOVE/climb.left/PoorCondition/C_1', false)
        } else {
          await petAnimation('/vup/MOVE/climb.left/PoorCondition/A_2', false)
          await petMovementAnimation_B('/vup/MOVE/climb.left/PoorCondition/B_2', speedSlow, 'U', targetY, startX, startY, false)
          await petAnimation('/vup/MOVE/climb.left/PoorCondition/C_2', false)
        }
      }
    } else {
      await petAnimation('/vup/MOVE/climb.right/A_' + curState.value, false)
      await petMovementAnimation_B('/vup/MOVE/climb.right/B_' + curState.value, speedSlow, 'U', targetY, startX, startY, false)
      if (curState.value === 'PoorCondition')
        await petAnimation('/vup/MOVE/climb.right/C_' + curState.value, false)
    }
  } else {
    if (startX < targetX) {
      await petAnimation('/vup/MOVE/fall.left/A_' + curState.value, false)
      await petMovementAnimation_B('/vup/MOVE/fall.left/B_' + curState.value, speedFalling, 'D', targetY, startX, startY, false)
      await petAnimation('/vup/MOVE/fall.left/C_' + curState.value, false)
    } else {
      await petAnimation('/vup/MOVE/fall.right/A_' + curState.value, false)
      await petMovementAnimation_B('/vup/MOVE/fall.right/B_' + curState.value, speedFalling, 'D', targetY, startX, startY, false)
      await petAnimation('/vup/MOVE/fall.right/C_' + curState.value, false)
    }
  }
  setDurSwitch(false)
}

export async function studyToggle() {
  if (!isLaunched.value) return
  if (getFlagsAnd(isStudy.value)) return
  if (isStudy.value && curAnimation.value === 'Study') {
    setIsStudy(false)
    return
  }
  setCurAnimation('Study')
  setIsStudy(true)
  await petAnimation('/vup/WORK/Study/A_Normal', false)
  while (isStudy.value) {
    await petAnimation('/vup/WORK/Study/B_' + randomInt(1, 4) + '_Normal', false)
  }
  await petAnimation('/vup/WORK/Study/C_Normal', false)
  setCurAnimation('Default')
}

export async function liveToggle() {
  if (!isLaunched.value) return
  if (getFlagsAnd(isLive.value)) return
  if (isLive.value && curAnimation.value === 'Live') {
    setIsLive(false)
    return
  }
  setCurAnimation('Live')
  setIsLive(true)
  await petAnimation('/vup/WORK/Live/A_Normal', false)
  while (isLive.value) {
    await petAnimation('/vup/WORK/Live/B_' + randomInt(1, 4) + '_Normal', false)
  }
  await petAnimation('/vup/WORK/Live/C_Normal', false)
  setCurAnimation('Default')
}

export async function copyToggle() {
  if (!isLaunched.value) return
  if (getFlagsAnd(isCopy.value)) return
  if (isCopy.value && curAnimation.value === 'Copy') {
    setIsCopy(false)
    return
  }
  setCurAnimation('Copy')
  setIsCopy(true)
  await petAnimation('/vup/WORK/Copy/A_Normal', false)
  while (isCopy.value) {
    await petAnimation('/vup/WORK/Copy/B_' + randomInt(1, 3) + '_Normal', false)
  }
  await petAnimation('/vup/WORK/Copy/C_Normal', false)
  setCurAnimation('Default')
}

export async function workCleanToggle() {
  if (!isLaunched.value) return
  if (getFlagsAnd(isWorkClean.value)) return
  if (isWorkClean.value && curAnimation.value === 'WorkClean') {
    setIsWorkClean(false)
    return
  }
  setCurAnimation('WorkClean')
  setIsWorkClean(true)
  await petAnimation('/vup/WORK/WorkClean/' + curState.value + '/A', false)
  while (isWorkClean.value) {
    switch (curState.value) {
      case 'Ill':
      case 'PoorCondition': {
        await petAnimation('/vup/WORK/WorkClean/PoorCondition/B_' + randomInt(1, 6), false)
        break
      }
      case 'Happy': {
        await petAnimation('/vup/WORK/WorkClean/Happy/B_' + Math.round(Math.random() * 7 + 0.5), false)
        break
      }
      case 'Normal': {
        await petAnimation('/vup/WORK/WorkClean/Normal/B_' + Math.round(Math.random() * 7 + 0.5), false)
        break
      }
    }
  }
  await petAnimation('/vup/WORK/WorkClean/' + curState.value + '/C', false)
  setCurAnimation('Default')
}

export async function playOneToggle() {
  if (!isLaunched.value) return
  if (getFlagsAnd(isPlayOne.value)) return
  if (isPlayOne.value && curAnimation.value === 'PlayONE') {
    setIsPlayOne(false)
    return
  }
  setCurAnimation('PlayONE')
  setIsPlayOne(true)
  await petAnimation('/vup/WORK/PlayONE/' + curState.value + '/A', false)
  while (isPlayOne.value) {
    await petAnimation('/vup/WORK/PlayONE/' + curState.value + '/B', false)
  }
  await petAnimation('/vup/WORK/PlayONE/' + curState.value + '/C', false)
  setCurAnimation('Default')
}

export async function sleepToggle() {
  if (!isLaunched.value) return
  if (getFlagsAnd(isSleep.value)) return
  if (isSleep.value && curAnimation.value === 'Sleep') {
    setIsSleep(false)
    return
  }
  setCurAnimation('Sleep')
  setIsSleep(true)
  await petAnimation('/vup/Sleep/A_' + curState.value, false)
  while (isSleep.value) {
    await petAnimation('/vup/Sleep/B_' + curState.value, false)
  }
  await petAnimation('/vup/Sleep/C_' + curState.value, false)
  setCurAnimation('Default')
}

export async function removeObjectToggle() {
  if (!isLaunched.value) return
  if (getFlagsAnd(isRemoveObject.value)) return
  if (isRemoveObject.value && curAnimation.value === 'RemoveObject') {
    setIsRemoveObject(false)
    return
  }
  setCurAnimation('RemoveObject')
  setIsRemoveObject(true)
  await petAnimation('/vup/WORK/RemoveObject/' + curState.value + '/A', false)
  while (isRemoveObject.value) {
    switch (curState.value) {
      case 'Ill':
      case 'PoorCondition': {
        await petAnimation('/vup/WORK/RemoveObject/PoorCondition/B_' + randomInt(1, 3), false)
        break
      }
      case 'Happy': {
        await petAnimation('/vup/WORK/RemoveObject/Happy/B', false)
        break
      }
      case 'Normal': {
        await petAnimation('/vup/WORK/RemoveObject/Normal/B', false)
        break
      }
    }
  }
  await petAnimation('/vup/WORK/RemoveObject/' + curState.value + '/C', false)
  setCurAnimation('Default')
}

export async function danceToggle() {
  if (!isLaunched.value) return
  if (getFlagsAnd(isDance.value)) return
  if (isDance.value && curAnimation.value === 'Dance') {
    setIsDance(false)
    return
  }
  setCurAnimation('Dance')
  setIsDance(true)
  if (curState.value === 'Ill') {
    await petAnimation('/vup/Music/A/PoorCondition', false)
  } else {
    await petAnimation('/vup/Music/A/' + curState.value, false)
  }
  let rand: number = randomInt(1, 3)
  while (isDance.value) {
    if (curState.value === 'Happy') {
      rand = randomInt(1, 5)
      if (rand === 5) {
        await petAnimation('/vup/Music/Single/Happy', false)
      } else {
        await petAnimation('/vup/Music/B/Happy_' + rand, false)
      }
    } else {
      rand = randomInt(1, 6)
      if (rand === 6) {
        await petAnimation('/vup/Music/Single/Normal', false)
      } else {
        await petAnimation('/vup/Music/B/Normal_' + rand, false)
      }
    }
  }
  if (rand === 2 || rand === 1) {
    if (curState.value === 'Happy') {
      await petAnimation('/vup/Music/C/Happy_' + rand, false)
    } else {
      await petAnimation('/vup/Music/C/Normal_' + rand, false)
    }
  }
  setCurAnimation('Default')
}

/*
 * getFlagsAnd: 为了保证在已存在用户操作的持续状态时只能进行一个
 * @curTry: 当前要执行的状态
 */
export function getFlagsAnd(curTry: boolean) {
  return !curTry && (isStudy.value || isCopy.value || isLive.value || isSleep.value || isDance.value || isResearch.value || isPlayOne.value || isWorkClean.value || isRemoveObject.value)
}
