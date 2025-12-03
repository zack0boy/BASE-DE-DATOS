-- **********************************************************************************
-- 1. INSERCIÓN DE TABLAS BASE SIN CLAVES FORÁNEAS (PARA ESTABLECER DEPENDENCIAS)
-- **********************************************************************************
INSERT INTO JNG_ROL (ID_ROL, NOMBRE_ROL, DESCRIPCION) VALUES (JNG_SEQ_ROL.NEXTVAL, 'ADMINISTRADOR', 'Super usuario del sistema.');
INSERT INTO JNG_ROL (ID_ROL, NOMBRE_ROL, DESCRIPCION) VALUES (JNG_SEQ_ROL.NEXTVAL, 'DOCENTE', 'Profesor de asignaturas.');
INSERT INTO JNG_ROL (ID_ROL, NOMBRE_ROL, DESCRIPCION) VALUES (JNG_SEQ_ROL.NEXTVAL, 'ALUMNO', 'Estudiante matriculado.');
INSERT INTO JNG_ROL (ID_ROL, NOMBRE_ROL, DESCRIPCION) VALUES (JNG_SEQ_ROL.NEXTVAL, 'DIRECTOR_CARRERA', 'Encargado de la gestión académica de una carrera.');
INSERT INTO JNG_PERMISO (ID_PERMISO, NOMBRE) VALUES (JNG_SEQ_PERMISO.NEXTVAL, 'MANAGE_USERS');
INSERT INTO JNG_PERMISO (ID_PERMISO, NOMBRE) VALUES (JNG_SEQ_PERMISO.NEXTVAL, 'VIEW_NOTES');
INSERT INTO JNG_UNIVERSIDAD (ID_UNIVERSIDAD, NOMBRE, DIRECCION) VALUES (JNG_SEQ_UNIVERSIDAD.NEXTVAL, 'Universidad Tecnológica Central', 'Av. Innovación #150');
INSERT INTO JNG_TIPO_ACTIVIDAD (ID_TIPO_ACTIVIDAD, NOMBRE) VALUES (JNG_SEQ_TIPO_ACTIVIDAD.NEXTVAL, 'Clase Teórica');
INSERT INTO JNG_TIPO_ACTIVIDAD (ID_TIPO_ACTIVIDAD, NOMBRE) VALUES (JNG_SEQ_TIPO_ACTIVIDAD.NEXTVAL, 'Taller Práctico');
INSERT INTO JNG_TIPO_EVALUACION (ID_TIPO_EVALUACION, NOMBRE) VALUES (JNG_SEQ_TIPO_EVALUACION.NEXTVAL, 'Prueba Escrita');
INSERT INTO JNG_TIPO_EVALUACION (ID_TIPO_EVALUACION, NOMBRE) VALUES (JNG_SEQ_TIPO_EVALUACION.NEXTVAL, 'Proyecto Final');
INSERT INTO JNG_PERIODO_ACADEMICO (ID_PERIODO, YEAR_NUM, SEMESTRE) VALUES (JNG_SEQ_PERIODO_ACADEMICO.NEXTVAL, 2025, 1);


-- **********************************************************************************
-- 2. INSERCIÓN DE SEDE Y USUARIOS (DEPENDEN DE UNIVERSIDAD Y ROL)
-- **********************************************************************************
INSERT INTO JNG_SEDE (ID_SEDE, ID_UNIVERSIDAD, NOMBRE, DIRECCION) 
VALUES (JNG_SEQ_SEDE.NEXTVAL, 
        (SELECT ID_UNIVERSIDAD FROM JNG_UNIVERSIDAD WHERE NOMBRE = 'Universidad Tecnológica Central'), 
        'Campus Central', 'Calle Ficticia #50');

