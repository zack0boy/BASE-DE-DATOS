from rest_framework import viewsets, status
from rest_framework.response import Response
from django.db import connection, transaction
from rest_framework import mixins
import oracledb
from rest_framework.views import APIView

from .serializers import (
    UsuarioSerializer, RolSerializer, AlumnoSerializer, CarreraSerializer, 
    UniversidadSerializer, SedeSerializer, TipoEvaluacionSerializer,
    TipoActividadSerializer, AsignaturaSerializer, SeccionSerializer,
    PeriodoAcademicoSerializer, InscripcionSerializer, NotaSerializer,
    EvaluacionSerializer, ActividadSerializer, PlanEstudiosSerializer, 
    AulaSerializer, PermisoSerializer, AsignaturaCarreraSerializer, 
    PrerequisitoSerializer, HorarioSerializer, AsignacionDocenteSerializer, 
    AsignacionSecretariaSerializer, AyudantiaSerializer, ContenidoSerializer, 
    MaterialCursoSerializer, MensajeInternoSerializer, AnuncioSerializer, 
    LogAutenticacionSerializer, LogUserAdminSerializer,RolPermisoSerializer 
)
from .models import (
    JngUsuario, JngRol, JngAlumno, JngCarrera, JngUniversidad, JngSede, 
    JngTipoEvaluacion, JngTipoActividad, JngAsignatura, JngSeccion,
    JngPeriodoAcademico, JngInscripcion, JngNota,
    JngEvaluacion, JngActividad, JngAula, JngPlanEstudios,JngPermiso, 
    JngAsignaturaCarrera, JngPrerequisito, JngHorario, JngAsignacionDocente, 
    JngAsignacionSecretaria, JngAyudantia, JngContenido, JngMaterialCurso, 
    JngMensajeInterno, JngAnuncio, JngLogAutenticacion, JngLogUserAdmin,JngRolPermiso 
)

def execute_sp_crud(sp_name, params=None):
    with transaction.atomic(), connection.cursor() as cursor:
        try:
            cursor.callproc(sp_name, params)
        except Exception as e:
            transaction.set_rollback(True)
            raise e

def get_db_rows_from_sp(sp_name):
    with connection.cursor() as cursor:
        raw_conn = cursor.connection 
        ref_cursor = raw_conn.cursor().var(oracledb.CURSOR)
        cursor.callproc(sp_name, [ref_cursor])
        result_cursor = ref_cursor.getvalue()
        if not result_cursor:
            return []
            
        columns = [col[0].lower() for col in result_cursor.description]
        data = [dict(zip(columns, row)) for row in result_cursor.fetchall()]
        
        return data

