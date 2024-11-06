import { Injectable } from '@angular/core';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Clremedios } from './models/CLremedios';
import { Observable, interval, lastValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class BddService {
  private dbInstance!: SQLiteObject;

  constructor(private dataService: DataService) {}

  setDb(db: SQLiteObject) {
    if (!this.dbInstance) {
      this.dbInstance = db;
    }
  }

  async createTables(): Promise<void> {
    const queries = [
      `CREATE TABLE IF NOT EXISTS remedios (
        id TEXT PRIMARY KEY,
        nombre TEXT,
        descripcion TEXT,
        dosis TEXT
      )`,
      `CREATE TABLE IF NOT EXISTS rutinas (
        id TEXT PRIMARY KEY,
        tipo TEXT,
        ejercicio1 TEXT,
        ejercicio2 TEXT
      )`,
      `CREATE TABLE IF NOT EXISTS usuarios (
        id TEXT PRIMARY KEY, -- Usando el correo electrónico como clave primaria
        first_name TEXT,
        last_name TEXT,
        email TEXT UNIQUE, -- Asegurar que los emails sean únicos
        clave TEXT
      )`
    ];

    try {
      for (const query of queries) {
        await this.dbInstance.executeSql(query);
      }
      console.log('Tablas de remedios, rutinas y usuarios creadas correctamente.');
    } catch (error) {
      console.error('Error al crear las tablas:', error);
    }
  }

  // Métodos para la tabla remedios
  async addRemedio(remedio: Clremedios) {
    const sql = 'INSERT INTO remedios (id, nombre, descripcion, dosis) VALUES (?, ?, ?, ?)';
    return this.dbInstance.executeSql(sql, [remedio.id, remedio.nombre, remedio.descripcion, remedio.dosis]);
  }

  async getRemedios() {
    const sql = 'SELECT * FROM remedios';
    const result = await this.dbInstance.executeSql(sql, []);
    const remedios = [];
    for (let i = 0; i < result.rows.length; i++) {
      remedios.push(result.rows.item(i));
    }
    return remedios;
  }

  async sincronizarRemedios(): Promise<void> {
    const sql = 'SELECT * FROM remedios';
    const result = await this.dbInstance.executeSql(sql, []);
    
    for (let i = 0; i < result.rows.length; i++) {
      const remedio = result.rows.item(i);

      try {
        const apiRemedio = await lastValueFrom(this.dataService.getRemedio(remedio.id));

        if (apiRemedio) {
          await this.dbInstance.executeSql('DELETE FROM remedios WHERE id = ?', [remedio.id]);
          console.log(`Remedio con id ${remedio.id} eliminado del almacenamiento local`);
        }
      } catch (error: unknown) {
        if (error instanceof HttpErrorResponse && error.status === 404) {
          await lastValueFrom(this.dataService.addRemedio(remedio));
          console.log(`Remedio con id ${remedio.id} añadido al servidor`);
          await this.dbInstance.executeSql('DELETE FROM remedios WHERE id = ?', [remedio.id]);
        } else {
          console.error(`Error al sincronizar el remedio con id ${remedio.id}:`, error);
        }
      }
    }
  }

  // Métodos para la tabla usuarios
  async addUsuario(usuario: any) {
    const sql = 'INSERT INTO usuarios (id, first_name, last_name, email, clave) VALUES (?, ?, ?, ?, ?)';
    return this.dbInstance.executeSql(sql, [usuario.id, usuario.first_name, usuario.last_name, usuario.email, usuario.clave]);
  }

  async getUsuarios() {
    const sql = 'SELECT * FROM usuarios';
    const result = await this.dbInstance.executeSql(sql, []);
    const usuarios = [];
    for (let i = 0; i < result.rows.length; i++) {
      usuarios.push(result.rows.item(i));
    }
    return usuarios;
  }

  // Método de sincronización en segundo plano
  private startBackgroundSync() {
    interval(60000).subscribe(() => {
      this.sincronizarRemedios().catch(error => console.error('Error en la sincronización de remedios:', error));
    });                                                                           
  }
}







  