-- Inserción de Usuarios, obteniendo el ID_ROL por nombre
INSERT INTO JNG_USUARIO (ID_USUARIO, ID_ROL, NOMBRE, APELLIDO, RUT, EMAIL, PASSWORD, FECHA_NAC) 
VALUES (JNG_SEQ_USUARIO.NEXTVAL, 
        (SELECT ID_ROL FROM JNG_ROL WHERE NOMBRE_ROL = 'ADMINISTRADOR'), 
        'Admin', 'Sistema', '10.000.000-1', 'admin@utc.cl', 'hashed_admin', TO_DATE('01-01-1980', 'DD-MM-YYYY'));

INSERT INTO JNG_USUARIO (ID_USUARIO, ID_ROL, NOMBRE, APELLIDO, RUT, EMAIL, PASSWORD, FECHA_NAC) 
VALUES (JNG_SEQ_USUARIO.NEXTVAL, 
        (SELECT ID_ROL FROM JNG_ROL WHERE NOMBRE_ROL = 'DOCENTE'), 
        'Profesor', 'Jara', '15.000.000-2', 'docente@utc.cl', 'hashed_docente', TO_DATE('15-03-1975', 'DD-MM-YYYY'));

INSERT INTO JNG_USUARIO (ID_USUARIO, ID_ROL, NOMBRE, APELLIDO, RUT, EMAIL, PASSWORD, FECHA_NAC) 
VALUES (JNG_SEQ_USUARIO.NEXTVAL, 
        (SELECT ID_ROL FROM JNG_ROL WHERE NOMBRE_ROL = 'ALUMNO'), 
        'Carlos', 'Perez', '18.000.000-3', 'carlosperez@utc.cl', 'hashed_alumno', TO_DATE('20-05-2000', 'DD-MM-YYYY'));

INSERT INTO JNG_USUARIO (ID_USUARIO, ID_ROL, NOMBRE, APELLIDO, RUT, EMAIL, PASSWORD, FECHA_NAC) 
VALUES (JNG_SEQ_USUARIO.NEXTVAL, 
        (SELECT ID_ROL FROM JNG_ROL WHERE NOMBRE_ROL = 'DIRECTOR_CARRERA'), 
        'Directora', 'Lopez', '12.000.000-4', 'directora@utc.cl', 'hashed_directora', TO_DATE('10-02-1985', 'DD-MM-YYYY'));


-- **********************************************************************************
-- 3. INSERCIÓN DE CARRERA Y AULA (DEPENDEN DE SEDE Y USUARIO)
-- **********************************************************************************
-- ID_SEDE se obtiene por nombre, ID_DIRECTOR se obtiene por email (que es único)
INSERT INTO JNG_CARRERA (ID_CARRERA, ID_SEDE, NOMBRE, DESCRIPCION, ID_DIRECTOR) 
VALUES (JNG_SEQ_CARRERA.NEXTVAL, 
        (SELECT ID_SEDE FROM JNG_SEDE WHERE NOMBRE = 'Campus Central'), 
        'Ingeniería Civil Informática', 'Carrera de 10 semestres enfocada en desarrollo de software y gestión de datos.', 
        (SELECT ID_USUARIO FROM JNG_USUARIO WHERE EMAIL = 'directora@utc.cl'));

INSERT INTO JNG_AULA (ID_AULA, ID_SEDE, NOMBRE, CAPACIDAD) 
VALUES (JNG_SEQ_AULA.NEXTVAL, 
        (SELECT ID_SEDE FROM JNG_SEDE WHERE NOMBRE = 'Campus Central'), 
        'Sala B101', 45);

INSERT INTO JNG_AULA (ID_AULA, ID_SEDE, NOMBRE, CAPACIDAD) 
VALUES (JNG_SEQ_AULA.NEXTVAL, 
        (SELECT ID_SEDE FROM JNG_SEDE WHERE NOMBRE = 'Campus Central'), 
        'Lab. Computación 1', 30);


