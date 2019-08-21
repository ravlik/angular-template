import { Observable } from 'rxjs';

export abstract class TranslateFileLoader {
    abstract getTranslation(lang: string, module: string): Observable<Object>;
}
