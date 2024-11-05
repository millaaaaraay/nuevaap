import { Injectable } from '@angular/core';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  db: SQLiteObject | null = null;

  constructor() { }

  setDatabase(db: SQLiteObject) {
    if (this.db === null) {
      this.db = db;
    }
  }
  database(){
    
 }
  /**
   * Crea las tablas necesarias para el funcionamiento
   */
  createTables(): Promise<any> {
    const tables = `
      CREATE TABLE IF NOT EXISTS sesion_data
      (
        user_name TEXT PRIMARY KEY NOT NULL,
        password INTEGER NOT NULL,
        active INTEGER(1) NOT NULL
      );`;

    if (!this.db) {
      return Promise.reject('Database is not initialized');
    }

    return this.db.executeSql(tables, []).catch(e => {
      console.error('Error creating tables', e);
      return Promise.reject(e);
    });
  }

  sesionActive() {
    const sql = `SELECT user_name, active FROM sesion_data WHERE active=1 LIMIT 1`;

    if (!this.db) {
      return Promise.reject('Database is not initialized');
    }

    return this.db.executeSql(sql, []).then(response => {
      return Promise.resolve(response.rows.item(0));
    }).catch(e => {
      console.error('Error fetching active session', e);
      return Promise.reject(e);
    });
  }

  /**
   * Función que valida la existencia del usuario que está iniciando sesión
   * @param sesion Datos de inicio de sesión Usuario y Password
   */
  getSesionData(sesion: any) {
    const sql = `SELECT user_name, active FROM sesion_data WHERE user_name=? AND password=? LIMIT 1`;

    if (!this.db) {
      return Promise.reject('Database is not initialized');
    }

    return this.db.executeSql(sql, [sesion.Usuario, sesion.Password]).then(response => {
      return Promise.resolve(response.rows.item(0));
    }).catch(e => {
      console.error('Error validating session data', e);
      return Promise.reject(e);
    });
  }

  /**
   * Función que crea un nuevo registro de inicio de sesión
   * @param sesion Datos de inicio de sesión Usuario, Password y Active
   */
  createSesionData(sesion: any) {
    const sql = `INSERT INTO sesion_data(user_name, password, active) VALUES(?, ?, ?)`;

    if (!this.db) {
      return Promise.reject('Database is not initialized');
    }

    return this.db.executeSql(sql, [sesion.Usuario, sesion.Password, sesion.Active]).then(response => {
      return Promise.resolve(response.rows.item(0));
    }).catch(e => {
      console.error('Error creating session data', e);
      return Promise.reject(e);
    });
  }

  updateSesionData(sesion: any) {
    const sql = `UPDATE sesion_data SET active=? WHERE user_name=?`;

    if (!this.db) {
      return Promise.reject('Database is not initialized');
    }

    return this.db.executeSql(sql, [sesion.active, sesion.user_name]).then(response => {
      return Promise.resolve(response.rows.item(0));
    }).catch(e => {
      console.error('Error updating session data', e);
      return Promise.reject(e);
    });
  }
}
