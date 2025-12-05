import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FieldMapperService {
  /**
   * Mapea campos de snake_case a camelCase
   * Ej: id_seccion -> idSeccion, id_asignatura -> idAsignatura
   */
  snakeToCamel(obj: any): any {
    if (!obj) return obj;

    if (Array.isArray(obj)) {
      return obj.map(item => this.snakeToCamel(item));
    }

    if (typeof obj !== 'object') {
      return obj;
    }

    const result: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        result[camelKey] = this.snakeToCamel(obj[key]);
      }
    }
    return result;
  }

  /**
   * Mapea campos de camelCase a snake_case
   */
  camelToSnake(obj: any): any {
    if (!obj) return obj;

    if (Array.isArray(obj)) {
      return obj.map(item => this.camelToSnake(item));
    }

    if (typeof obj !== 'object') {
      return obj;
    }

    const result: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        result[snakeKey] = this.camelToSnake(obj[key]);
      }
    }
    return result;
  }
}
