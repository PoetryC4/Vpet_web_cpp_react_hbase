import {imageList} from "@/assets/imageList";

export const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export async function getAllImgsNames(target_folder: string) {
    const sortedFileNames = imageList[target_folder] || []
    sortedFileNames.sort((a, b) => a.localeCompare(b));
    return sortedFileNames
}

export function getCurTime() {
    var now = new Date();
    return now.getTime();
}

export function getBaseLog(x: number, y: number) {
    return Math.log(y) / Math.log(x);
}

export function getBlob(fileUrl: string) {
    console.log(fileUrl)
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', fileUrl, true);
        //监听进度事件
        xhr.addEventListener(
            'progress',
            function (evt) {
                if (evt.lengthComputable) {
                    // let percentComplete = evt.loaded / evt.total;
                    // percentage是当前下载进度，可根据自己的需求自行处理
                    // let percentage = percentComplete * 100;
                }
            },
            false
        );
        xhr.responseType = 'blob';
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            }
        };
        xhr.send();
    });/*
    return fetch(fileUrl)
        .then(response => {
            console.log("测试1" + response)
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.blob();
        });*/
}

export function randomInt(lowerBound: number, upperBound: number) {
    return Math.round(Math.random() * (upperBound - lowerBound) + lowerBound - 0.5)
}

export function getQuadrantOfEight(inputX: number, inputY: number) {
    inputX -= window.innerWidth / 2
    inputY -= window.innerHeight / 2
    if (inputX > 0) {
        if (inputY > 0) {
            if (inputY >= inputX) {
                return 7
            } else {
                return 8
            }
        } else {
            if (inputX + inputY > 0) {
                return 1
            } else {
                return 2
            }
        }
    } else {
        if (inputY > 0) {
            if (inputX + inputY > 0) {
                return 6
            } else {
                return 5
            }
        } else {
            if (inputX < inputY) {
                return 4
            } else {
                return 3
            }
        }
    }
}
