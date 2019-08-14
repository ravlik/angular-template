const BASE_ENVIRONMENT = {
    // for prerender
    host: 'http://localhost:4000',
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
