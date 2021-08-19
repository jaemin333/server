import { config } from '../config.js';
import SQ from 'sequelize';

const {host,port,user,database,password} = config.db;
export const sequelize = new SQ.Sequelize(database,user,password, {
    host,
    port,
    dialect: 'postgres',
    logging:false,
    dialectOptions:{
        ssl:{
            require:true,
            rejectUnauthorized:false,
        },
    },
});

//const pool = mysql.createPool({
    //host:config.db.host,
    //user:config.db.user,
    //database:config.db.database,
    //password:config.db.password,

//});

//export const db = pool.promise();