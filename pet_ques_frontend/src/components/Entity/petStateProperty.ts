import React, {MouseEventHandler, ReactEventHandler, useState} from "react";

export const [imgSize, setImgSize] = useState(200)
export const [animationTimestamp, setAnimationTimestamp] = useState(0)
export const [responseSwitch, setResponseSwitch] = useState(false)
export const [responseShow, setResponseShow] = useState('')
export const [enableRandMov, setEnableRandMov] = useState(true)
export const [workPerformance, setWorkPerformance] = useState(1)
export const [durSwitch, setDurSwitch] = useState(false)
export const [isDragged, setIsDragged] = useState(false)
export const [durDebug, setDurDebug] = useState(false)
export const [preLaunched, setPreLaunched] = useState(false)
export const [boringAnimationFlag, setBoringAnimationFlag] = useState(false)
export const [recoverAnimationFlag, setRecoverAnimationFlag] = useState(false)
export const [illAnimationFlag, setIllAnimationFlag] = useState(false)
export const [hungryAnimationFlag, setHungryAnimationFlag] = useState(false)
export const [thirstyAnimationFlag, setThirstyAnimationFlag] = useState(false)

export const [isLaunched, setIsLaunched] = useState(false)

export const [durShutdown, setDurShutdown] = useState(false)

export const [isStudy, setIsStudy] = useState(false)
export const [isCopy, setIsCopy] = useState(false)
export const [isLive, setIsLive] = useState(false)
export const [isSleep, setIsSleep] = useState(false)
export const [isDance, setIsDance] = useState(false)
export const [isResearch, setIsResearch] = useState(false)
export const [isPlayOne, setIsPlayOne] = useState(false)
export const [isWorkClean, setIsWorkClean] = useState(false)
export const [isRemoveObject, setIsRemoveObject] = useState(false)


export const [petBackLayImgUrl, setPetBackLayImgUrl] = useState("string");
export const [petItemLayImgUrl, setPetItemLayImgUrl] = useState("string");
export const [petFrontLayImgUrl, setPetFrontLayImgUrl] = useState("string");

export const [petBackLayStyle, setPetBackLayStyle] = useState<React.CSSProperties>({
  position: 'absolute'
});
export const [petItemLayStyle, setPetItemLayStyle] = useState<React.CSSProperties>({
  position: 'absolute'
});
export const [petFrontLayStyle, setPetFrontLayStyle] = useState<React.CSSProperties>({
  position: 'absolute'
});

// 当前人物位置
export const [petLeftMargin, setPetLeftMargin] = useState<number>(0);
export const [petTopMargin, setPetTopMargin] = useState<number>(0);

export const [petMouseDownEvent, setPetMouseDownEvent] = useState<MouseEventHandler<HTMLImageElement>>();
export const [petMouseMoveEvent, setPetMouseMoveEvent] = useState<MouseEventHandler<HTMLImageElement>>();
