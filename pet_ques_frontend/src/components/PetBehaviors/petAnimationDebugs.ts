import {randomInt} from "@/components/Utils/utils";
import {petAnimation, petAnimation3layers} from "./petAnimationUtils";

export async function click_head_A(inputState: string) {
    switch (inputState) {
        case 'Ill':
        case 'PoorCondition': {
            await petAnimation('vup/Touch_Head/A_Ill', true)
            break
        }
        default: {
            await petAnimation('vup/Touch_Head/A_' + inputState, true)
            break
        }
    }
}

export async function click_head_B(inputState: string) {
    switch (inputState) {
        case 'Ill':
        case 'PoorCondition': {
            await petAnimation('vup/Touch_Head/B_Ill', true)
            break
        }
        default: {
            await petAnimation('vup/Touch_Head/B_' + inputState, true)
            break
        }
    }
}

export async function click_head_C(inputState: string) {
    switch (inputState) {
        case 'Ill':
        case 'PoorCondition': {
            await petAnimation('vup/Touch_Head/C_Ill', true)
            break
        }
        default: {
            await petAnimation('vup/Touch_Head/C_' + inputState, true)
            break
        }
    }
}

export async function click_body_A(inputState: string) {
    switch (inputState) {
        case 'Ill':
        case 'PoorCondition': {
            await petAnimation('vup/Touch_Body/A_Ill', true)
            break
        }
        default: {
            let rand = randomInt(1, 3)
            await petAnimation('vup/Touch_Body/A_Happy/tb' + rand, true)
            break
        }
    }
}

export async function click_body_B(inputState: string) {
    switch (inputState) {
        case 'Ill':
        case 'PoorCondition': {
            await petAnimation('vup/Touch_Body/B_Ill', true)
            break
        }
        default: {
            let rand = randomInt(1, 3)
            await petAnimation('vup/Touch_Body/B_Happy/tb' + rand, true)
            break
        }
    }
}

export async function click_body_C(inputState: string) {
    switch (inputState) {
        case 'Ill':
        case 'PoorCondition': {
            await petAnimation('vup/Touch_Body/C_Ill', true)
            break
        }
        default: {
            let rand = randomInt(1, 3)
            await petAnimation('vup/Touch_Body/C_Happy/tb' + rand, true)
            break
        }
    }
}

export async function raise_A(inputState: string) {
    await petAnimation('vup/Raise/Raised_Static/A_' + inputState, true)
}

export async function raise_B(inputState: string) {
    if (inputState !== 'Normal') {
        await petAnimation('vup/Raised_Static/Raised_Dynamic/' + inputState, true)
    } else {
        await petAnimation('vup/Raised_Static/Raised_Dynamic/Normal/' + randomInt(1, 3), true)
    }
}

export async function raise_C(inputState: string) {
    await petAnimation('vup/Raise/Raised_Static/C_' + inputState, true)
}

export async function ill_begin(inputState: string) {
    if (inputState === 'Ill') {
        await petAnimation('vup/Switch/Down/PoorCondition', true)
    } else {
        await petAnimation('vup/Switch/Down/' + inputState, true)
    }
}

export async function hungry_begin(inputState: string) {
    if (inputState === 'Ill') {
        await petAnimation('vup/Switch/Hunger/PoorCondition', true)
    } else {
        await petAnimation('vup/Switch/Hunger/' + inputState, true)
    }
}

export async function thirsty_begin(inputState: string) {
    await petAnimation('vup/Switch/Thirsty', true)
}

export async function boring_A(inputState: string) {
    await petAnimation('vup/IDEL/Boring/A_Normal', true)
}

export async function boring_B(inputState: string) {
    await petAnimation('vup/IDEL/Boring/B_Normal', true)
}

export async function boring_C(inputState: string) {
    await petAnimation('vup/IDEL/Boring/C_Normal', true)
}

export async function squat_A(inputState: string) {
    if (inputState === 'Ill' || inputState === 'PoorCondition') {
        await petAnimation('vup/IDEL/Squat/A_PoorCondition', true)
    } else {
        await petAnimation('vup/IDEL/Squat/A_Normal', true)
    }
}

export async function squat_B(inputState: string) {
    if (inputState === 'Ill' || inputState === 'PoorCondition') {
        await petAnimation('vup/IDEL/Squat/B_PoorCondition/' + randomInt(1, 3), true)
    } else {
        await petAnimation('vup/IDEL/Squat/B_Normal/' + randomInt(1, 4), true)
    }
}

