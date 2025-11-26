# app/serializers.py
from rest_framework import serializers
from django.apps import apps

# Generador de serializers dinámico
serializers_map = {}

for model in apps.get_app_config('app').get_models():
    meta = type("Meta", (), {"model": model, "fields": "__all__"})
    serializer_class = type(f"{model.__name__}Serializer", (serializers.ModelSerializer,), {"Meta": meta})
    serializers_map[model.__name__] = serializer_class

# Exportar convenientemente
def get_serializer_for_model(model):
    return serializers_map[model.__name__]

from .models import (
    Administrativo, Asistencia, Carrera, Certificado, Curso, Docente,
    Encuesta, Entrega, Estudiante, Evaluacion, Foro, Horario,
    LogAuditoria, LogError, Matricula, Mensaje, Nota, Publicacion,
    Recurso, RespuestaEncuesta, Rol, Tarea, Usuario
)


class AdministrativoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrativo
        fields = "__all__"


class AsistenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asistencia
        fields = "__all__"


class CarreraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrera
        fields = "__all__"


class CertificadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificado
        fields = "__all__"


class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = "__all__"


class DocenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Docente
        fields = "__all__"


class EncuestaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Encuesta
        fields = "__all__"


class EntregaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entrega
        fields = "__all__"


class EstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiante
        fields = "__all__"


class EvaluacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evaluacion
        fields = "__all__"


class ForoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Foro
        fields = "__all__"


class HorarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Horario
        fields = "__all__"


class LogAuditoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogAuditoria
        fields = "__all__"


class LogErrorSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogError
        fields = "__all__"


class MatriculaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matricula
        fields = "__all__"


class MensajeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mensaje
        fields = "__all__"


class NotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nota
        fields = "__all__"


class PublicacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publicacion
        fields = "__all__"


class RecursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recurso
        fields = "__all__"


class RespuestaEncuestaSerializer(serializers.ModelSerializer):
    class Meta:
        model = RespuestaEncuesta
        fields = "__all__"


class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = "__all__"


class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = "__all__"


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = "__all__"
