from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    JngUsuarioViewSet, JngRolViewSet, JngAlumnoViewSet, JngCarreraViewSet, 
    JngAsignaturaViewSet, JngSeccionViewSet, JngPeriodoAcademicoViewSet, 
    JngInscripcionViewSet, JngNotaViewSet, JngAulaViewSet, JngPlanEstudiosViewSet,
    JngSedeViewSet,JngUniversidadModelViewSet, JngTipoEvaluacionModelViewSet, 
    JngTipoActividadModelViewSet, JngEvaluacionModelViewSet, JngActividadModelViewSet,
    JngPermisoModelViewSet, JngAsignaturaCarreraModelViewSet, 
    JngPrerequisitoModelViewSet, JngHorarioModelViewSet, 
    JngAsignacionDocenteModelViewSet, JngAsignacionSecretariaModelViewSet, 
    JngAyudantiaModelViewSet, JngContenidoModelViewSet, 
    JngMaterialCursoModelViewSet, JngMensajeInternoModelViewSet, 
    JngAnuncioModelViewSet, JngLogAutenticacionModelViewSet, 
    JngLogUserAdminModelViewSet, LoginView
)

router = DefaultRouter()


router.register(r'usuarios', JngUsuarioViewSet, basename='usuarios')
router.register(r'roles', JngRolViewSet, basename='roles')
router.register(r'alumnos', JngAlumnoViewSet, basename='alumnos')
router.register(r'carreras', JngCarreraViewSet, basename='carreras')
router.register(r'asignaturas', JngAsignaturaViewSet, basename='asignaturas')
router.register(r'secciones', JngSeccionViewSet, basename='secciones')
router.register(r'periodos', JngPeriodoAcademicoViewSet, basename='periodos')
router.register(r'inscripciones', JngInscripcionViewSet, basename='inscripciones')
router.register(r'notas', JngNotaViewSet, basename='notas')
router.register(r'aulas', JngAulaViewSet, basename='aulas')
router.register(r'planes-estudio', JngPlanEstudiosViewSet, basename='planes-estudio')
router.register(r'sedes', JngSedeViewSet, basename='sedes') 
router.register(r'universidades', JngUniversidadModelViewSet, basename='universidades')
router.register(r'tipos-evaluacion', JngTipoEvaluacionModelViewSet, basename='tipos-evaluacion')
router.register(r'tipos-actividad', JngTipoActividadModelViewSet, basename='tipos-actividad')
router.register(r'evaluaciones', JngEvaluacionModelViewSet, basename='evaluaciones')
router.register(r'actividades', JngActividadModelViewSet, basename='actividades')
router.register(r'permisos', JngPermisoModelViewSet, basename='permisos')
router.register(r'asignaturas-carrera', JngAsignaturaCarreraModelViewSet, basename='asignaturas-carrera')
router.register(r'prerequisitos', JngPrerequisitoModelViewSet, basename='prerequisitos')
router.register(r'horarios', JngHorarioModelViewSet, basename='horarios')
router.register(r'asignaciones-docente', JngAsignacionDocenteModelViewSet, basename='asignaciones-docente')
router.register(r'asignaciones-secretaria', JngAsignacionSecretariaModelViewSet, basename='asignaciones-secretaria')
router.register(r'ayudantias', JngAyudantiaModelViewSet, basename='ayudantias')
router.register(r'contenidos', JngContenidoModelViewSet, basename='contenidos')
router.register(r'material-curso', JngMaterialCursoModelViewSet, basename='material-curso')
router.register(r'mensajes-internos', JngMensajeInternoModelViewSet, basename='mensajes-internos')
router.register(r'anuncios', JngAnuncioModelViewSet, basename='anuncios')
router.register(r'log-autenticacion', JngLogAutenticacionModelViewSet, basename='log-autenticacion')
router.register(r'log-admin', JngLogUserAdminModelViewSet, basename='log-admin')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
]