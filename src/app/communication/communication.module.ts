import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { UsersProvider } from './services/common';
import { environment } from 'environment';
import { FakeUsersProvider } from './services/fake/fake-users.provider';
import { HttpUsersProvider } from './services/http/http-users.provider';
import { CommunicationConfig } from './communication.config';

@NgModule({})
export class CommunicationModule {
    static forRoot(communicationConfigToken: Provider): ModuleWithProviders {
        return {
            ngModule: CommunicationModule,
            providers: [
                {
                    provide: CommunicationConfig,
                    useExisting: communicationConfigToken,
                },
                registerService(UsersProvider, FakeUsersProvider, HttpUsersProvider)
                // {
                //     provide: UsersProvider,
                //     useClass: FakeUsersProvider,
                // }
            ],
        };
    }
}

export function registerService(provide, mockedService, realService) {
    return {
        provide,
        useClass: environment.useMocks ? mockedService : realService,
    };
}