-- **********************************************************************************
-- 4. INSERCIÓN DE PLAN, ASIGNATURAS Y SECCIONES
-- **********************************************************************************
-- Plan de Estudios depende de Carrera
INSERT INTO JNG_PLAN_ESTUDIOS (ID_PLAN, ID_CARRERA, YEAR_INICIO, YEAR_FIN) 
VALUES (JNG_SEQ_PLAN_ESTUDIOS.NEXTVAL, 
        (SELECT ID_CARRERA FROM JNG_CARRERA WHERE NOMBRE = 'Ingeniería Civil Informática'), 
        2020, 2024);

-- Asignaturas dependen de Carrera
INSERT INTO JNG_ASIGNATURA (ID_ASIGNATURA, ID_CARRERA, NOMBRE, CODIGO, CREDITOS, DESCRIPCION) 
VALUES (JNG_SEQ_ASIGNATURA.NEXTVAL, 
        (SELECT ID_CARRERA FROM JNG_CARRERA WHERE NOMBRE = 'Ingeniería Civil Informática'), 
        'Cálculo I', 'MAT101', 6, 'Primer curso de cálculo diferencial.');

INSERT INTO JNG_ASIGNATURA (ID_ASIGNATURA, ID_CARRERA, NOMBRE, CODIGO, CREDITOS, DESCRIPCION) 
VALUES (JNG_SEQ_ASIGNATURA.NEXTVAL, 
        (SELECT ID_CARRERA FROM JNG_CARRERA WHERE NOMBRE = 'Ingeniería Civil Informática'), 
        'Bases de Datos', 'INF301', 5, 'Modelamiento, SQL y administración de bases de datos.');

-- Asignatura Carrera depende de Plan y Asignatura
INSERT INTO JNG_ASIGNATURA_CARRERA (ID_PLAN, ID_ASIGNATURA, SEMESTRE) 
VALUES ((SELECT ID_PLAN FROM JNG_PLAN_ESTUDIOS WHERE YEAR_INICIO = 2020), 
        (SELECT ID_ASIGNATURA FROM JNG_ASIGNATURA WHERE CODIGO = 'MAT101'), 
        1);

INSERT INTO JNG_ASIGNATURA_CARRERA (ID_PLAN, ID_ASIGNATURA, SEMESTRE) 
VALUES ((SELECT ID_PLAN FROM JNG_PLAN_ESTUDIOS WHERE YEAR_INICIO = 2020), 
        (SELECT ID_ASIGNATURA FROM JNG_ASIGNATURA WHERE CODIGO = 'INF301'), 
        5);

-- Prerequisito depende de Asignatura
INSERT INTO JNG_PREREQUISITO (ID_ASIGNATURA, ID_ASIGNATURA_REQ) 
VALUES ((SELECT ID_ASIGNATURA FROM JNG_ASIGNATURA WHERE CODIGO = 'INF301'), 
        (SELECT ID_ASIGNATURA FROM JNG_ASIGNATURA WHERE CODIGO = 'MAT101'));

-- Secciones dependen de Asignatura y Periodo Académico
INSERT INTO JNG_SECCION (ID_SECCION, ID_ASIGNATURA, ID_PERIODO, NUMERO, GRUPO, CUPOS) 
VALUES (JNG_SEQ_SECCION.NEXTVAL, 
        (SELECT ID_ASIGNATURA FROM JNG_ASIGNATURA WHERE CODIGO = 'INF301'), 
        (SELECT ID_PERIODO FROM JNG_PERIODO_ACADEMICO WHERE YEAR_NUM = 2025 AND SEMESTRE = 1), 
        1, 'A', 40);

INSERT INTO JNG_SECCION (ID_SECCION, ID_ASIGNATURA, ID_PERIODO, NUMERO, GRUPO, CUPOS) 
VALUES (JNG_SEQ_SECCION.NEXTVAL, 
        (SELECT ID_ASIGNATURA FROM JNG_ASIGNATURA WHERE CODIGO = 'MAT101'), 
        (SELECT ID_PERIODO FROM JNG_PERIODO_ACADEMICO WHERE YEAR_NUM = 2025 AND SEMESTRE = 1), 
        2, 'B', 30);


