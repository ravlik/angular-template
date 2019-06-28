import { FakeProvider } from './fake.provider';
import { Injectable } from '@angular/core';
import { IProject } from '../models/project';
import { FakeIssuesProvider } from './fake-issues-provider';

@Injectable({ providedIn: 'root' })
export class FakeProjectsProvider extends FakeProvider<IProject> {
    protected _delay = 500;

    constructor(private fakeIssuesProvider: FakeIssuesProvider) {
        super();

        for (let i = 1; i <= 100; i++) {
            this._store[i] = generateProject(i, fakeIssuesProvider);
        }
    }
}

const NAMES = [
    'Mike',
    'Rose',
    'Harvy',
    'Tim',
    'Tom',
    'Jeck',
    'Scott',
    'Jessica',
    'Amber',
    'Lorem',
    'Thomas',
];

function generateProject(id, fakeProjectsProvider: FakeIssuesProvider): IProject {
    return {
        id,
        name: `Project ${NAMES[(10 * Math.random()).toFixed()]} ${id}`,
        issues: fakeProjectsProvider.generateIssues(id)
    };
}
