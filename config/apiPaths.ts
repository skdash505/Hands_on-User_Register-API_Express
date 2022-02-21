
export function apiPaths() {
    return {
        demo: "/demo",
        _base: "/userAPi",
        swaggerUI: "/swaggerUi",
        register: "/register",
        controllers: {
            _base: "/controller",
            _withId: "/controller/:id"
        }
    }
};