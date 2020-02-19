import mariadb from "mariadb";
import dotenv from "dotenv";

dotenv.config();

export default class DConnetion {
  public host: any;
  public user: any;
  public password: any;
  public database: any;
  public port: any;

  private connectionPool: mariadb.Pool;

  constructor() {
    if (process.env.IS_TESTING === "true") {
      this.host = process.env.T_D_HOST;
      this.user = process.env.T_D_USER;
      this.password = process.env.T_D_PASSWORD;
      this.database = process.env.T_D_DATABASE;
      this.port = Number(process.env.T_D_DBPORT);
      console.log({
        host: this.host,
        user: this.user,
        password: this.password,
        database: this.database,
        port: this.port
      });
    } else {
      this.host = process.env.D_HOST;
      this.user = process.env.D_USER;
      this.password = process.env.D_PASSWORD;
      this.database = process.env.D_DATABASE;
      this.port = Number(process.env.D_DBPORT);
    }

    this.connectionPool = mariadb.createPool({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
      port: this.port,
      connectTimeout: 10000
    });
  }

  connect() {
    return this.connectionPool;
  }

  Query(qry: string, params?: Object): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.connectionPool) {
          throw "Connection pool not stablished";
        }

        const rows = await this.connectionPool.query(
          {
            sql: qry,
            namedPlaceholders: true
          },
          params
        );

        resolve(rows);
      } catch (error) {
        reject(error);
      }
    });
  }

  Close(): Promise<void> {
    return this.connectionPool.end();
  }
}
