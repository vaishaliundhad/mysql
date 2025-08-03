    import { authRouter } from "../shared/auth/router/auth.router.js";
    import { healthRoutes } from "./health-routes.js";

    // export default function registerRoutes(app) {
    // useHealthRoutes(app);
    // app.use("/auth", authRouter);
    // }

    export default function useRoutes(app){
        useHealthRoutes(app);
        app.use("/auth", authRouter);
    }

    function useHealthRoutes(app) {
    app.use("", healthRoutes.health());
    app.use("", healthRoutes.env());
    app.use("", healthRoutes.instance());
    }
