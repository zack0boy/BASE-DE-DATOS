import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ContentModerationService } from './content-moderation.service';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MensajesInternosService {
  endpoint = 'mensajes-internos';
  constructor(private api: ApiService, private moderation: ContentModerationService) {}

  getAll() {
    return this.api.getAll(this.endpoint);
  }

  get(id: number) {
    return this.api.getById(this.endpoint, id);
  }

  getByDestinatario(destinatarioId: number) {
    return this.api.getAll(`${this.endpoint}?destinatario=${destinatarioId}`);
  }

  getByRemitente(remitenteId: number) {
    return this.api.getAll(`${this.endpoint}?remitente=${remitenteId}`);
  }

  /**
   * Crea un mensaje después de validar contenido. Si el mensaje contiene
   * lenguaje inapropiado se devuelve un observable con error para que los
   * componentes puedan manejarlo (mostrar mensaje al usuario, etc.).
   */
  create(data: any): Observable<any> {
    const texto = `${data.asunto || ''} ${data.contenido || ''}`.trim();
    const validacion = this.moderation.validarContenido(texto);
    if (!validacion.esValido) {
      const msg = this.moderation.obtenerMensajeError(validacion.tipoViolacion, validacion.palabrasEncontradas);
      return throwError(() => ({ status: 400, message: msg, tipo: validacion.tipoViolacion, palabras: validacion.palabrasEncontradas }));
    }

    return this.api.create(this.endpoint, data);
  }

  update(id: number, data: any) {
    return this.api.update(this.endpoint, id, data);
  }

  delete(id: number) {
    return this.api.delete(this.endpoint, id);
  }
}
