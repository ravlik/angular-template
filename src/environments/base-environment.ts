const BASE_ENVIRONMENT = {
    // for prerender
    host: 'http://localhost:4000',
    root: 'need override environment',
    useMocks: true,
    credentials: {
        username: '',
        password: '',
    },
};

export const BASE_DEBUG_ENVIRONMENT = {
    ...BASE_ENVIRONMENT,
    production: false,
};

export const BASE_PROD_ENVIRONMENT = {
    ...BASE_ENVIRONMENT,
    credentials: {
        username: '',
        password: '',
    },
    production: true,
};

export const SERVER_ENVIRONMENT = {
    root: './dist/',
    isServer: true,
};

export const BROWSER_ENVIRONMENT = {
    root: './',
    isServer: false,
};
