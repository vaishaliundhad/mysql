import compression from 'compression';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';
import express from 'express';
import actuator from 'express-actuator';
import useRoutes from '../routes/routes.js';
import helmet from 'helmet';
import HTTP_STATUS from 'http-status-codes';
import errorHandler from '../libs/core/error/error-handler.js';
import { CustomError } from '../libs/core/error/custom-error.js';
import { config } from '../config/config.js';   



export class ServerSetup {
    constructor(app) {
        this.app = app;
    }
    start() {
        this._configureSecurityMiddleware(this.app);
        this._configureMiddleware(this.app);
        this._configureRoutes(this.app);
        this._configureGlobalErrorHandler(this.app);
       
    }


    _configureSecurityMiddleware(app) {
        app.set('trust proxy', 1);
        app.use(
            cookieSession({
                name: "session",
                keys: [config.SECRET_KEY_ONE, config.SECRET_KEY_TWO],
                maxAge: 24 * 7 * 3600000,
                secure: config.NODE_ENV !== 'development'
            })
        );
        app.use(helmet ());
        app.use(cors({
            origin: '*',
            credentials: true,
            optionsSuccessStatus: 200,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
        }));


    }

    _configureMiddleware(app) {
        app.use(
            compression({
                level: 6,
                threshold: 100 * 1000,
                filter: (req, res) => {
                    if (req.headers['x-no-compression']) return false;
                    return compression.filter(req, res);
                }
            })
        );
        app.use(express.json({ limit: '50mb' }));
        app.use(cookieParser());
        app.use(actuator());
        app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    }

    _configureRoutes(app) {
        useRoutes(app);
    }

    _configureGlobalErrorHandler(app) {
        app.all('*', (req, res) => {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: `${req.originalUrl} not found` });
        });

        app.use((error, _req, res, _next) => {
            console.error(error);

            // // mongodb validation errors
            if (error instanceof mongoose.Error.ValidationError) {
                return errorHandler.handleMongooseValidationError(error, res);
            }

            // Custom defined errors
            if (error instanceof CustomError) {
                return res.status(error.statusCode).json(error.serializeErrors());
            }

            // Fallback for unknown/unhandled errors
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                status: 'error',
                message: error.message || 'Internal Server Error'
            });
        });

    }

}


