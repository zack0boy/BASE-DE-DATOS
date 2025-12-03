from django.db import models


class JngActividad(models.Model):
    id_actividad = models.IntegerField(primary_key=True)
    id_seccion = models.ForeignKey('JngSeccion', models.DO_NOTHING, db_column='id_seccion', blank=True, null=True)
    id_tipo_actividad = models.ForeignKey('JngTipoActividad', models.DO_NOTHING, db_column='id_tipo_actividad', blank=True, null=True)
    descripcion = models.CharField(max_length=1000, blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)

    class Meta:
        db_table = 'jng_actividad'
        managed = False


class JngAlumno(models.Model):
    id_alumno = models.IntegerField(primary_key=True)
    id_usuario = models.ForeignKey('JngUsuario', models.DO_NOTHING, db_column='id_usuario', blank=True, null=True)
    id_carrera = models.ForeignKey('JngCarrera', models.DO_NOTHING, db_column='id_carrera')
    fecha_ingreso = models.DateField(blank=True, null=True)

    class Meta:
        db_table = 'jng_alumno'
        managed = False


class JngAnuncio(models.Model):
    id_anuncio = models.IntegerField(primary_key=True)
    id_usuario = models.ForeignKey('JngUsuario', models.DO_NOTHING, db_column='id_usuario', blank=True, null=True)
    id_seccion = models.ForeignKey('JngSeccion', models.DO_NOTHING, db_column='id_seccion', blank=True, null=True)
    id_carrera = models.ForeignKey('JngCarrera', models.DO_NOTHING, db_column='id_carrera', blank=True, null=True)
    titulo = models.CharField(max_length=400, blank=True, null=True)
    contenido = models.CharField(max_length=4000, blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)

    class Meta:
        db_table = 'jng_anuncio'
        managed = False


class JngAsignacionDocente(models.Model):
    id_asignacion_docente = models.IntegerField(primary_key=True)
    id_usuario = models.ForeignKey('JngUsuario', models.DO_NOTHING, db_column='id_usuario', blank=True, null=True)
    id_seccion = models.ForeignKey('JngSeccion', models.DO_NOTHING, db_column='id_seccion', blank=True, null=True)

    class Meta:
        db_table = 'jng_asignacion_docente'
        managed = False


class JngAsignacionSecretaria(models.Model):
    id_asignacion_secretaria = models.IntegerField(primary_key=True)
    id_usuario = models.ForeignKey('JngUsuario', models.DO_NOTHING, db_column='id_usuario', blank=True, null=True)
    id_sede = models.ForeignKey('JngSede', models.DO_NOTHING, db_column='id_sede', blank=True, null=True)
    area = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        db_table = 'jng_asignacion_secretaria'
        managed = False


class JngAsignatura(models.Model):
    id_asignatura = models.IntegerField(primary_key=True)
    id_carrera = models.ForeignKey('JngCarrera', models.DO_NOTHING, db_column='id_carrera', blank=True, null=True)
    nombre = models.CharField(max_length=300, blank=True, null=True)
    codigo = models.CharField(max_length=100, blank=True, null=True)
    creditos = models.IntegerField(blank=True, null=True)
    descripcion = models.CharField(max_length=500, blank=True, null=True)

    class Meta:
        db_table = 'jng_asignatura'
        managed = False


class JngAsignaturaCarrera(models.Model):
    id_plan = models.OneToOneField( 
        'JngPlanEstudios', 
        models.DO_NOTHING, 
        db_column='ID_PLAN',
        primary_key=True      
    ) 
    
    id_asignatura = models.ForeignKey(
        'JngAsignatura', 
        models.DO_NOTHING, 
        db_column='ID_ASIGNATURA' 
    )
    
    semestre = models.IntegerField(db_column='SEMESTRE', blank=True, null=True)
    
    class Meta:
        db_table = 'JNG_ASIGNATURA_CARRERA'
        managed = False
        unique_together = (('id_plan', 'id_asignatura'),)


class JngAula(models.Model):
    id_aula = models.IntegerField(primary_key=True)
    id_sede = models.ForeignKey('JngSede', models.DO_NOTHING, db_column='id_sede', blank=True, null=True)
    nombre = models.CharField(max_length=200, blank=True, null=True)
    capacidad = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'jng_aula'
        managed = False


class JngAyudantia(models.Model):
    id_ayudantia = models.IntegerField(primary_key=True)
    id_usuario = models.ForeignKey('JngUsuario', models.DO_NOTHING, db_column='id_usuario', blank=True, null=True)
    id_carrera = models.ForeignKey('JngCarrera', models.DO_NOTHING, db_column='id_carrera', blank=True, null=True)
    id_seccion = models.ForeignKey('JngSeccion', models.DO_NOTHING, db_column='id_seccion', blank=True, null=True)

    class Meta:
        db_table = 'jng_ayudantia'
        managed = False