-- **********************************************************************************
-- 5. INSERCIÓN DE ALUMNO, INSCRIPCIÓN Y ASIGNACIONES
-- **********************************************************************************
-- Alumno depende de Usuario y Carrera
INSERT INTO JNG_ALUMNO (ID_ALUMNO, ID_USUARIO, ID_CARRERA, FECHA_INGRESO) 
VALUES (JNG_SEQ_ALUMNO.NEXTVAL, 
        (SELECT ID_USUARIO FROM JNG_USUARIO WHERE EMAIL = 'carlosperez@utc.cl'), 
        (SELECT ID_CARRERA FROM JNG_CARRERA WHERE NOMBRE = 'Ingeniería Civil Informática'), 
        TO_DATE('01-03-2022', 'DD-MM-YYYY'));

-- Inscripción depende de Alumno y Sección
INSERT INTO JNG_INSCRIPCION (ID_INSCRIPCION, ID_ALUMNO, ID_SECCION) 
VALUES (JNG_SEQ_INSCRIPCION.NEXTVAL, 
        (SELECT ID_ALUMNO FROM JNG_ALUMNO WHERE ID_USUARIO = (SELECT ID_USUARIO FROM JNG_USUARIO WHERE EMAIL = 'carlosperez@utc.cl')), 
        (SELECT ID_SECCION FROM JNG_SECCION WHERE GRUPO = 'A' AND ID_ASIGNATURA = (SELECT ID_ASIGNATURA FROM JNG_ASIGNATURA WHERE CODIGO = 'INF301')));

-- Asignación Docente depende de Usuario y Sección
INSERT INTO JNG_ASIGNACION_DOCENTE (ID_ASIGNACION_DOCENTE, ID_USUARIO, ID_SECCION) 
VALUES (JNG_SEQ_ASIGNACION_DOCENTE.NEXTVAL, 
        (SELECT ID_USUARIO FROM JNG_USUARIO WHERE EMAIL = 'docente@utc.cl'), 
        (SELECT ID_SECCION FROM JNG_SECCION WHERE GRUPO = 'A' AND ID_ASIGNATURA = (SELECT ID_ASIGNATURA FROM JNG_ASIGNATURA WHERE CODIGO = 'INF301')));

-- Asignación Secretaría depende de Usuario y Sede
INSERT INTO JNG_ASIGNACION_SECRETARIA (ID_ASIGNACION_SECRETARIA, ID_USUARIO, ID_SEDE, AREA) 
VALUES (JNG_SEQ_ASIGNACION_SECRETARIA.NEXTVAL, 
        (SELECT ID_USUARIO FROM JNG_USUARIO WHERE EMAIL = 'admin@utc.cl'), 
        (SELECT ID_SEDE FROM JNG_SEDE WHERE NOMBRE = 'Campus Central'), 
        'Dirección Académica');

-- Ayudantía depende de Usuario, Carrera y Sección
INSERT INTO JNG_AYUDANTIA (ID_AYUDANTIA, ID_USUARIO, ID_CARRERA, ID_SECCION) 
VALUES (JNG_SEQ_AYUDANTIA.NEXTVAL, 
        (SELECT ID_USUARIO FROM JNG_USUARIO WHERE EMAIL = 'carlosperez@utc.cl'), 
        (SELECT ID_CARRERA FROM JNG_CARRERA WHERE NOMBRE = 'Ingeniería Civil Informática'), 
        (SELECT ID_SECCION FROM JNG_SECCION WHERE GRUPO = 'A' AND ID_ASIGNATURA = (SELECT ID_ASIGNATURA FROM JNG_ASIGNATURA WHERE CODIGO = 'INF301')));


