import {durSwitch, isLaunched, setDurSwitch} from "@/components/Entity/petStateProperty";
import {
  curState,
  petEndu,
  petExp, petHealth,
  petHunger,
  petMoney,
  petMood,
  petThirsty, petWorkPerformance, setPetEndu, setPetExp, setPetHealth, setPetHunger,
  setPetMoney, setPetMood, setPetThirsty, setPetWorkPerformance
} from "@/components/Entity/petProperty";
import {petAnimation, petAnimation3layers} from "@/components/PetBehaviors/petAnimationUtils";
import {animationGap} from "@/components/Entity/petConstants";
import {randomInt} from "@/components/Utils/utils";

export async function buyDrink(drinkInfo: API.Drink) {
  if (!isLaunched || !drinkInfo.drinkPrice || petMoney < drinkInfo.drinkPrice || durSwitch) return
  setDurSwitch(true)
  await petAnimation3layers('/vup/Drink/' + curState, '/drink/' + drinkInfo.drinkPicPath, curState === 'Ill' ? 4 : 9, curState === 'Ill' ? 1 : 0, false)
  setPetMoney(petMoney - drinkInfo.drinkPrice)
  setPetEndu(petEndu + (drinkInfo.drinkEndu || 0))
  setPetExp(petExp + (drinkInfo.drinkExp || 0))
  setPetHunger(petHunger + (drinkInfo.drinkHunger || 0))
  setPetThirsty(petThirsty + (drinkInfo.drinkThirsty || 0))
  setPetMood(petMood + (drinkInfo.drinkMood || 0))
  setPetHealth(petHealth + (drinkInfo.drinkHealth || 0))

  setDurSwitch(false)
}

export async function buyFood(foodInfo: API.Food) {
  if (!isLaunched || !foodInfo.foodPrice || petMoney < foodInfo.foodPrice || durSwitch) return
  setDurSwitch(true)
  switch (curState) {
    case 'Ill' : {
      await petAnimation3layers('/vup/Eat/Ill', '/food/' + foodInfo.foodPicPath, 5, 2, false)
      break
    }
    default: {
      if (Math.random() < 1 / 2) {
        await petAnimation3layers('/vup/Eat/Normal_1', '/food/' + foodInfo.foodPicPath, 4, 3, false)
      } else {
        await petAnimation3layers('/vup/Eat/Normal_2', '/food/' + foodInfo.foodPicPath, 4, 4, false)
      }
      break
    }
  }
  setPetMoney(petMoney - foodInfo.foodPrice)
  setPetEndu(petEndu + (foodInfo.foodEndu || 0))
  setPetExp(petExp + (foodInfo.foodExp || 0))
  setPetHunger(petHunger + (foodInfo.foodHunger || 0))
  setPetThirsty(petThirsty + (foodInfo.foodThirsty || 0))
  setPetMood(petMood + (foodInfo.foodMood || 0))
  setPetHealth(petHealth + (foodInfo.foodHealth || 0))

  setDurSwitch(false)
}

export async function buyMedicine(medicineInfo: API.Medicine) {
  if (!isLaunched || curState !== 'Ill' || !medicineInfo.medicinePrice || petMoney < medicineInfo.medicinePrice || durSwitch) return
  setDurSwitch(true)
  switch (curState) {
    case 'Ill' : {
      await petAnimation3layers('/vup/Eat/Ill', '/medicine/' + medicineInfo.medicinePicPath, 5, 2, false)
      break
    }
    default: {
      if (Math.random() < 1 / 2) {
        await petAnimation3layers('/vup/Eat/Normal_1', '/medicine/' + medicineInfo.medicinePicPath, 4, 3, false)
      } else {
        await petAnimation3layers('/vup/Eat/Normal_2', '/medicine/' + medicineInfo.medicinePicPath, 4, 4, false)
      }
      break
    }
  }
  setPetMoney(petMoney - medicineInfo.medicinePrice)
  setPetEndu(petEndu + (medicineInfo.medicineEndu || 0))
  setPetExp(petExp + (medicineInfo.medicineExp || 0))
  setPetMood(petMood + (medicineInfo.medicineMood || 0))
  setPetHealth(petHealth + (medicineInfo.medicineHealth || 0))

  setDurSwitch(false)
}

export async function buyPresent(presentInfo: API.Present) {
  if (!isLaunched || !presentInfo.presentPrice || petMoney < presentInfo.presentPrice || durSwitch) return
  setDurSwitch(true)
  let startIndex = -1
  let transformIndex = -1
  switch (curState) {
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
  await petAnimation3layers('/vup/Gift/' + curState, '/present/' + presentInfo.presentPicPath, startIndex, transformIndex, false)

  setPetMoney(petMoney - presentInfo.presentPrice)
  setPetExp(petExp + (presentInfo.presentExp || 0))
  setPetMood(petMood + (presentInfo.presentMood || 0))
  setPetWorkPerformance(petWorkPerformance + (presentInfo.presentPerformance || 0))

  setDurSwitch(false)
}

export async function chatSpeak(duration: number) {
  setDurSwitch(true)
  let curTimeLine = 0
  switch (curState) {
    case 'Ill':
    case 'PoorCondition': {
      await petAnimation('/vup/Say/Serious/A', false)
      while (curTimeLine < duration) {
        await petAnimation('/vup/Say/Serious/B', false)
        curTimeLine += 4 * animationGap
      }
      await petAnimation('/vup/Say/Serious/C', false)
      break
    }
    case 'Happy': {
      await petAnimation('/vup/Say/Shining/A', false)
      let rand = 1
      while (curTimeLine < duration) {
        rand = randomInt(1, 3)
        await petAnimation('/vup/Say/Shining/B_' + rand, false)
        curTimeLine += (rand === 1 ? 6 : 7) * animationGap
      }
      await petAnimation('/vup/Say/Shining/C', false)
      break
    }
    default: {
      await petAnimation('/vup/Say/Self/A', false)
      let rand = 1
      while (curTimeLine < duration) {
        rand = randomInt(1, 3)
        await petAnimation('/vup/Say/Self/B_' + rand, false)
        curTimeLine += (rand === 3 ? 14 : 15) * animationGap
      }
      await petAnimation('/vup/Say/Self/C', false)
      break
    }
  }
  setDurSwitch(false)
}