class JngCarrera(models.Model):
    id_carrera = models.IntegerField(primary_key=True)
    id_sede = models.ForeignKey('JngSede', models.DO_NOTHING, db_column='id_sede', blank=True, null=True)
    nombre = models.CharField(max_length=300, blank=True, null=True)
    descripcion = models.CharField(max_length=1000, blank=True, null=True)
    id_director = models.ForeignKey('JngUsuario', models.DO_NOTHING, db_column='id_director', blank=True, null=True)

    class Meta:
        db_table = 'jng_carrera'
        managed = False


class JngContenido(models.Model):
    id_contenido = models.IntegerField(primary_key=True)
    id_asignatura = models.ForeignKey('JngAsignatura', models.DO_NOTHING, db_column='id_asignatura', blank=True, null=True)
    titulo = models.CharField(max_length=400, blank=True, null=True)
    descripcion = models.CharField(max_length=2000, blank=True, null=True)

    class Meta:
        db_table = 'jng_contenido'
        managed = False


class JngEvaluacion(models.Model):
    id_evaluacion = models.IntegerField(primary_key=True)
    id_seccion = models.ForeignKey('JngSeccion', models.DO_NOTHING, db_column='id_seccion', blank=True, null=True)
    id_tipo_evaluacion = models.ForeignKey('JngTipoEvaluacion', models.DO_NOTHING, db_column='id_tipo_evaluacion', blank=True, null=True)
    titulo = models.CharField(max_length=400, blank=True, null=True)
    porcentaje = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

    class Meta:
        db_table = 'jng_evaluacion'
        managed = False


class JngHorario(models.Model):
    id_horario = models.IntegerField(primary_key=True)
    id_seccion = models.ForeignKey('JngSeccion', models.DO_NOTHING, db_column='id_seccion', blank=True, null=True)
    id_aula = models.ForeignKey(JngAula, models.DO_NOTHING, db_column='id_aula', blank=True, null=True)
    dia_semana = models.CharField(max_length=20, blank=True, null=True)
    hora_inicio = models.DateTimeField(blank=True, null=True)
    hora_fin = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'jng_horario'
        managed = False


class JngInscripcion(models.Model):
    id_inscripcion = models.IntegerField(primary_key=True)
    id_alumno = models.ForeignKey(JngAlumno, models.DO_NOTHING, db_column='id_alumno', blank=True, null=True)
    id_seccion = models.ForeignKey('JngSeccion', models.DO_NOTHING, db_column='id_seccion', blank=True, null=True)

    class Meta:
        db_table = 'jng_inscripcion'
        managed = False


class JngLogAutenticacion(models.Model):
    id_log_auth = models.IntegerField(primary_key=True)
    id_usuario = models.ForeignKey('JngUsuario', models.DO_NOTHING, db_column='id_usuario', blank=True, null=True)
    fecha_intento = models.DateTimeField(blank=True, null=True)
    resultado = models.CharField(max_length=50, blank=True, null=True)
    ip_address = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        db_table = 'jng_log_autenticacion'
        managed = False


class JngLogUserAdmin(models.Model):
    id_log_admin = models.IntegerField(primary_key=True)
    id_usuario = models.ForeignKey('JngUsuario', models.DO_NOTHING, db_column='id_usuario', blank=True, null=True)
    accion = models.CharField(max_length=200, blank=True, null=True)
    tabla_afectada = models.CharField(max_length=100, blank=True, null=True)
    fecha_accion = models.DateTimeField(blank=True, null=True)
    detalles = models.CharField(max_length=2000, blank=True, null=True)

    class Meta:
        db_table = 'jng_log_user_admin'
        managed = False


class JngMaterialCurso(models.Model):
    id_material = models.IntegerField(primary_key=True)
    id_seccion = models.ForeignKey('JngSeccion', models.DO_NOTHING, db_column='id_seccion', blank=True, null=True)
    id_usuario = models.ForeignKey('JngUsuario', models.DO_NOTHING, db_column='id_usuario', blank=True, null=True)
    titulo = models.CharField(max_length=400, blank=True, null=True)
    url = models.CharField(max_length=2000, blank=True, null=True)
    fecha_subida = models.DateField(blank=True, null=True)

    class Meta:
        db_table = 'jng_material_curso'
        managed = False


class JngMensajeInterno(models.Model):
    id_mensaje = models.IntegerField(primary_key=True)
    id_usuario_envia = models.ForeignKey('JngUsuario', models.DO_NOTHING, db_column='id_usuario_envia', blank=True, null=True)
    id_usuario_recibe = models.ForeignKey('JngUsuario', models.DO_NOTHING, db_column='id_usuario_recibe', related_name='jngmensajeinterno_id_usuario_recibe_set', blank=True, null=True)
    contenido = models.CharField(max_length=4000, blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)

    class Meta:
        db_table = 'jng_mensaje_interno'
        managed = False


class JngNota(models.Model):
    id_nota = models.IntegerField(primary_key=True)
    id_evaluacion = models.ForeignKey('JngEvaluacion', models.DO_NOTHING, db_column='id_evaluacion', blank=True, null=True)
    id_alumno = models.ForeignKey(JngAlumno, models.DO_NOTHING, db_column='id_alumno', blank=True, null=True)
    nota = models.DecimalField(max_digits=3, decimal_places=1, blank=True, null=True)

    class Meta:
        db_table = 'jng_nota'
        managed = False