-- **********************************************************************************
-- 6. HORARIOS, ACTIVIDADES Y EVALUACIONES
-- **********************************************************************************
-- Horario depende de Sección y Aula
INSERT INTO JNG_HORARIO (ID_HORARIO, ID_SECCION, ID_AULA, DIA_SEMANA, HORA_INICIO, HORA_FIN) 
VALUES (JNG_SEQ_HORARIO.NEXTVAL, 
        (SELECT ID_SECCION FROM JNG_SECCION WHERE GRUPO = 'A' AND ID_ASIGNATURA = (SELECT ID_ASIGNATURA FROM JNG_ASIGNATURA WHERE CODIGO = 'INF301')), 
        (SELECT ID_AULA FROM JNG_AULA WHERE NOMBRE = 'Sala B101'), 
        'LUNES', TIMESTAMP '2025-03-10 10:00:00', TIMESTAMP '2025-03-10 11:30:00');

-- Actividad depende de Sección y Tipo Actividad
INSERT INTO JNG_ACTIVIDAD (ID_ACTIVIDAD, ID_SECCION, ID_TIPO_ACTIVIDAD, DESCRIPCION, FECHA) 
VALUES (JNG_SEQ_ACTIVIDAD.NEXTVAL, 
        (SELECT ID_SECCION FROM JNG_SECCION WHERE GRUPO = 'A' AND ID_ASIGNATURA = (SELECT ID_ASIGNATURA FROM JNG_ASIGNATURA WHERE CODIGO = 'INF301')), 
        (SELECT ID_TIPO_ACTIVIDAD FROM JNG_TIPO_ACTIVIDAD WHERE NOMBRE = 'Clase Teórica'), 
        'Introducción al Modelamiento de Datos', SYSDATE);

-- Evaluaciones dependen de Sección y Tipo Evaluación
INSERT INTO JNG_EVALUACION (ID_EVALUACION, ID_SECCION, ID_TIPO_EVALUACION, TITULO, PORCENTAJE) 
VALUES (JNG_SEQ_EVALUACION.NEXTVAL, 
        (SELECT ID_SECCION FROM JNG_SECCION WHERE GRUPO = 'A' AND ID_ASIGNATURA = (SELECT ID_ASIGNATURA FROM JNG_ASIGNATURA WHERE CODIGO = 'INF301')), 
        (SELECT ID_TIPO_EVALUACION FROM JNG_TIPO_EVALUACION WHERE NOMBRE = 'Prueba Escrita'), 
        'Certamen 1: Normalización', 40.00);

INSERT INTO JNG_EVALUACION (ID_EVALUACION, ID_SECCION, ID_TIPO_EVALUACION, TITULO, PORCENTAJE) 
VALUES (JNG_SEQ_EVALUACION.NEXTVAL, 
        (SELECT ID_SECCION FROM JNG_SECCION WHERE GRUPO = 'A' AND ID_ASIGNATURA = (SELECT ID_ASIGNATURA FROM JNG_ASIGNATURA WHERE CODIGO = 'INF301')), 
        (SELECT ID_TIPO_EVALUACION FROM JNG_TIPO_EVALUACION WHERE NOMBRE = 'Proyecto Final'), 
        'Proyecto Final de Base de Datos', 60.00);


-- **********************************************************************************
-- 7. NOTAS Y MATERIALES (DEPENDENCIAS FINALES)
-- **********************************************************************************
-- Nota depende de Evaluación y Alumno
INSERT INTO JNG_NOTA (ID_NOTA, ID_EVALUACION, ID_ALUMNO, NOTA) 
VALUES (JNG_SEQ_NOTA.NEXTVAL, 
        (SELECT ID_EVALUACION FROM JNG_EVALUACION WHERE TITULO = 'Certamen 1: Normalización'), 
        (SELECT ID_ALUMNO FROM JNG_ALUMNO WHERE ID_USUARIO = (SELECT ID_USUARIO FROM JNG_USUARIO WHERE EMAIL = 'carlosperez@utc.cl')), 
        5.5);

