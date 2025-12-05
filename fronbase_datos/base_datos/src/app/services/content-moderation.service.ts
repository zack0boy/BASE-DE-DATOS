import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContentModerationService {
  // Lista de palabras ofensivas/prohibidas (se puede expandir)
  private prohibidaSexy: string[] = [
    'puta', 'puto', 'mierda', 'verga', 'pendejo', 'culo', 'coño',
    'chingada', 'concha', 'boludo', 'pelotudo', 'carajo', 'ojete',
    'gilipolla', 'maricon', 'faggot', 'bastardo', 'cabrón', 'idiota',
    'estúpido', 'retardo', 'mongol', 'mogol', 'negro', 'prieto',
    'chinito', 'gringo', 'bolche', 'comunista', 'fascista', 'nazi',
    'judío', 'moro', 'gitano', 'indio', 'salvaje', 'primitivo',
    'prostituta', 'hijo de puta', 'hdp', 'wtf', 'sexo'
  ];

  private palabrasOdio: string[] = [
    'muerte', 'muere', 'mata', 'matar', 'asesina', 'asesino', 'violación',
    'violar', 'abusar', 'abuso', 'terrorista', 'terrorismo', 'bomba',
    'explosión', 'arma', 'disparo', 'asesinato', 'crimen', 'criminal',
    'prostituta', 'prostitución', 'droga', 'drogas', 'drogadicto',
    'alcohólico', 'suicidio', 'suicidate', 'cuelgate', 'ahorcate',
    'veneno', 'venenosa', 'cáncer', 'sida', 'enfermedad', 'plaga',
    'inferior', 'superior', 'supremacía', 'raza pura', 'limpieza étnica'
  ];

  private ofensasPersonales: string[] = [
    'eres horrible', 'eres feo', 'eres gorda', 'eres gordo', 'eres delgada',
    'nadie te quiere', 'todos te odian', 'deberías desaparecer',
    'desaparece', 'vete al carajo', 'vete a la mierda', 'eres un fracaso',
    'fracasado', 'inútil', 'patético', 'despreciable', 'repugnante',
    'asqueroso', 'repulsivo', 'eres una basura', 'eres basura',
    'no vales nada', 'no sirves para nada', 'eres un parásito'
  ];

  constructor() {}

  /**
   * Valida el contenido del mensaje
   * @param mensaje Texto del mensaje a validar
   * @returns Objeto con indicadores de validación
   */
  validarContenido(mensaje: string): {
    esValido: boolean;
    tipoViolacion: 'ninguno' | 'sexual' | 'odio' | 'personal';
    palabrasEncontradas: string[];
  } {
    const mensajeLimpio = mensaje.toLowerCase().trim();

    // Validar palabras sexuales
    const sexualEncontradas = this.buscarPalabras(mensajeLimpio, this.prohibidaSexy);
    if (sexualEncontradas.length > 0) {
      return {
        esValido: false,
        tipoViolacion: 'sexual',
        palabrasEncontradas: sexualEncontradas,
      };
    }

    // Validar palabras de odio
    const odioEncontradas = this.buscarPalabras(mensajeLimpio, this.palabrasOdio);
    if (odioEncontradas.length > 0) {
      return {
        esValido: false,
        tipoViolacion: 'odio',
        palabrasEncontradas: odioEncontradas,
      };
    }

    // Validar ofensas personales
    const personalesEncontradas = this.buscarPalabras(mensajeLimpio, this.ofensasPersonales);
    if (personalesEncontradas.length > 0) {
      return {
        esValido: false,
        tipoViolacion: 'personal',
        palabrasEncontradas: personalesEncontradas,
      };
    }

    return {
      esValido: true,
      tipoViolacion: 'ninguno',
      palabrasEncontradas: [],
    };
  }

  /**
   * Censura el contenido del mensaje reemplazando palabras ofensivas
   * @param mensaje Texto a censurar
   * @returns Mensaje censurado
   */
  censurarContenido(mensaje: string): string {
    let mensajeCensurado = mensaje;
    const todasLasPalabras = [
      ...this.prohibidaSexy,
      ...this.palabrasOdio,
      ...this.ofensasPersonales,
    ];

    todasLasPalabras.forEach((palabra) => {
      const regex = new RegExp(`\\b${this.escaparRegex(palabra)}\\b`, 'gi');
      const reemplazo = '*'.repeat(palabra.length);
      mensajeCensurado = mensajeCensurado.replace(regex, reemplazo);
    });

    return mensajeCensurado;
  }

  /**
   * Obtiene el mensaje de error apropiado
   * @param tipoViolacion Tipo de violación encontrada
   * @param palabras Palabras encontradas
   * @returns Mensaje de error descriptivo
   */
  obtenerMensajeError(tipoViolacion: string, palabras: string[]): string {
    switch (tipoViolacion) {
      case 'sexual':
        return `Tu mensaje contiene lenguaje inapropiado. Se detectaron ${palabras.length} palabra(s) ofensiva(s).`;
      case 'odio':
        return `Tu mensaje contiene lenguaje de odio. No se permite este tipo de contenido.`;
      case 'personal':
        return `Tu mensaje contiene ofensas personales dirigidas a otra persona. Por favor sé respetuoso.`;
      default:
        return 'El mensaje contiene contenido inapropiado.';
    }
  }

  /**
   * Busca palabras en un texto
   * @param texto Texto donde buscar
   * @param palabras Lista de palabras a buscar
   * @returns Array de palabras encontradas
   */
  private buscarPalabras(texto: string, palabras: string[]): string[] {
    const encontradas: string[] = [];

    palabras.forEach((palabra) => {
      // Crear regex para palabras completas (no parciales)
      const regex = new RegExp(`\\b${this.escaparRegex(palabra)}\\b`, 'gi');
      if (regex.test(texto)) {
        encontradas.push(palabra);
      }
    });

    return encontradas;
  }

  /**
   * Escapa caracteres especiales en regex
   * @param texto Texto a escapar
   * @returns Texto escapado
   */
  private escaparRegex(texto: string): string {
    return texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Agrega nuevas palabras prohibidas
   * @param tipo 'sexual' | 'odio' | 'personal'
   * @param palabras Array de palabras a agregar
   */
  agregarPalabrasProhibidas(tipo: 'sexual' | 'odio' | 'personal', palabras: string[]): void {
    switch (tipo) {
      case 'sexual':
        this.prohibidaSexy = [...new Set([...this.prohibidaSexy, ...palabras])];
        break;
      case 'odio':
        this.palabrasOdio = [...new Set([...this.palabrasOdio, ...palabras])];
        break;
      case 'personal':
        this.ofensasPersonales = [...new Set([...this.ofensasPersonales, ...palabras])];
        break;
    }
  }
}
