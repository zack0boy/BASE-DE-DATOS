# app/views.py
from rest_framework import viewsets
from django.apps import apps
from .serializers import get_serializer_for_model
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class GenericModelViewSet(viewsets.ModelViewSet):
    """
    ViewSet genérico: queryset y serializer son inyectados en tiempo de registro.
    """
    permission_classes = [IsAuthenticatedOrReadOnly]

# Función para crear y registrar viewsets dinámicamente
def create_viewsets():
    viewsets_map = {}
    for model in apps.get_app_config('app').get_models():
        serializer = get_serializer_for_model(model)
        attrs = {
            "queryset": model.objects.all(),
            "serializer_class": serializer,
        }
        vs_class = type(f"{model.__name__}ViewSet", (GenericModelViewSet,), attrs)
        viewsets_map[model.__name__] = vs_class
    return viewsets_map

# views.py

from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import (
    Curso, Estudiante, Matricula, Tarea, Entrega,
    Recurso, Foro, Publicacion
)
from .serializers import (
    CursoSerializer, EstudianteSerializer, MatriculaSerializer,
    TareaSerializer, EntregaSerializer, RecursoSerializer,
    ForoSerializer, PublicacionSerializer
)

class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class EstudianteViewSet(viewsets.ModelViewSet):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class MatriculaViewSet(viewsets.ModelViewSet):
    queryset = Matricula.objects.all()
    serializer_class = MatriculaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class EntregaViewSet(viewsets.ModelViewSet):
    queryset = Entrega.objects.all()
    serializer_class = EntregaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class RecursoViewSet(viewsets.ModelViewSet):
    queryset = Recurso.objects.all()
    serializer_class = RecursoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class ForoViewSet(viewsets.ModelViewSet):
    queryset = Foro.objects.all()
    serializer_class = ForoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class PublicacionViewSet(viewsets.ModelViewSet):
    queryset = Publicacion.objects.all()
    serializer_class = PublicacionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

# Crear viewsets dinámicamente para otros modelos
dynamic_viewsets = create_viewsets()    