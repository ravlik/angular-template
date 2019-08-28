import { environment } from 'environment';

export function getPath(...args: string[]) {
    return `${environment.root}${args.join('/')}`;
}
