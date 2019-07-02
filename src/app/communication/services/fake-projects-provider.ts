import { FakeProvider } from './fake.provider';
import { Injectable } from '@angular/core';
import { IProject } from '../models/project';
import { FakeIssuesProvider } from './fake-issues-provider';
import { IssuesProvider } from './issues-provider';

@Injectable({ providedIn: 'root' })
export class FakeProjectsProvider extends FakeProvider<IProject> {
    protected _delay = 500;

    constructor(private issuesProvider: IssuesProvider) {
        super();

        for (let i = 1; i <= 100; i++) {
            this._store[i] = generateProject(i, issuesProvider);
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

function generateProject(id, fakeProjectsProvider: IssuesProvider): IProject {
    return {
        id,
        name: `Project ${NAMES[(10 * Math.random()).toFixed()]} ${id}`,
        issues: fakeProjectsProvider instanceof FakeIssuesProvider ? fakeProjectsProvider.generateIssues(id) : [],
    };
}