export async function squat_C(inputState: string) {
    if (inputState === 'Ill' || inputState === 'PoorCondition') {
        await petAnimation('vup/IDEL/Squat/C_PoorCondition', true)
    } else {
        await petAnimation('vup/IDEL/Squat/C_Normal', true)
    }
}

export async function stateONE_A(inputState: string) {
    if (inputState === 'Ill' || inputState === 'PoorCondition') {
        await petAnimation('vup/State/StateONE/A_PoorCondition', true)
    } else {
        await petAnimation('vup/State/StateONE/A_' + inputState, true)
    }
}

export async function stateONE_B(inputState: string) {
    if (inputState === 'Ill' || inputState === 'PoorCondition') {
        await petAnimation('vup/State/StateONE/B_PoorCondition', true)
    } else {
        await petAnimation('vup/State/StateONE/B_' + inputState + '/' + randomInt(1, 3), true)
    }
}

export async function stateONE_C(inputState: string) {
    if (inputState === 'Ill' || inputState === 'PoorCondition') {
        await petAnimation('vup/State/StateONE/C_PoorCondition', true)
    } else {
        await petAnimation('vup/State/StateONE/C_' + inputState, true)
    }
}

export async function stateTWO_A(inputState: string) {
    if (inputState === 'Ill' || inputState === 'PoorCondition') {
        await petAnimation('vup/State/StateTWO/A_PoorCondition', true)
    } else {
        await petAnimation('vup/State/StateTWO/A_Normal', true)
    }
}

export async function stateTWO_B(inputState: string) {
    if (inputState === 'Ill' || inputState === 'PoorCondition') {
        await petAnimation('vup/State/StateTWO/B_PoorCondition', true)
    } else {
        await petAnimation('vup/State/StateTWO/B_Normal', true)
    }
}

export async function stateTWO_C(inputState: string) {
    if (inputState === 'Ill' || inputState === 'PoorCondition') {
        await petAnimation('vup/State/StateTWO/C_PoorCondition', true)
    } else {
        await petAnimation('vup/State/StateTWO/C_Normal', true)
    }
}

export async function default_animation(inputState: string) {
    switch (inputState) {
        case 'Normal': {
            await petAnimation('vup/Default/Normal', true)
            break
        }
        case 'Ill': {
            await petAnimation('vup/Default/Ill/' + randomInt(1, 3), true)
            break
        }
        case 'Happy': {
            await petAnimation('vup/Default/Happy/' + randomInt(1, 4), true)
            break
        }
        case 'PoorCondition': {
            await petAnimation('vup/Default/PoorCondition/' + randomInt(1, 5), true)
            break
        }
    }
}

export async function start_animation(inputState: string) {
    switch (inputState) {
        case 'Normal': {
            await petAnimation('vup/StartUP/Normal', true)
            break
        }
        case 'Ill': {
            await petAnimation('vup/StartUP/Ill', true)
            break
        }
        case 'Happy': {
            await petAnimation('vup/StartUP/Happy/' + randomInt(1, 3), true)
            break
        }
        case 'PoorCondition': {
            await petAnimation('vup/StartUP/PoorCondition', true)
            break
        }
    }
}

export async function climb_top_left_A(inputState: string) {
    await petAnimation('vup/MOVE/climb.top.left/A_' + inputState, true)
}

export async function climb_top_left_B(inputState: string) {
    await petAnimation('vup/MOVE/climb.top.left/B_' + inputState, true)
}

export async function climb_top_left_C(inputState: string) {
    await petAnimation('vup/MOVE/climb.top.left/C_' + inputState, true)
}

export async function climb_top_right_A(inputState: string) {
    await petAnimation('vup/MOVE/climb.top.right/A_' + inputState, true)
}

export async function climb_top_right_B(inputState: string) {
    await petAnimation('vup/MOVE/climb.top.right/B_' + inputState, true)
}

export async function climb_top_right_C(inputState: string) {
    await petAnimation('vup/MOVE/climb.top.right/C_' + inputState, true)
}

export async function crawl_left_A(inputState: string) {
    await petAnimation('vup/MOVE/crawl.left/A_' + inputState, true)
}

export async function crawl_left_B(inputState: string) {
    await petAnimation('vup/MOVE/crawl.left/B_' + inputState, true)
}

export async function crawl_left_C(inputState: string) {
    await petAnimation('vup/MOVE/crawl.left/C_' + inputState, true)
}

