import React, { useState, useEffect } from 'react';

export function useEvenStatus(targetNumber: number) : boolean {
    const [isEven, setIsEven] = useState<boolean>(false);

    function handleStatusChange(status: evenStatus) {
        setIsEven(status.isEven);
    }

    useEffect(() => {
        //今回は偶奇判定
        //なにかしらのAPIで結果をとってくるものと想定。
        let apiResult : evenStatus = {
            isEven : targetNumber % 2 == 0,
        }
        handleStatusChange(apiResult);
    });

    return isEven;
}

interface evenStatus {
    isEven : boolean;
}