class SPBasedGenericViewSet(viewsets.ViewSet):
    serializer_class = None
    sp_select_name = None
    sp_insert_name = None 
    sp_update_name = None
    sp_delete_name = None

    def list(self, request):
        if not self.sp_select_name:
            return Response({'error': 'SP de SELECT no definido.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        try:
            data = get_db_rows_from_sp(self.sp_select_name)
            return Response(data)
        except Exception as e:
            return Response({'error': f'Error al listar: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def retrieve(self, request, pk=None):
        return Response({'message': 'Retrieve no implementado con SP por defecto.'}, status=status.HTTP_501_NOT_IMPLEMENTED)

class JngUsuarioViewSet(SPBasedGenericViewSet):
    serializer_class = UsuarioSerializer
    sp_select_name = 'JNG_SP_USUARIO_SELECT'
    sp_insert_name = 'JNG_SP_USUARIO_INSERT'
    sp_update_name = 'JNG_SP_USUARIO_UPDATE'
    sp_delete_name = 'JNG_SP_USUARIO_DELETE'

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            params = [
                data.get('id_rol').pk if data.get('id_rol') else None, data.get('nombre'),
                data.get('apellido'), data.get('rut'), data.get('email'), 
                data.get('password'), data.get('fecha_nac')
            ]
            try:
                execute_sp_crud(self.sp_insert_name, params)
                return Response({'message': 'Usuario creado.'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': f'Error en inserción: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            params = [
                pk, data.get('id_rol').pk if data.get('id_rol') else None, data.get('nombre'),
                data.get('apellido'), data.get('rut'), data.get('email'), 
                data.get('password'), data.get('fecha_nac'), data.get('estado')
            ]
            try:
                execute_sp_crud(self.sp_update_name, params)
                return Response({'message': f'Usuario {pk} actualizado.'})
            except Exception as e:
                return Response({'error': f'Error en actualización: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def destroy(self, request, pk=None):
        try:
            execute_sp_crud(self.sp_delete_name, [pk])
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': f'Error en eliminación: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

class JngRolViewSet(SPBasedGenericViewSet):
    serializer_class = RolSerializer
    sp_select_name = 'SP_LISTAR_ROLES'
    sp_insert_name = 'SP_INSERTAR_ROL'
    sp_update_name = 'SP_ACTUALIZAR_ROL'
    sp_delete_name = 'SP_ELIMINAR_ROL'

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            params = [data.get('nombre_rol'), data.get('descripcion')]
            try:
                execute_sp_crud(self.sp_insert_name, params)
                return Response({'message': 'Rol creado.'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': f'Error en inserción: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            params = [pk, data.get('nombre_rol'), data.get('descripcion')]
            try:
                execute_sp_crud(self.sp_update_name, params)
                return Response({'message': f'Rol {pk} actualizado.'})
            except Exception as e:
                return Response({'error': f'Error en actualización: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            execute_sp_crud(self.sp_delete_name, [pk])
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': f'Error en eliminación: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

class JngCarreraViewSet(SPBasedGenericViewSet):
    serializer_class = CarreraSerializer
    sp_select_name = 'JNG_SP_CARRERA_SELECT'
    sp_insert_name = 'JNG_SP_CARRERA_INSERT'
    sp_update_name = 'JNG_SP_CARRERA_UPDATE'
    sp_delete_name = 'JNG_SP_CARRERA_DELETE'

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            params = [data.get('nombre'), data.get('descripcion')]
            try:
                execute_sp_crud(self.sp_insert_name, params)
                return Response({'message': 'Carrera creada.'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': f'Error en inserción: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            params = [pk, data.get('nombre'), data.get('descripcion')]
            try:
                execute_sp_crud(self.sp_update_name, params)
                return Response({'message': f'Carrera {pk} actualizada.'})
            except Exception as e:
                return Response({'error': f'Error en actualización: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            execute_sp_crud(self.sp_delete_name, [pk])
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': f'Error en eliminación: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

class JngAsignaturaViewSet(SPBasedGenericViewSet):
    serializer_class = AsignaturaSerializer
    sp_select_name = 'JNG_SP_ASIGNATURA_SELECT'
    sp_insert_name = 'JNG_SP_ASIGNATURA_INSERT'
    sp_update_name = 'JNG_SP_ASIGNATURA_UPDATE'
    sp_delete_name = 'JNG_SP_ASIGNATURA_DELETE'

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            params = [data.get('nombre'), data.get('descripcion'), data.get('creditos')]
            try:
                execute_sp_crud(self.sp_insert_name, params)
                return Response({'message': 'Asignatura creada.'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': f'Error en inserción: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            params = [pk, data.get('nombre'), data.get('descripcion'), data.get('creditos')]
            try:
                execute_sp_crud(self.sp_update_name, params)
                return Response({'message': f'Asignatura {pk} actualizada.'})
            except Exception as e:
                return Response({'error': f'Error en actualización: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            execute_sp_crud(self.sp_delete_name, [pk])
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': f'Error en eliminación: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

class JngSedeViewSet(SPBasedGenericViewSet):
    serializer_class = SedeSerializer
    sp_select_name = 'JNG_SP_SEDE_SELECT'
    sp_insert_name = 'JNG_SP_SEDE_INSERT'
    sp_update_name = 'JNG_SP_SEDE_UPDATE'
    sp_delete_name = 'JNG_SP_SEDE_DELETE'

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            params = [
                data.get('id_universidad').pk if data.get('id_universidad') else None,
                data.get('nombre'), data.get('direccion')
            ]
            try:
                execute_sp_crud(self.sp_insert_name, params)
                return Response({'message': 'Sede creada.'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': f'Error en inserción: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            params = [
                pk, data.get('id_universidad').pk if data.get('id_universidad') else None,
                data.get('nombre'), data.get('direccion')
            ]
            try:
                execute_sp_crud(self.sp_update_name, params)
                return Response({'message': f'Sede {pk} actualizada.'})
            except Exception as e:
                return Response({'error': f'Error en actualización: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            execute_sp_crud(self.sp_delete_name, [pk])
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': f'Error en eliminación: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

class JngAulaViewSet(SPBasedGenericViewSet):
    serializer_class = AulaSerializer
    sp_select_name = 'JNG_SP_AULA_SELECT'
    sp_insert_name = 'JNG_SP_AULA_INSERT'
    sp_update_name = 'JNG_SP_AULA_UPDATE'
    sp_delete_name = 'JNG_SP_AULA_DELETE'

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            params = [
                data.get('id_sede').pk if data.get('id_sede') else None,
                data.get('nombre'), data.get('capacidad')
            ]
            try:
                execute_sp_crud(self.sp_insert_name, params)
                return Response({'message': 'Aula creada.'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': f'Error en inserción: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            params = [
                pk, data.get('id_sede').pk if data.get('id_sede') else None,
                data.get('nombre'), data.get('capacidad')
            ]
            try:
                execute_sp_crud(self.sp_update_name, params)
                return Response({'message': f'Aula {pk} actualizada.'})
            except Exception as e:
                return Response({'error': f'Error en actualización: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            execute_sp_crud(self.sp_delete_name, [pk])
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': f'Error en eliminación: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

class JngInscripcionViewSet(SPBasedGenericViewSet):
    serializer_class = InscripcionSerializer
    sp_select_name = 'JNG_SP_INSCRIPCION_SELECT'
    sp_insert_name = 'JNG_SP_INSCRIPCION_INSERT'
    sp_update_name = 'JNG_SP_INSCRIPCION_UPDATE'
    sp_delete_name = 'JNG_SP_INSCRIPCION_DELETE'
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            params = [
                data.get('id_alumno').pk if data.get('id_alumno') else None,
                data.get('id_seccion').pk if data.get('id_seccion') else None
            ]
            try:
                execute_sp_crud(self.sp_insert_name, params)
                return Response({'message': 'Inscripción creada.'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': f'Error en inserción: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def update(self, request, pk=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            params = [
                pk, data.get('id_alumno').pk if data.get('id_alumno') else None,
                data.get('id_seccion').pk if data.get('id_seccion') else None
            ]
            try:
                execute_sp_crud(self.sp_update_name, params)
                return Response({'message': f'Inscripción {pk} actualizada.'})
            except Exception as e:
                return Response({'error': f'Error en actualización: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            execute_sp_crud(self.sp_delete_name, [pk])
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': f'Error en eliminación: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

class JngPeriodoAcademicoViewSet(SPBasedGenericViewSet):
    serializer_class = PeriodoAcademicoSerializer
    sp_select_name = 'JNG_SP_PERIODO_SELECT'
    sp_insert_name = 'JNG_SP_PERIODO_INSERT'
    sp_update_name = 'JNG_SP_PERIODO_UPDATE'
    sp_delete_name = 'JNG_SP_PERIODO_DELETE'
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            params = [data.get('year_num'), data.get('semestre')]
            try:
                execute_sp_crud(self.sp_insert_name, params)
                return Response({'message': 'Periodo Académico creado.'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': f'Error en inserción: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def update(self, request, pk=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            params = [pk, data.get('year_num'), data.get('semestre')]
            try:
                execute_sp_crud(self.sp_update_name, params)
                return Response({'message': f'Período Académico {pk} actualizado.'})
            except Exception as e:
                return Response({'error': f'Error en actualización: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            execute_sp_crud(self.sp_delete_name, [pk])
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': f'Error en eliminación: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

class JngPlanEstudiosViewSet(SPBasedGenericViewSet):
    serializer_class = PlanEstudiosSerializer
    sp_select_name = 'JNG_SP_PLAN_SELECT'
    sp_insert_name = 'JNG_SP_PLAN_INSERT'
    sp_update_name = 'JNG_SP_PLAN_UPDATE'
    sp_delete_name = 'JNG_SP_PLAN_DELETE'

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            params = [
                data.get('id_carrera').pk if data.get('id_carrera') else None,
                data.get('year_inicio'), data.get('year_fin')
            ]
            try:
                execute_sp_crud(self.sp_insert_name, params)
                return Response({'message': 'Plan de Estudios creado.'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': f'Error en inserción: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def update(self, request, pk=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            params = [
                pk, data.get('id_carrera').pk if data.get('id_carrera') else None,
                data.get('year_inicio'), data.get('year_fin')
            ]
            try:
                execute_sp_crud(self.sp_update_name, params)
                return Response({'message': f'Plan de Estudios {pk} actualizado.'})
            except Exception as e:
                return Response({'error': f'Error en actualización: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            execute_sp_crud(self.sp_delete_name, [pk])
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': f'Error en eliminación: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

class JngSeccionViewSet(SPBasedGenericViewSet):
    serializer_class = SeccionSerializer
    sp_select_name = 'JNG_SP_SECCION_SELECT'
    sp_insert_name = 'JNG_SP_SECCION_INSERT'
    sp_update_name = 'JNG_SP_SECCION_UPDATE'
    sp_delete_name = 'JNG_SP_SECCION_DELETE'
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            params = [
                data.get('id_asignatura').pk if data.get('id_asignatura') else None,
                data.get('id_periodo').pk if data.get('id_periodo') else None,
                data.get('numero'), data.get('grupo'), data.get('cupos')
            ]
            try:
                execute_sp_crud(self.sp_insert_name, params)
                return Response({'message': 'Sección creada.'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': f'Error en inserción: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def update(self, request, pk=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            params = [
                pk, data.get('id_asignatura').pk if data.get('id_asignatura') else None,
                data.get('id_periodo').pk if data.get('id_periodo') else None,
                data.get('numero'), data.get('grupo'), data.get('cupos')
            ]
            try:
                execute_sp_crud(self.sp_update_name, params)
                return Response({'message': f'Sección {pk} actualizada.'})
            except Exception as e:
                return Response({'error': f'Error en actualización: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            execute_sp_crud(self.sp_delete_name, [pk])
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': f'Error en eliminación: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

class JngNotaViewSet(SPBasedGenericViewSet):
    serializer_class = NotaSerializer
    sp_select_name = 'JNG_SP_NOTA_SELECT'
    sp_insert_name = 'JNG_SP_NOTA_INSERT'
    sp_update_name = 'JNG_SP_NOTA_UPDATE'
    sp_delete_name = 'JNG_SP_NOTA_DELETE'
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            params = [
                data.get('id_alumno').pk if data.get('id_alumno') else None,
                data.get('id_evaluacion').pk if data.get('id_evaluacion') else None,
                data.get('nota')
            ]
            try:
                execute_sp_crud(self.sp_insert_name, params)
                return Response({'message': 'Nota creada.'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': f'Error en inserción: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def update(self, request, pk=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            params = [
                pk, data.get('id_alumno').pk if data.get('id_alumno') else None,
                data.get('id_evaluacion').pk if data.get('id_evaluacion') else None,
                data.get('nota')
            ]
            try:
                execute_sp_crud(self.sp_update_name, params)
                return Response({'message': f'Nota {pk} actualizada.'})
            except Exception as e:
                return Response({'error': f'Error en actualización: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            execute_sp_crud(self.sp_delete_name, [pk])
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': f'Error en eliminación: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

class JngAlumnoViewSet(SPBasedGenericViewSet):
    serializer_class = AlumnoSerializer
    sp_select_name = 'JNG_SP_ALUMNO_SELECT'
    sp_insert_name = 'JNG_SP_ALUMNO_INSERT'
    sp_update_name = 'JNG_SP_ALUMNO_UPDATE'
    sp_delete_name = 'JNG_SP_ALUMNO_DELETE'
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            params = [
                data.get('id_usuario').pk if data.get('id_usuario') else None,
                data.get('id_carrera').pk if data.get('id_carrera') else None,
                data.get('fecha_ingreso')
            ]
            try:
                execute_sp_crud(self.sp_insert_name, params)
                return Response({'message': 'Alumno creado.'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': f'Error en inserción: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def update(self, request, pk=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            params = [
                pk, data.get('id_carrera').pk if data.get('id_carrera') else None,
                data.get('fecha_ingreso')
            ]
            try:
                execute_sp_crud(self.sp_update_name, params)
                return Response({'message': f'Alumno {pk} actualizado.'})
            except Exception as e:
                return Response({'error': f'Error en actualización: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            execute_sp_crud(self.sp_delete_name, [pk])
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': f'Error en eliminación: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
class LoginView(APIView):
    def post(self, request):
        rut = request.data.get("rut")
        password = request.data.get("password")

        # Validación básica
        if not rut or not password:
            return Response(
                {"detail": "RUT y contraseña son obligatorios"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            usuario = JngUsuario.objects.get(rut=rut)
        except JngUsuario.DoesNotExist:
            return Response(
                {"detail": "Usuario no encontrado"},
                status=status.HTTP_404_NOT_FOUND
            )

        # Comparación de contraseña (sin hashing, como tu BD actual)
        if usuario.password != password:
            return Response(
                {"detail": "Contraseña incorrecta"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Respuesta para tu Angular (estructura actual que ya funciona)
        return Response({
            "message": "Login correcto",
            "id_usuario": usuario.id_usuario,
            "id_rol": usuario.id_rol_id,  # importante usar _id
            "nombre": usuario.nombre,
            "apellido": usuario.apellido
        }, status=status.HTTP_200_OK)

class JngUniversidadModelViewSet(viewsets.ModelViewSet):
    queryset = JngUniversidad.objects.all()
    serializer_class = UniversidadSerializer

class JngTipoEvaluacionModelViewSet(viewsets.ModelViewSet):
    queryset = JngTipoEvaluacion.objects.all()
    serializer_class = TipoEvaluacionSerializer

class JngTipoActividadModelViewSet(viewsets.ModelViewSet):
    queryset = JngTipoActividad.objects.all()
    serializer_class = TipoActividadSerializer

class JngEvaluacionModelViewSet(viewsets.ModelViewSet):
    queryset = JngEvaluacion.objects.all()
    serializer_class = EvaluacionSerializer

class JngActividadModelViewSet(viewsets.ModelViewSet):
    queryset = JngActividad.objects.all()
    serializer_class = ActividadSerializer

class JngPermisoModelViewSet(viewsets.ModelViewSet):
    queryset = JngPermiso.objects.all()
    serializer_class = PermisoSerializer

class JngAsignaturaCarreraModelViewSet(viewsets.ModelViewSet):
    queryset = JngAsignaturaCarrera.objects.all()
    serializer_class = AsignaturaCarreraSerializer

class JngPrerequisitoModelViewSet(viewsets.ModelViewSet):
    queryset = JngPrerequisito.objects.all()
    serializer_class = PrerequisitoSerializer

class JngHorarioModelViewSet(viewsets.ModelViewSet):
    queryset = JngHorario.objects.all()
    serializer_class = HorarioSerializer

class JngAsignacionDocenteModelViewSet(viewsets.ModelViewSet):
    queryset = JngAsignacionDocente.objects.all()
    serializer_class = AsignacionDocenteSerializer

class JngAsignacionSecretariaModelViewSet(viewsets.ModelViewSet):
    queryset = JngAsignacionSecretaria.objects.all()
    serializer_class = AsignacionSecretariaSerializer

class JngAyudantiaModelViewSet(viewsets.ModelViewSet):
    queryset = JngAyudantia.objects.all()
    serializer_class = AyudantiaSerializer

class JngContenidoModelViewSet(viewsets.ModelViewSet):
    queryset = JngContenido.objects.all()
    serializer_class = ContenidoSerializer

class JngMaterialCursoModelViewSet(viewsets.ModelViewSet):
    queryset = JngMaterialCurso.objects.all()
    serializer_class = MaterialCursoSerializer

class JngMensajeInternoModelViewSet(viewsets.ModelViewSet):
    queryset = JngMensajeInterno.objects.all()
    serializer_class = MensajeInternoSerializer

class JngAnuncioModelViewSet(viewsets.ModelViewSet):
    queryset = JngAnuncio.objects.all()
    serializer_class = AnuncioSerializer
    
class JngLogAutenticacionModelViewSet(viewsets.ModelViewSet):
    queryset = JngLogAutenticacion.objects.all()
    serializer_class = LogAutenticacionSerializer

class JngLogUserAdminModelViewSet(viewsets.ModelViewSet):
    queryset = JngLogUserAdmin.objects.all()
    serializer_class = LogUserAdminSerializer