export async function walk_left_A(inputState: string) {
    if (inputState === 'Happy') {
        await petAnimation('vup/MOVE/walk.left.faster/A_Happy', true)
    } else {
        await petAnimation('vup/MOVE/walk.left/A_Normal', true)
    }
}

export async function walk_left_B(inputState: string) {
    if (inputState === 'Happy') {
        await petAnimation('vup/MOVE/walk.left.faster/B_Happy', true)
    } else {
        await petAnimation('vup/MOVE/walk.left/B_Normal', true)
    }
}

export async function walk_left_C(inputState: string) {
    if (inputState === 'Happy') {
        await petAnimation('vup/MOVE/walk.left.faster/C_Happy', true)
    } else {
        await petAnimation('vup/MOVE/walk.left/C_Normal', true)
    }
}

export async function crawl_right_A(inputState: string) {
    await petAnimation('vup/MOVE/crawl.right/A_' + inputState, true)
}

export async function crawl_right_B(inputState: string) {
    await petAnimation('vup/MOVE/crawl.right/B_' + inputState, true)
}

export async function crawl_right_C(inputState: string) {
    await petAnimation('vup/MOVE/crawl.right/C_' + inputState, true)
}

export async function walk_right_A(inputState: string) {
    if (inputState === 'Happy') {
        await petAnimation('vup/MOVE/walk.right.faster/A_Happy', true)
    } else if (inputState === 'PoorCondition') {
        await petAnimation('vup/MOVE/walk.right.slow/A_PoorCondition', true)
    } else {
        await petAnimation('vup/MOVE/walk.right/A_Normal', true)
    }
}

export async function walk_right_B(inputState: string) {
    if (inputState === 'Happy') {
        await petAnimation('vup/MOVE/walk.right.faster/B_Happy', true)
    } else if (inputState === 'PoorCondition') {
        await petAnimation('vup/MOVE/walk.right.slow/B_PoorCondition', true)
    } else {
        await petAnimation('vup/MOVE/walk.right/B_Normal', true)
    }
}

export async function walk_right_C(inputState: string) {
    if (inputState === 'Happy') {
        await petAnimation('vup/MOVE/walk.right.faster/C_Happy', true)
    } else if (inputState === 'PoorCondition') {
        await petAnimation('vup/MOVE/walk.right.slow/C_PoorCondition', true)
    } else {
        await petAnimation('vup/MOVE/walk.right/C_Normal', true)
    }
}

export async function climb_left_A(inputState: string) {
    if (inputState !== 'PoorCondition') {
        await petAnimation('vup/MOVE/climb.left/A_' + inputState, true)
    } else {
        if (Math.random() < 0.5) {
            await petAnimation('vup/MOVE/climb.left/PoorCondition/A_1', true)
        } else {
            await petAnimation('vup/MOVE/climb.left/PoorCondition/A_2', true)
        }
    }
}

export async function climb_left_B(inputState: string) {
    if (inputState !== 'PoorCondition') {
        await petAnimation('vup/MOVE/climb.left/B_' + inputState, true)
    } else {
        if (Math.random() < 0.5) {
            await petAnimation('vup/MOVE/climb.left/PoorCondition/B_1', true)
        } else {
            await petAnimation('vup/MOVE/climb.left/PoorCondition/B_2', true)
        }
    }
}

export async function climb_left_C(inputState: string) {
    if (inputState !== 'PoorCondition') {
        console.log('None')
    } else {
        if (Math.random() < 0.5) {
            await petAnimation('vup/MOVE/climb.left/PoorCondition/C_1', true)
        } else {
            await petAnimation('vup/MOVE/climb.left/PoorCondition/C_2', true)
        }
    }
}

export async function climb_right_A(inputState: string) {
    await petAnimation('vup/MOVE/climb.right/A_' + inputState, true)
}

export async function climb_right_B(inputState: string) {
    await petAnimation('vup/MOVE/climb.right/B_' + inputState, true)
}

export async function climb_right_C(inputState: string) {
    if (inputState === 'PoorCondition')
        await petAnimation('vup/MOVE/climb.right/C_' + inputState, true)
    else
        console.log('None')
}

export async function fall_left_A(inputState: string) {
    await petAnimation('vup/MOVE/fall.left/A_' + inputState, true)
}

export async function fall_left_B(inputState: string) {
    await petAnimation('vup/MOVE/fall.left/B_' + inputState, true)
}

export async function fall_left_C(inputState: string) {
    await petAnimation('vup/MOVE/fall.left/C_' + inputState, true)
}

