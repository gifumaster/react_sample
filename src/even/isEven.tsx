import {useEvenStatus} from "./evenStatus";

export function EvenStatus(id: number) {
    const isSubscribe = useEvenStatus(id);

    return (
        <li style={{ color: isSubscribe ? 'green' : 'black' }}>
            ID : { id } is { isSubscribe ? '' : 'not' } Even!
        </li>
    );
}