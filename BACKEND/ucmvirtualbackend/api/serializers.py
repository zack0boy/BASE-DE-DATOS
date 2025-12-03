from rest_framework import serializers
from .models import (
    JngUsuario, JngRol, JngPermiso, JngRolPermiso, JngUniversidad, JngSede,
    JngCarrera, JngPlanEstudios, JngAsignatura, JngAsignaturaCarrera,
    JngPrerequisito, JngPeriodoAcademico, JngSeccion, JngAula, JngHorario,
    JngAsignacionDocente, JngAsignacionSecretaria, JngAyudantia, JngAlumno,
    JngInscripcion, JngTipoEvaluacion, JngEvaluacion, JngNota,
    JngTipoActividad, JngActividad, JngContenido, JngMaterialCurso,
    JngMensajeInterno, JngAnuncio, JngLogAutenticacion, JngLogUserAdmin
)

class PermisoSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngPermiso
        fields = '__all__'

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngRol
        fields = '__all__'

class RolPermisoSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngRolPermiso
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngUsuario
        fields = '__all__'
        read_only_fields = ('created_at',)

class UniversidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngUniversidad
        fields = '__all__'

class SedeSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngSede
        fields = '__all__'

class CarreraSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngCarrera
        fields = '__all__'

class PlanEstudiosSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngPlanEstudios
        fields = '__all__'

class AsignaturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngAsignatura
        fields = '__all__'

class AsignaturaCarreraSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngAsignaturaCarrera
        fields = '__all__'

class PrerequisitoSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngPrerequisito
        fields = '__all__'

class PeriodoAcademicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngPeriodoAcademico
        fields = '__all__'

class SeccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngSeccion
        fields = '__all__'

class AulaSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngAula
        fields = '__all__'

class HorarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngHorario
        fields = '__all__'

class AsignacionDocenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngAsignacionDocente
        fields = '__all__'

class AsignacionSecretariaSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngAsignacionSecretaria
        fields = '__all__'

class AyudantiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngAyudantia
        fields = '__all__'

class AlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngAlumno
        fields = '__all__'

class InscripcionSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngInscripcion
        fields = '__all__'

class TipoEvaluacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngTipoEvaluacion
        fields = '__all__'

class EvaluacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngEvaluacion
        fields = '__all__'

class NotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngNota
        fields = '__all__'

class TipoActividadSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngTipoActividad
        fields = '__all__'

class ActividadSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngActividad
        fields = '__all__'

class ContenidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngContenido
        fields = '__all__'

class MaterialCursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngMaterialCurso
        fields = '__all__'

class MensajeInternoSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngMensajeInterno
        fields = '__all__'

class AnuncioSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngAnuncio
        fields = '__all__'

class LogAutenticacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngLogAutenticacion
        fields = '__all__'

class LogUserAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = JngLogUserAdmin
        fields = '__all__'