export async function fall_right_A(inputState: string) {
    await petAnimation('vup/MOVE/fall.right/A_' + inputState, true)
}

export async function fall_right_B(inputState: string) {
    await petAnimation('vup/MOVE/fall.right/B_' + inputState, true)
}

export async function fall_right_C(inputState: string) {
    await petAnimation('vup/MOVE/fall.right/C_' + inputState, true)
}

export async function shutdown_animation(inputState: string) {
    switch (inputState) {
        case 'Normal': {
            await petAnimation('vup/Shutdown/Normal/' + randomInt(1, 3), true)
            break
        }
        case 'Ill': {
            await petAnimation('vup/Shutdown/Ill', true)
            break
        }
        case 'Happy': {
            await petAnimation('vup/Shutdown/Happy', true)
            break
        }
        case 'PoorCondition': {
            await petAnimation('vup/Shutdown/PoorCondition', true)
            break
        }
    }
}

export async function research_A(inputState: string) {
    await petAnimation('vup/WORK/Research/' + inputState + '/A', true)
}

export async function research_B(inputState: string) {
    switch (inputState) {
        case 'Ill':
        case 'PoorCondition': {
            await petAnimation('vup/WORK/Research/PoorCondition/B_' + randomInt(1, 4), true)
            break
        }
        case 'Happy': {
            await petAnimation('vup/WORK/Research/Happy/B_' + randomInt(1, 5), true)
            break
        }
        case 'Normal': {
            await petAnimation('vup/WORK/Research/Normal/B_' + randomInt(1, 3), true)
            break
        }
    }
}

export async function research_C(inputState: string) {
    await petAnimation('vup/WORK/Research/' + inputState + '/C', true)
}

export async function study_A(inputState: string) {
    await petAnimation('vup/WORK/Study/A_Normal', true)
}

export async function study_B(inputState: string) {
    await petAnimation('vup/WORK/Study/B_' + randomInt(1, 5) + '_Normal', true)
}

export async function study_C(inputState: string) {
    await petAnimation('vup/WORK/Study/C_Normal', true)
}

export async function live_A(inputState: string) {
    await petAnimation('vup/WORK/Live/A_Normal', true)
}

export async function live_B(inputState: string) {
    await petAnimation('vup/WORK/Live/B_' + randomInt(1, 5) + '_Normal', true)
}

export async function live_C(inputState: string) {
    await petAnimation('vup/WORK/Live/C_Normal', true)
}

export async function copy_A(inputState: string) {
    await petAnimation('vup/WORK/Copy/A_Normal', true)
}

export async function copy_B(inputState: string) {
    await petAnimation('vup/WORK/Copy/B_' + randomInt(1, 3) + '_Normal', true)
}

export async function copy_C(inputState: string) {
    await petAnimation('vup/WORK/Copy/C_Normal', true)
}

export async function work_clean_A(inputState: string) {
    await petAnimation('vup/WORK/WorkClean/' + inputState + '/A', true)
}

export async function work_clean_B(inputState: string) {
    switch (inputState) {
        case 'Ill':
        case 'PoorCondition': {
            await petAnimation('vup/WORK/WorkClean/PoorCondition/B_' + Math.round(Math.random() * 6 + 0.5), true)
            break
        }
        case 'Happy': {
            await petAnimation('vup/WORK/WorkClean/Happy/B_' + Math.round(Math.random() * 7 + 0.5), true)
            break
        }
        case 'Normal': {
            await petAnimation('vup/WORK/WorkClean/Normal/B_' + Math.round(Math.random() * 7 + 0.5), true)
            break
        }
    }
}

export async function work_clean_C(inputState: string) {
    await petAnimation('vup/WORK/WorkClean/' + inputState + '/C', true)
}

export async function play_one_A(inputState: string) {
    await petAnimation('vup/WORK/PlayONE/' + inputState + '/A', true)
}

export async function play_one_B(inputState: string) {
    await petAnimation('vup/WORK/PlayONE/' + inputState + '/B', true)
}

export async function play_one_C(inputState: string) {
    await petAnimation('vup/WORK/PlayONE/' + inputState + '/C', true)
}

export async function sleep_A(inputState: string) {
    await petAnimation('vup/Sleep/A_' + inputState, true)
}

export async function sleep_B(inputState: string) {
    await petAnimation('vup/Sleep/B_' + inputState, true)
}

