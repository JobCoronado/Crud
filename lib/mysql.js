const mysql = require("mysql");

const USER = "root";
const PASSWORD = "";
const DB_NAME = "";

// Ahora ya podemos comenzar a escribir nuestra uri de mongo
//const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;
// mongodb+srv://db_user_platzivideos:<password>@cluster0-nnl4g.mongodb.net/test?retryWrites=true&w=majority
class MySqlLib {
  constructor() {
    this.client = mysql.createConnection({
        host: "localhost",
        user: USER,
        password: PASSWORD,
        database: 'crud'
      });
    this.dbName = DB_NAME;
  }

  connect() {
   
    if (!MySqlLib.connection) {
      MySqlLib.connection = new Promise((resolve, reject) => {
        this.client.connect(err => {
          if (err) {
            reject(err);
          }

          console.log('Connected succesfully to mySql');
          resolve(this.client);
        });
      });
    }

    return MySqlLib.connection;
  }

  
  async get(query) {
    return new Promise((resolve,reject)=>{
        this.connect().then(db => {
            db.query(query, (err, row) => {
                if(err){
                    return reject(err)
                }
                return resolve(row);
    
              });
        })
    })
      
      }

      create( query, data) {
        return new Promise((resolve,reject)=>{
            this.connect().then(db => {
                db.query(query, data, (err, result , fields) => {
                    if(err){
                      return reject(err)
                    }
                      return resolve(result);
                  });
            })
        })
      }

      updated( query, data) {
        return new Promise((resolve,reject)=>{
            this.connect().then(db => {
                db.query(query, data, (err, result , fields) => {
                    if(err){
                      return reject(err)
                    }
                      return resolve(result);
                  });
            })
        })
      }

      delete( query, data) {
        return new Promise((resolve,reject)=>{
            this.connect().then(db => {
                db.query(query, data, (err, result , fields) => {
                    if(err){
                      return reject(err)
                    }
                      return resolve(result);
                  });
            })
        })
      }
}

module.exports = MySqlLib;