-- Contenido depende de Asignatura
INSERT INTO JNG_CONTENIDO (ID_CONTENIDO, ID_ASIGNATURA, TITULO, DESCRIPCION) 
VALUES (JNG_SEQ_CONTENIDO.NEXTVAL, 
        (SELECT ID_ASIGNATURA FROM JNG_ASIGNATURA WHERE CODIGO = 'INF301'), 
        'Unidad 1: Modelos de Datos', 'Material de apoyo para la primera unidad de la asignatura de Bases de Datos.');

-- Material Curso depende de Sección y Usuario
INSERT INTO JNG_MATERIAL_CURSO (ID_MATERIAL, ID_SECCION, ID_USUARIO, TITULO, URL, FECHA_SUBIDA) 
VALUES (JNG_SEQ_MATERIAL_CURSO.NEXTVAL, 
        (SELECT ID_SECCION FROM JNG_SECCION WHERE GRUPO = 'A' AND ID_ASIGNATURA = (SELECT ID_ASIGNATURA FROM JNG_ASIGNATURA WHERE CODIGO = 'INF301')), 
        (SELECT ID_USUARIO FROM JNG_USUARIO WHERE EMAIL = 'docente@utc.cl'), 
        'Presentación SQL Básico', 'http://repo.utc.cl/inf301/sqlsb.pdf', SYSDATE);

-- Mensaje Interno depende de Usuarios (envía y recibe)
INSERT INTO JNG_MENSAJE_INTERNO (ID_MENSAJE, ID_USUARIO_ENVIA, ID_USUARIO_RECIBE, CONTENIDO, FECHA) 
VALUES (JNG_SEQ_MENSAJE_INTERNO.NEXTVAL, 
        (SELECT ID_USUARIO FROM JNG_USUARIO WHERE EMAIL = 'carlosperez@utc.cl'), 
        (SELECT ID_USUARIO FROM JNG_USUARIO WHERE EMAIL = 'docente@utc.cl'), 
        'Estimado profesor, ¿podría revisar mi nota?', SYSDATE);

-- Anuncio depende de Usuario y Carrera
INSERT INTO JNG_ANUNCIO (ID_ANUNCIO, ID_USUARIO, ID_SECCION, ID_CARRERA, TITULO, CONTENIDO, FECHA) 
VALUES (JNG_SEQ_ANUNCIO.NEXTVAL, 
        (SELECT ID_USUARIO FROM JNG_USUARIO WHERE EMAIL = 'directora@utc.cl'), 
        NULL, 
        (SELECT ID_CARRERA FROM JNG_CARRERA WHERE NOMBRE = 'Ingeniería Civil Informática'), 
        'Aviso General Carrera', 'Se informa que el proceso de inscripción de ramos cierra esta semana.', SYSDATE);

-- Logs dependen de Usuario
INSERT INTO JNG_LOG_AUTENTICACION (ID_LOG_AUTH, ID_USUARIO, FECHA_INTENTO, RESULTADO, IP_ADDRESS) 
VALUES (JNG_SEQ_LOG_AUTENTICACION.NEXTVAL, 
        (SELECT ID_USUARIO FROM JNG_USUARIO WHERE EMAIL = 'carlosperez@utc.cl'), 
        SYSTIMESTAMP, 'SUCCESS', '192.168.1.100');

INSERT INTO JNG_LOG_USER_ADMIN (ID_LOG_ADMIN, ID_USUARIO, ACCION, TABLA_AFECTADA, FECHA_ACCION, DETALLES) 
VALUES (JNG_SEQ_LOG_USER_ADMIN.NEXTVAL, 
        (SELECT ID_USUARIO FROM JNG_USUARIO WHERE EMAIL = 'admin@utc.cl'), 
        'CREATE', 'JNG_CARRERA', SYSTIMESTAMP, 'Creación de Ingeniería Civil Informática.');

COMMIT;