export async function sleep_C(inputState: string) {
    await petAnimation('vup/Sleep/C_' + inputState, true)
}

export async function remove_object_A(inputState: string) {
    await petAnimation('vup/WORK/RemoveObject/' + inputState + '/A', true)
}

export async function remove_object_B(inputState: string) {
    switch (inputState) {
        case 'Ill':
        case 'PoorCondition': {
            await petAnimation('vup/WORK/RemoveObject/PoorCondition/B_' + randomInt(1, 3), true)
            break
        }
        case 'Happy': {
            await petAnimation('vup/WORK/RemoveObject/Happy/B', true)
            break
        }
        case 'Normal': {
            await petAnimation('vup/WORK/RemoveObject/Normal/B', true)
            break
        }
    }
}

export async function remove_object_C(inputState: string) {
    await petAnimation('vup/WORK/RemoveObject/' + inputState + '/C', true)
}

export async function dance_A(inputState: string) {
    if (inputState === 'Ill') {
        await petAnimation('vup/Music/A/PoorCondition', true)
    } else {
        await petAnimation('vup/Music/A/' + inputState, true)
    }
}

export async function dance_B(inputState: string) {
    let rand = randomInt(1, 4)
    if (inputState === 'Happy') {
        rand = Math.round(Math.random() * 5 + 0.5)
        if (rand === 5) {
            await petAnimation('vup/Music/Single/Happy', true)
        } else {
            await petAnimation('vup/Music/B/Happy_' + rand, true)
        }
    } else {
        rand = Math.round(Math.random() * 6 + 0.5)
        if (rand === 6) {
            await petAnimation('vup/Music/Single/Normal', true)
        } else {
            await petAnimation('vup/Music/B/Normal_' + rand, true)
        }
    }
}

export async function dance_C(inputState: string) {
    let rand: number = randomInt(1, 3)
    if (inputState === 'Happy') {
        await petAnimation('vup/Music/C/Happy_' + rand, true)
    } else {
        await petAnimation('vup/Music/C/Normal_' + rand, true)
    }
}

export async function eat_animation(inputState: string) {
    switch (inputState) {
        case 'Ill' : {
            await petAnimation3layers('vup/Eat/Ill', '/food/food.png', 5, 2, true)
            break
        }
        default: {
            if (Math.random() < 1 / 2) {
                await petAnimation3layers('vup/Eat/Normal_1', '/food/food.png', 4, 3, true)
            } else {
                await petAnimation3layers('vup/Eat/Normal_2', '/food/food.png', 4, 4, true)
            }
            break
        }
    }
}

export async function drink_animation(inputState: string) {
    await petAnimation3layers('vup/Drink/' + inputState, '/food/food.png', inputState === 'Ill' ? 4 : 9, inputState === 'Ill' ? 1 : 0, true)
}

export async function ill_finish(inputState: string) {
    if (inputState === 'Happy') {
        await petAnimation('vup/Switch/Up/Normal', true)
    } else {
        await petAnimation('vup/Switch/Up/' + inputState, true)
    }
}

export async function say_A(inputState: string) {
    switch (inputState) {
        case 'Ill':
        case 'PoorCondition': {
            await petAnimation('vup/Say/Serious/A', true)
            break
        }
        case 'Happy': {
            await petAnimation('vup/Say/Shining/A', true)
            break
        }
        default: {
            await petAnimation('vup/Say/Self/A', true)
            break
        }
    }
}

export async function say_B(inputState: string) {
    switch (inputState) {
        case 'Ill':
        case 'PoorCondition': {
            await petAnimation('vup/Say/Serious/B', true)
            break
        }
        case 'Happy': {
            await petAnimation('vup/Say/Shining/B_' + randomInt(1, 4), true)
            break
        }
        default: {
            await petAnimation('vup/Say/Self/B_' + randomInt(1, 4), true)
            break
        }
    }
}

export async function say_C(inputState: string) {
    switch (inputState) {
        case 'Ill':
        case 'PoorCondition': {
            await petAnimation('vup/Say/Serious/C', true)
            break
        }
        case 'Happy': {
            await petAnimation('vup/Say/Shining/C', true)
            break
        }
        default: {
            await petAnimation('vup/Say/Self/C', true)
            break
        }
    }
}

export async function gift_animation(inputState: string) {
    let startIndex = -1
    let transformIndex = -1
    switch (inputState) {
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
    await petAnimation3layers('vup/Gift/' + inputState, '/present/超级好的麦克风.png', startIndex, transformIndex, true)
}
