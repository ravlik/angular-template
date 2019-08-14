import { ModuleWithProviders, NgModule } from '@angular/core';
import { UsersProvider } from './services/common/users.provider';
import { FakeUsersProvider } from './services/fake/fake-users.provider';
import { environment } from '../../environments/environment';
import { HttpUsersProvider } from './services/http/http-users.provider';

@NgModule({})
export class CommunicationModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CommunicationModule,
            providers: [
                registerService(UsersProvider, FakeUsersProvider, HttpUsersProvider),
            ],
        };
    }
}


function registerService(provide, mockedService, realService) {
    return {
        provide,
        useClass: environment.useMocks ? mockedService : realService,
    };
}
