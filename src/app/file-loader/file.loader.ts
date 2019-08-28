import { Observable } from 'rxjs';

export abstract class FileLoader {
    abstract loadFile(path: string): Observable<Object>;
}
