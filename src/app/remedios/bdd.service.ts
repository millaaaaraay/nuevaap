import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx'; // Importación corregida
import { Platform } from '@ionic/angular';
import { Clremedios } from './models/CLremedios';

@Injectable({
  providedIn: 'root'
})
export class BddService {

  db: SQLiteObject | null = null;

  constructor(private sqlite: SQLite, private platform: Platform) {
    this.platform.ready().then(() => {
      this.initDatabase();
    });
  }

  async initDatabase(): Promise<void> {
    try {
      this.db = await this.sqlite.create({
        name: 'data.db',
        location: 'default'
      });
      await this.createTables();
    } catch (e) {
      console.error('Error opening database', e);
      throw e;
    }
  }

  async createTables(): Promise<void> {
    const tables = `
      CREATE TABLE IF NOT EXISTS remedios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        dosis TEXT NOT NULL
      );
    `;

    if (this.db) {
      try {
        await this.db.executeSql(tables, []);
        console.log('Tables created');
      } catch (e) {
        console.error('Error creating tables', e);
        throw e;
      }
    } else {
      throw new Error('Database is not initialized');
    }
  }

  async addRemedio(remedios: Clremedios): Promise<Clremedios> {
    const query = `INSERT INTO remedios (nombre, descripcion, dosis) VALUES (?, ?, ?)`;
    const values = [remedios.nombre, remedios.descripcion, remedios.dosis];

    if (this.db) {
      try {
        await this.db.executeSql(query, values);
        console.log('Remedio added:', remedios);
        return remedios;
      } catch (e) {
        console.error('Error adding remedio', e);
        throw e;
      }
    } else {
      throw new Error('Database is not initialized');
    }
  }

  async getRemedios(): Promise<Clremedios[]> {
    const query = `SELECT * FROM remedios`;

    if (this.db) {
      try {
        const res = await this.db.executeSql(query, []);
        let remedios: Clremedios[] = [];
        for (let i = 0; i < res.rows.length; i++) {
          remedios.push(res.rows.item(i));
        }
        console.log('Fetched remedios:', remedios);
        return remedios;
      } catch (e) {
        console.error('Error fetching remedios', e);
        throw e;
      }
    } else {
      throw new Error('Database is not initialized');
    }
  }

  async getRemedio(id: number): Promise<Clremedios> {
    const query = `SELECT * FROM remedios WHERE id = ?`;

    if (this.db) {
      try {
        const res = await this.db.executeSql(query, [id]);
        if (res.rows.length > 0) {
          console.log('Fetched remedio:', res.rows.item(0));
          return res.rows.item(0);
        } else {
          throw new Error('No remedio found with id: ' + id);
        }
      } catch (e) {
        console.error('Error fetching remedio by id', e);
        throw e;
      }
    } else {
      throw new Error('Database is not initialized');
    }
  }

  async deleteRemedio(id: number): Promise<number> {
    const query = `DELETE FROM remedios WHERE id = ?`;

    if (this.db) {
      try {
        await this.db.executeSql(query, [id]);
        console.log('Deleted remedio with id:', id);
        return id;
      } catch (e) {
        console.error('Error deleting remedio', e);
        throw e;
      }
    } else {
      throw new Error('Database is not initialized');
    }
  }

  async updateRemedio(id: number, remedios: Clremedios): Promise<Clremedios> {
    const query = `UPDATE remedios SET nombre = ?, descripcion = ?, dosis = ? WHERE id = ?`;
    const values = [remedios.nombre, remedios.descripcion, remedios.dosis, id];

    if (this.db) {
      try {
        await this.db.executeSql(query, values);
        console.log('Updated remedio with id:', id);
        return remedios;
      } catch (e) {
        console.error('Error updating remedio', e);
        throw e;
      }
    } else {
      throw new Error('Database is not initialized');
    }
  }
}
