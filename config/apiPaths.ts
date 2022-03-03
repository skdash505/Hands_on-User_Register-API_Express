
export function apiPaths() {
    return {
        _base: "/devApi",
        user: "/user",
        session: "/session",
        swaggerUI: "/swaggerUi",
        // swaggerUI: "/swagger-ui",

        register: "/register",
        controllers: "/controller",
        controllers_id: "/controller/:id",
        
        healthcheck: "/healthcheck",
        demo: "/demo",
        
    }
};