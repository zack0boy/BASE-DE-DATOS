from django.db import models


class Administrativo(models.Model):
    id_administrativo = models.IntegerField(primary_key=True)
    cargo = models.CharField(max_length=100, blank=True, null=True)
    area = models.CharField(max_length=100, blank=True, null=True)
    fecha_contrato = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'administrativo'


class Asistencia(models.Model):
    id_asistencia = models.IntegerField(primary_key=True)
    id_estudiante = models.ForeignKey('Estudiante', models.DO_NOTHING, db_column='id_estudiante')
    id_curso = models.ForeignKey('Curso', models.DO_NOTHING, db_column='id_curso')
    fecha = models.DateField(blank=True, null=True)
    estado = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'asistencia'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128, blank=True, null=True)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150, blank=True, null=True)
    first_name = models.CharField(max_length=150, blank=True, null=True)
    last_name = models.CharField(max_length=150, blank=True, null=True)
    email = models.CharField(max_length=254, blank=True, null=True)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Carrera(models.Model):
    id_carrera = models.IntegerField(primary_key=True)
    nombre_carrera = models.CharField(max_length=100)
    duracion = models.IntegerField(blank=True, null=True)
    facultad = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'carrera'


class Certificado(models.Model):
    id_certificado = models.IntegerField(primary_key=True)
    id_estudiante = models.ForeignKey('Estudiante', models.DO_NOTHING, db_column='id_estudiante')
    tipo = models.CharField(max_length=50, blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'certificado'


class Curso(models.Model):
    id_curso = models.IntegerField(primary_key=True)
    nombre_curso = models.CharField(max_length=100)
    codigo = models.CharField(unique=True, max_length=20)
    creditos = models.IntegerField(blank=True, null=True)
    id_docente = models.ForeignKey('Docente', models.DO_NOTHING, db_column='id_docente')

    class Meta:
        managed = False
        db_table = 'curso'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200, blank=True, null=True)
    action_flag = models.IntegerField()
    change_message = models.TextField(blank=True, null=True)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100, blank=True, null=True)
    model = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255, blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField(blank=True, null=True)
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Docente(models.Model):
    id_docente = models.IntegerField(primary_key=True)
    especialidad = models.CharField(max_length=100, blank=True, null=True)
    anios_experiencia = models.IntegerField(blank=True, null=True)
    departamento = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'docente'


class Encuesta(models.Model):
    id_encuesta = models.IntegerField(primary_key=True)
    titulo = models.CharField(max_length=200, blank=True, null=True)
    fecha_creacion = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'encuesta'


class Entrega(models.Model):
    id_entrega = models.IntegerField(primary_key=True)
    id_tarea = models.ForeignKey('Tarea', models.DO_NOTHING, db_column='id_tarea')
    id_estudiante = models.ForeignKey('Estudiante', models.DO_NOTHING, db_column='id_estudiante')
    fecha = models.DateField(blank=True, null=True)
    archivo = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'entrega'


class Estudiante(models.Model):
    id_estudiante = models.IntegerField(primary_key=True)
    matricula = models.CharField(unique=True, max_length=20)
    fecha_ingreso = models.DateField(blank=True, null=True)
    id_carrera = models.ForeignKey(Carrera, models.DO_NOTHING, db_column='id_carrera')

    class Meta:
        managed = False
        db_table = 'estudiante'


class Evaluacion(models.Model):
    id_evaluacion = models.IntegerField(primary_key=True)
    id_curso = models.ForeignKey(Curso, models.DO_NOTHING, db_column='id_curso')
    tipo = models.CharField(max_length=50, blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)
    porcentaje = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'evaluacion'


class Foro(models.Model):
    id_foro = models.IntegerField(primary_key=True)
    titulo = models.CharField(max_length=200, blank=True, null=True)
    descripcion = models.CharField(max_length=1000, blank=True, null=True)
    fecha_creacion = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'foro'