class JngPeriodoAcademico(models.Model):
    id_periodo = models.IntegerField(primary_key=True)
    year_num = models.IntegerField(blank=True, null=True)
    semestre = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'jng_periodo_academico'
        managed = False


class JngPermiso(models.Model):
    id_permiso = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        db_table = 'jng_permiso'
        managed = False


class JngPlanEstudios(models.Model):
    id_plan = models.IntegerField(primary_key=True)
    id_carrera = models.ForeignKey(JngCarrera, models.DO_NOTHING, db_column='id_carrera', blank=True, null=True)
    year_inicio = models.IntegerField(blank=True, null=True)
    year_fin = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'jng_plan_estudios'
        managed = False

class JngPrerequisito(models.Model):

    id_prerequisito = models.IntegerField(
        db_column='ID_PREREQUISITO', 
        primary_key=True 
    ) 


    id_asignatura = models.ForeignKey(
        'JngAsignatura', 
        models.DO_NOTHING, 
        db_column='ID_ASIGNATURA'
    ) 
    id_asignatura_req = models.ForeignKey(
        'JngAsignatura', 
        models.DO_NOTHING, 
        db_column='ID_ASIGNATURA_REQ', 
        related_name='jngprerequisito_id_asignatura_req_set'
    )

    class Meta:
        db_table = 'JNG_PREREQUISITO'
        managed = False
        unique_together = (('id_asignatura', 'id_asignatura_req'),)


class JngRol(models.Model):
    id_rol = models.IntegerField(primary_key=True)
    nombre_rol = models.CharField(max_length=100, blank=True, null=True)
    descripcion = models.CharField(max_length=400, blank=True, null=True)

    class Meta:
        db_table = 'jng_rol'
        managed = False


class JngSeccion(models.Model):
    id_seccion = models.IntegerField(primary_key=True)
    id_asignatura = models.ForeignKey(JngAsignatura, models.DO_NOTHING, db_column='id_asignatura', blank=True, null=True)
    id_periodo = models.ForeignKey('JngPeriodoAcademico', models.DO_NOTHING, db_column='id_periodo', blank=True, null=True)
    numero = models.IntegerField(blank=True, null=True)
    grupo = models.CharField(max_length=50, blank=True, null=True)
    cupos = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'jng_seccion'
        managed = False


class JngSede(models.Model):
    id_sede = models.IntegerField(primary_key=True)
    id_universidad = models.ForeignKey('JngUniversidad', models.DO_NOTHING, db_column='id_universidad', blank=True, null=True)
    nombre = models.CharField(max_length=200, blank=True, null=True)
    direccion = models.CharField(max_length=300, blank=True, null=True)

    class Meta:
        db_table = 'jng_sede'
        managed = False


class JngTipoActividad(models.Model):
    id_tipo_actividad = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        db_table = 'jng_tipo_actividad'
        managed = False


class JngTipoEvaluacion(models.Model):
    id_tipo_evaluacion = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        db_table = 'jng_tipo_evaluacion'
        managed = False


class JngUniversidad(models.Model):
    id_universidad = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=300, blank=True, null=True)
    direccion = models.CharField(max_length=400, blank=True, null=True)

    class Meta:
        db_table = 'jng_universidad'
        managed = False


class JngUsuario(models.Model):
    id_usuario = models.IntegerField(
        db_column='ID_USUARIO', 
        primary_key=True
    )

    id_rol = models.ForeignKey(
        'JngRol', 
        models.DO_NOTHING, 
        db_column='ID_ROL',
        blank=True,
        null=True
    )
 
    nombre = models.CharField(db_column='NOMBRE', max_length=200, blank=True, null=True)
    apellido = models.CharField(db_column='APELLIDO', max_length=200, blank=True, null=True)
    rut = models.CharField(db_column='RUT', unique=True, max_length=50, blank=True, null=True)
    email = models.CharField(db_column='EMAIL', unique=True, max_length=200, blank=True, null=True)
    password = models.CharField(db_column='PASSWORD', max_length=200, blank=True, null=True)
    fecha_nac = models.DateField(db_column='FECHA_NAC', blank=True, null=True)
    estado = models.CharField(db_column='ESTADO', max_length=20, blank=True, null=True)
    created_at = models.DateTimeField(db_column='CREATED_AT', blank=True, null=True)

    class Meta:
        db_table = 'JNG_USUARIO' 
        managed = False

class JngRolPermiso(models.Model):
    id_rol = models.ForeignKey('JngRol', models.DO_NOTHING, db_column='id_rol')
    id_permiso = models.ForeignKey('JngPermiso', models.DO_NOTHING, db_column='id_permiso')
    id = models.AutoField(primary_key=True) # Clave primaria automática de Django

    class Meta:
        db_table = 'jng_rol_permiso'
        managed = False
        unique_together = (('id_rol', 'id_permiso'),)