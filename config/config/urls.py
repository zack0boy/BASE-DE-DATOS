# app/urls.py
from django.urls import path
from app import views

urlpatterns = [
    path("auth/login/", views.login_view),

    path("usuarios/", views.usuarios_view),
    path("usuarios/<int:id_usuario>/", views.usuario_detail_view),

    path("alumnos/", views.alumnos_view),
    path("alumnos/<int:id_alumno>/", views.alumno_detail_view),

    path("cursos/", views.cursos_view),
    path("cursos/<int:id_curso>/", views.curso_detail_view),
]