class Horario(models.Model):
    id_horario = models.IntegerField(primary_key=True)
    dia = models.CharField(max_length=20, blank=True, null=True)
    hora_inicio = models.CharField(max_length=10, blank=True, null=True)
    hora_fin = models.CharField(max_length=10, blank=True, null=True)
    id_curso = models.ForeignKey(Curso, models.DO_NOTHING, db_column='id_curso')

    class Meta:
        managed = False
        db_table = 'horario'


class LogAuditoria(models.Model):
    id_auditoria = models.IntegerField(primary_key=True)
    id_usuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='id_usuario', blank=True, null=True)
    accion = models.CharField(max_length=100, blank=True, null=True)
    fecha_hora = models.DateTimeField(blank=True, null=True)
    tabla_afectada = models.CharField(max_length=50, blank=True, null=True)
    registro_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'log_auditoria'


class LogError(models.Model):
    id_error = models.IntegerField(primary_key=True)
    fecha_hora = models.DateTimeField(blank=True, null=True)
    tipo_error = models.CharField(max_length=100, blank=True, null=True)
    mensaje = models.CharField(max_length=2000, blank=True, null=True)
    detalle = models.CharField(max_length=2000, blank=True, null=True)
    modulo = models.CharField(max_length=100, blank=True, null=True)
    id_usuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='id_usuario', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'log_error'


class Matricula(models.Model):
    id_matricula = models.IntegerField(primary_key=True)
    id_estudiante = models.ForeignKey(Estudiante, models.DO_NOTHING, db_column='id_estudiante', related_name='matriculas')
    id_curso = models.ForeignKey(Curso, models.DO_NOTHING, db_column='id_curso')
    fecha = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'matricula'


class Mensaje(models.Model):
    id_mensaje = models.IntegerField(primary_key=True)
    id_usuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='id_usuario')
    contenido = models.CharField(max_length=2000, blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mensaje'


class Nota(models.Model):
    id_nota = models.IntegerField(primary_key=True)
    id_evaluacion = models.ForeignKey(Evaluacion, models.DO_NOTHING, db_column='id_evaluacion')
    id_estudiante = models.ForeignKey(Estudiante, models.DO_NOTHING, db_column='id_estudiante')
    nota = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'nota'


class Publicacion(models.Model):
    id_publicacion = models.IntegerField(primary_key=True)
    id_foro = models.ForeignKey(Foro, models.DO_NOTHING, db_column='id_foro')
    id_usuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='id_usuario')
    contenido = models.CharField(max_length=2000, blank=True, null=True)
    fecha_publicacion = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'publicacion'


class Recurso(models.Model):
    id_recurso = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=100, blank=True, null=True)
    tipo = models.CharField(max_length=50, blank=True, null=True)
    fecha_subida = models.DateField(blank=True, null=True)
    url = models.CharField(max_length=200, blank=True, null=True)
    id_curso = models.ForeignKey(Curso, models.DO_NOTHING, db_column='id_curso')

    class Meta:
        managed = False
        db_table = 'recurso'


class RespuestaEncuesta(models.Model):
    id_respuesta = models.IntegerField(primary_key=True)
    id_encuesta = models.ForeignKey(Encuesta, models.DO_NOTHING, db_column='id_encuesta')
    id_usuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='id_usuario')
    respuesta = models.CharField(max_length=1000, blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'respuesta_encuesta'


class Rol(models.Model):
    id_rol = models.IntegerField(primary_key=True)
    nombre_rol = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'rol'


class Tarea(models.Model):
    id_tarea = models.IntegerField(primary_key=True)
    id_curso = models.ForeignKey(Curso, models.DO_NOTHING, db_column='id_curso')
    titulo = models.CharField(max_length=200, blank=True, null=True)
    descripcion = models.CharField(max_length=1000, blank=True, null=True)
    fecha_entrega = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tarea'


class Usuario(models.Model):
    id_usuario = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    email = models.CharField(unique=True, max_length=100)
    contrasena = models.CharField(max_length=200)
    id_rol = models.ForeignKey(Rol, models.DO_NOTHING, db_column='id_rol')

    class Meta:
        managed = False
        db_table = 'usuario'
