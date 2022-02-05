import React, { useState, useEffect } from 'react';
import {httpClient} from "../httpClient/httpClient";

export function useCalculateEraYear(targetYear: number) : EraYear {
    const [eraYear, setEraYear] = useState<EraYear>({
        name : null,
        year : null,
    });

    function handleStatusChange(eraYear: EraYear) {
        setEraYear(eraYear);
    }

    useEffect(() => {

        const execAPI = async () => {
            return await httpClient.get('https://gengoh.jp/api/?api_key=5olMN1cWPLIFtdWnsogHzwX3KBZ3rjfj&bgn=1868-01-01&format=1&sort=1',{});
        }
        execAPI().then(r => {
            console.log(r.data);

            //APIを叩いた結果を挿入（APIが死んでいたので今回は放置）
            let apiResult : EraYear = {
                name : 'Heisei',
                year : targetYear,
            }
            handleStatusChange(apiResult);
        });

    },[targetYear]);

    return eraYear;
}

interface EraYear{
    name : string | null;
    year : number | null;
}