DELETE FROM JNG_LOG_USER_ADMIN;
DELETE FROM JNG_LOG_AUTENTICACION;
DELETE FROM JNG_ANUNCIO;
DELETE FROM JNG_MENSAJE_INTERNO;
DELETE FROM JNG_MATERIAL_CURSO;
DELETE FROM JNG_CONTENIDO;
DELETE FROM JNG_NOTA;
DELETE FROM JNG_EVALUACION;
DELETE FROM JNG_ACTIVIDAD;
DELETE FROM JNG_TIPO_EVALUACION;
DELETE FROM JNG_TIPO_ACTIVIDAD;
DELETE FROM JNG_INSCRIPCION;
DELETE FROM JNG_ALUMNO;
DELETE FROM JNG_AYUDANTIA;
DELETE FROM JNG_ASIGNACION_SECRETARIA;
DELETE FROM JNG_ASIGNACION_DOCENTE;
DELETE FROM JNG_HORARIO;
DELETE FROM JNG_AULA;
DELETE FROM JNG_PERIODO_ACADEMICO;
DELETE FROM JNG_SECCION;
DELETE FROM JNG_PREREQUISITO;
DELETE FROM JNG_ASIGNATURA_CARRERA;
DELETE FROM JNG_ASIGNATURA;
DELETE FROM JNG_PLAN_ESTUDIOS;
DELETE FROM JNG_CARRERA;
DELETE FROM JNG_SEDE;
DELETE FROM JNG_USUARIO;
DELETE FROM JNG_UNIVERSIDAD;
DELETE FROM JNG_PERMISO;
DELETE FROM JNG_ROL;
COMMIT;











usuarios": "                            http://127.0.0.1:8000/api/usuarios/
roles": "                               http://127.0.0.1:8000/api/roles/
alumnos": "                             http://127.0.0.1:8000/api/alumnos/
carreras": "                            http://127.0.0.1:8000/api/carreras/
asignaturas": "                         http://127.0.0.1:8000/api/asignaturas/
secciones": "                           http://127.0.0.1:8000/api/secciones/
periodos": "                            http://127.0.0.1:8000/api/periodos/
inscripciones": "                       http://127.0.0.1:8000/api/inscripciones/
notas": "                               http://127.0.0.1:8000/api/notas/
aulas": "                               http://127.0.0.1:8000/api/aulas/
planes-estudio": "                      http://127.0.0.1:8000/api/planes-estudio/
sedes": "                               http://127.0.0.1:8000/api/sedes/
universidades": "                       http://127.0.0.1:8000/api/universidades/
tipos-evaluacion": "                    http://127.0.0.1:8000/api/tipos-evaluacion/
tipos-actividad": "                     http://127.0.0.1:8000/api/tipos-actividad/
evaluaciones": "                        http://127.0.0.1:8000/api/evaluaciones/
actividades": "                         http://127.0.0.1:8000/api/actividades/
permisos": "                            http://127.0.0.1:8000/api/permisos/
asignaturas-carrera": "                 http://127.0.0.1:8000/api/asignaturas-carrera/
prerequisitos": "                       http://127.0.0.1:8000/api/prerequisitos/
horarios": "                            http://127.0.0.1:8000/api/horarios/
asignaciones-docente": "                http://127.0.0.1:8000/api/asignaciones-docente/
asignaciones-secretaria" : "            http://127.0.0.1:8000/api/asignaciones-secretaria/
ayudantias": "                          http://127.0.0.1:8000/api/ayudantias/
contenidos": "                          http://127.0.0.1:8000/api/contenidos/
material-curso": "                      http://127.0.0.1:8000/api/material-curso/
mensajes-internos": "                   http://127.0.0.1:8000/api/mensajes-internos/
anuncios": "                            http://127.0.0.1:8000/api/anuncios/
log-autenticacion": "                   http://127.0.0.1:8000/api/log-autenticacion/
log-admin": "                           http://127.0.0.1:8000/api/log-admin/                          
roles-permisos": "                      http://127.0.0.1:8000/api/roles-permisos/