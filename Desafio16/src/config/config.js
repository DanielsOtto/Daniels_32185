// import dotenv from 'dotenv';
// import path from 'path';

// dotenv.config({
//     path:
//         process.env.MODO === 'cluster' && '.env'
// });

export const MODO = process.env.MODO ?? 'fork';
export const PORT = parseInt(process.env.PORT ?? '8080') || 0;
