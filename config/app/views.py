# app/views.py
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from app.db import (
    sp_login,
    sp_crear_usuario, sp_listar_usuarios, sp_obtener_usuario,
    sp_actualizar_usuario, sp_eliminar_usuario,
    sp_crear_alumno, sp_listar_alumnos, sp_obtener_alumno,
    sp_actualizar_alumno, sp_eliminar_alumno,
    sp_listar_cursos, sp_listar_cursos_v2,
    sp_update_curso, sp_eliminar_curso,
)
from .auth_utils import crear_token, verificar_token
from functools import wraps

def require_auth(view_func):
    @wraps(view_func)
    def wrapped(request, *args, **kwargs):
        auth_header = request.META.get("HTTP_AUTHORIZATION", "")
        if not auth_header.startswith("Bearer "):
            return JsonResponse({"detail": "No autenticado"}, status=401)
        token = auth_header.split(" ", 1)[1]
        payload = verificar_token(token)
        if not payload:
            return JsonResponse({"detail": "Token inválido o expirado"}, status=401)
        request.user_payload = payload
        return view_func(request, *args, **kwargs)
    return wrapped


@csrf_exempt
def login_view(request):
    if request.method != "POST":
        return JsonResponse({"detail": "Método no permitido"}, status=405)

    try:
        body = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"detail": "JSON inválido"}, status=400)

    email = body.get("email")
    password = body.get("password")

    if not email or not password:
        return JsonResponse({"detail": "Email y password requeridos"}, status=400)

    usuario = sp_login(email, password)
    if not usuario or usuario.get("id_usuario") is None:
        return JsonResponse({"detail": "Credenciales inválidas"}, status=401)

    token = crear_token(usuario)
    return JsonResponse({"token": token, "usuario": usuario}, status=200)


"""Desde tu pantalla de login (frontend) solo necesitas hacer un POST a /auth/login/ con:
json
{ "email": "user@dominio.cl", "password": "1234" }"""


@csrf_exempt
@require_auth
def usuarios_view(request):
    if request.method == "GET":
        data = sp_listar_usuarios()
        return JsonResponse(data, safe=False, status=200)

    if request.method == "POST":
        try:
            body = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"detail": "JSON inválido"}, status=400)

        sp_crear_usuario(
            body["id_rol"],
            body["nombre"],
            body["email"],
            body["password"],
        )
        return JsonResponse({"detail": "Usuario creado"}, status=201)

    return JsonResponse({"detail": "Método no permitido"}, status=405)


@csrf_exempt
@require_auth
def usuarios_view(request):
    if request.method == "GET":  # sp_listar_usuarios
        data = sp_listar_usuarios()
        return JsonResponse(data, safe=False, status=200)

    if request.method == "POST":  # sp_crear_usuario
        try:
            body = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"detail": "JSON inválido"}, status=400)

        sp_crear_usuario(
            body["id_rol"],
            body["nombre"],
            body["email"],
            body["password"],
        )
        return JsonResponse({"detail": "Usuario creado"}, status=201)

    return JsonResponse({"detail": "Método no permitido"}, status=405)


@csrf_exempt
@require_auth
def usuario_detail_view(request, id_usuario):
    if request.method == "GET":  # sp_obtener_usuario
        user = sp_obtener_usuario(id_usuario)
        if not user:
            return JsonResponse({"detail": "No encontrado"}, status=404)
        return JsonResponse(user, status=200)

    if request.method == "PUT":  # sp_actualizar_usuario
        try:
            body = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"detail": "JSON inválido"}, status=400)

        sp_actualizar_usuario(
            id_usuario,
            body["nombre"],
            body["email"],
            body["password"],
            body["estado"],
        )
        return JsonResponse({"detail": "Actualizado"}, status=200)

    if request.method == "DELETE":  # sp_eliminar_usuario
        sp_eliminar_usuario(id_usuario)
        return JsonResponse({"detail": "Eliminado"}, status=204)

    return JsonResponse({"detail": "Método no permitido"}, status=405)


@csrf_exempt
@require_auth
def alumnos_view(request):
    if request.method == "GET":
        data = sp_listar_alumnos()
        return JsonResponse(data, safe=False, status=200)

    if request.method == "POST":
        try:
            body = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"detail": "JSON inválido"}, status=400)

        sp_crear_alumno(
            body["id_usuario"],
            body["nombre"],
        )
        return JsonResponse({"detail": "Alumno creado"}, status=201)

    return JsonResponse({"detail": "Método no permitido"}, status=405)


@csrf_exempt
@require_auth
def alumno_detail_view(request, id_alumno):
    if request.method == "GET":
        alumno = sp_obtener_alumno(id_alumno)
        if not alumno:
            return JsonResponse({"detail": "No encontrado"}, status=404)
        return JsonResponse(alumno, status=200)

    if request.method == "PUT":
        try:
            body = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"detail": "JSON inválido"}, status=400)

        sp_actualizar_alumno(
            id_alumno,
            body["id_usuario"],
            body["nombre"],
        )
        return JsonResponse({"detail": "Actualizado"}, status=200)

    if request.method == "DELETE":
        sp_eliminar_alumno(id_alumno)
        return JsonResponse({"detail": "Eliminado"}, status=204)

    return JsonResponse({"detail": "Método no permitido"}, status=405)
@csrf_exempt
@require_auth
def cursos_view(request):
    if request.method == "GET":
        # puedes usar sp_listar_cursos() o sp_listar_cursos_v2() según lo que necesites
        data = sp_listar_cursos()
        return JsonResponse(data, safe=False, status=200)

    # si quieres crear cursos llamando INSERT directo o un SP,
    # agrega aquí el POST y llama al SP de inserción que definiste
    return JsonResponse({"detail": "Método no permitido"}, status=405)


@csrf_exempt
@require_auth
def curso_detail_view(request, id_curso):
    if request.method == "GET":
        # usa v2 que hace SELECT * FROM JNG_CURSO y luego filtras en Python
        cursos = sp_listar_cursos_v2()
        curso = next((c for c in cursos if c["id_curso"] == id_curso), None)
        if not curso:
            return JsonResponse({"detail": "No encontrado"}, status=404)
        return JsonResponse(curso, status=200)

    if request.method == "PUT":
        try:
            body = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"detail": "JSON inválido"}, status=400)

        sp_update_curso(
            id_curso,
            body["id_asignatura"],
            body["id_docente"],
            body["seccion"],
            body["cupo_maximo"],
        )
        return JsonResponse({"detail": "Actualizado"}, status=200)

    if request.method == "DELETE":
        sp_eliminar_curso(id_curso)
        return JsonResponse({"detail": "Eliminado"}, status=204)

    return JsonResponse({"detail": "Método no permitido"}, status=405)


