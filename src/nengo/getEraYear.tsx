import {useCalculateEraYear} from "./calculateEraYear";

export function getEraYear(year: number) {
    const eraYear = useCalculateEraYear(year);

    return (
        <li>
            { eraYear.name } { eraYear.year}
        </li>
    );
}