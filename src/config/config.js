import dotenv from 'dotenv';
dotenv.config({debug : true });

export const DB_CONFIG = {
    HOST: process.env.HOSTNAME_NAME,
    USER: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DATABASE_NAME,
    PORT:process.env.DATABASE_PORT,
    TOKEN:process.env.JWT_TOKEN || "1234",
    DIALECT: 'mysql',
};
    console.log("🚀 ~ DB_CONFIG.TOKEN:", DB_CONFIG.TOKEN)

console.log('db config', DB_CONFIG)

console.log('Loaded DB username:', process.env.USERNAME);
console.log('Loaded DB hostname:', process.env.HOSTNAME_NAME);
console.log('Loaded DB password:', process.env.PASSWORD);
console.log('Loaded DB database name:', process.env.DATABASE_NAME);

// console.log('All environment variables:', process.env);

