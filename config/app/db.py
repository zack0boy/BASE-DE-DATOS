from django.db import connection

def _rows_from_cursor(cur):
    cols = [c[0].lower() for c in cur.description]
    return [dict(zip(cols, r)) for r in cur.fetchall()]

def call_refcursor(proc_name, in_params=None):
    in_params = in_params or []
    with connection.cursor() as cursor:
        out_cur = cursor.cursor()
        params = in_params + [out_cur]
        cursor.callproc(proc_name, params)
        return _rows_from_cursor(out_cur)


# ========== LOGIN ==========

def sp_login(email: str, password: str):
    rows = call_refcursor("JNG_SP_LOGIN", [email, password])
    return rows[0] if rows else None


# ========== USUARIOS ==========

def sp_crear_usuario(id_rol, nombre, email, password):
    with connection.cursor() as cursor:
        cursor.callproc("JNG_SP_CREAR_USUARIO", [id_rol, nombre, email, password])

def sp_listar_usuarios():
    return call_refcursor("JNG_SP_LISTAR_USUARIOS")

def sp_obtener_usuario(id_usuario: int):
    rows = call_refcursor("JNG_SP_OBTENER_USUARIO", [id_usuario])
    return rows[0] if rows else None

def sp_actualizar_usuario(id_usuario, nombre, email, password, estado):
    with connection.cursor() as cursor:
        cursor.callproc(
            "JNG_SP_ACTUALIZAR_USUARIO",
            [id_usuario, nombre, email, password, estado],
        )

def sp_eliminar_usuario(id_usuario: int):
    with connection.cursor() as cursor:
        cursor.callproc("JNG_SP_ELIMINAR_USUARIO", [id_usuario])


# ========== ALUMNOS ==========

def sp_crear_alumno(id_usuario: int, nombre: str):
    with connection.cursor() as cursor:
        cursor.callproc("JNG_SP_CREAR_ALUMNO", [id_usuario, nombre])

def sp_listar_alumnos():
    return call_refcursor("JNG_SP_LISTAR_ALUMNOS")

def sp_obtener_alumno(id_alumno: int):
    rows = call_refcursor("JNG_SP_OBTENER_ALUMNO", [id_alumno])
    return rows[0] if rows else None

def sp_actualizar_alumno(id_alumno: int, id_usuario: int, nombre: str):
    with connection.cursor() as cursor:
        cursor.callproc(
            "JNG_SP_ACTUALIZAR_ALUMNO",
            [id_alumno, id_usuario, nombre],
        )

def sp_eliminar_alumno(id_alumno: int):
    with connection.cursor() as cursor:
        cursor.callproc("JNG_SP_ELIMINAR_ALUMNO", [id_alumno])


# ========== CURSOS ==========

def sp_listar_cursos():
    # versión con JOIN a carrera
    return call_refcursor("JNG_SP_LISTAR_CURSOS")

def sp_listar_cursos_v2():
    # versión SELECT * FROM JNG_CURSO
    return call_refcursor("JNG_SP_LISTAR_CURSOS_V2")

def sp_update_curso(id_curso, id_asignatura, id_docente, seccion, cupo_maximo):
    with connection.cursor() as cursor:
        cursor.callproc(
            "JNG_SP_ACTUALIZAR_CURSO",
            [id_curso, id_asignatura, id_docente, seccion, cupo_maximo],
        )

def sp_eliminar_curso(id_curso: int):
    with connection.cursor() as cursor:
        cursor.callproc("JNG_SP_ELIMINAR_CURSO", [id_curso])
