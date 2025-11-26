# urls.py de la app

from rest_framework.routers import DefaultRouter
from app.views import (
    CursoViewSet, EstudianteViewSet, MatriculaViewSet,
    TareaViewSet, EntregaViewSet, RecursoViewSet,
    ForoViewSet, PublicacionViewSet
)

router = DefaultRouter()
router.register(r'cursos', CursoViewSet, basename='curso')
router.register(r'estudiantes', EstudianteViewSet, basename='estudiante')
router.register(r'matriculas', MatriculaViewSet, basename='matricula')
router.register(r'tareas', TareaViewSet, basename='tarea')
router.register(r'entregas', EntregaViewSet, basename='entrega')
router.register(r'recursos', RecursoViewSet, basename='recurso')
router.register(r'foros', ForoViewSet, basename='foro')
router.register(r'publicaciones', PublicacionViewSet, basename='publicacion')

urlpatterns = router.urls

from django.urls import path, include

urlpatterns = [
    path('api/', include('app.urls')),
]
