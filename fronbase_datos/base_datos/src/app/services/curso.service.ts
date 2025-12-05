import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap, shareReplay } from 'rxjs/operators';
import { Curso, CursoDetalle, MaterialCurso, Docente, ProgramaCurso, ActividadCurso, AnuncioCurso } from '../models/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = 'http://localhost:8000/api';
  private cache = new Map<string, { data: any, timestamp: number }>();
  private cursosSubject = new BehaviorSubject<Curso[]>([]);
  private readonly CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

  constructor(private http: HttpClient) {}

  private saveToCache<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  private getFromCache<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > this.CACHE_DURATION;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }
    return cached.data as T;
  }

  getCursos(): Observable<Curso[]> {
    const cacheKey = 'allCursos';
    const cached = this.getFromCache<Curso[]>(cacheKey);
    if (cached) {
      return of(cached);
    }

    return this.http.get<any[]>(`${this.apiUrl}/asignaturas`).pipe(
      map(asignaturas => {
        if (!asignaturas?.length) return [];
        return this.transformAsignaturas(asignaturas);
      }),
      tap(cursos => {
        this.saveToCache(cacheKey, cursos);
        this.cursosSubject.next(cursos);
      }),
      shareReplay(1),
      catchError(this.handleError<Curso[]>('getCursos', []))
    );
  }

  getCursoPorId(id: string): Observable<CursoDetalle | null> {
    const cacheKey = `curso_${id}`;
    const cached = this.getFromCache<CursoDetalle>(cacheKey);
    if (cached) return of(cached);

    // Some backends do not implement GET /asignaturas/:id/. Fall back to fetching
    // the full list and finding the matching entry to avoid 501/404 errors.
    return this.getCursos().pipe(
      map((cursos) => {
        if (!cursos || !cursos.length) return null;
        const found = cursos.find(c => String(c.id) === String(id) || String((c as any).id_asignatura) === String(id));
        if (!found) return null;
        this.saveToCache(cacheKey, found as any);
        return found as CursoDetalle;
      }),
      catchError(() => of(null))
    );
  }

  getMaterialesCurso(id: string): Observable<MaterialCurso[]> {
    return this.http.get<MaterialCurso[]>(`${this.apiUrl}/asignaturas/${id}/materiales`).pipe(
      catchError(() => of([]))
    );
  }

  getDocentesCurso(id: string): Observable<Docente[]> {
    return this.http.get<Docente[]>(`${this.apiUrl}/asignaturas/${id}/docentes`).pipe(
      catchError(() => of([]))
    );
  }

  getProgramaCurso(id: string): Observable<ProgramaCurso | undefined> {
    return this.http.get<ProgramaCurso>(`${this.apiUrl}/asignaturas/${id}/programa`).pipe(
      catchError(() => of(undefined))
    );
  }

  getActividadesCurso(id: string): Observable<ActividadCurso[]> {
    return this.http.get<ActividadCurso[]>(`${this.apiUrl}/asignaturas/${id}/actividades`).pipe(
      catchError(() => of([]))
    );
  }

  getAnunciosCurso(id: string): Observable<AnuncioCurso[]> {
    return this.http.get<AnuncioCurso[]>(`${this.apiUrl}/asignaturas/${id}/anuncios`).pipe(
      catchError(() => of([]))
    );
  }

  // helper used by components to invalidate specific cached course entries
  clearCacheForCourse(id?: string): void {
    if (id) {
      this.cache.delete(`curso_${id}`);
    }
    this.cache.delete('allCursos');
  }

  private transformAsignaturas(asignaturas: any[]): Curso[] {
    return asignaturas.map(asignatura => ({
      id: asignatura.id_asignatura?.toString() || Math.random().toString(),
      id_carrera: asignatura.id_carrera || 0,
      carrera_nombre: asignatura.carrera?.nombre || `Carrera ${asignatura.id_carrera || 'N/A'}`,
      nombre: asignatura.nombre || 'Sin título',
      codigo: asignatura.codigo || 'N/A',
      descripcion: asignatura.descripcion || 'Sin descripción',
      seccion: asignatura.seccion || 'A',
      progreso: asignatura.progreso || 0,
      creditos: asignatura.creditos || 0,
      aula: asignatura.aula || 'Sin asignar'
    } as unknown as Curso));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return of(result as T);
    };
  }
}
