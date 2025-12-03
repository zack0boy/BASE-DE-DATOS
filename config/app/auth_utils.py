# app/auth_utils.py
import datetime
import jwt
from django.conf import settings

JWT_SECRET = getattr(settings, "JWT_SECRET", "cambia-esto")
JWT_ALG = "HS256"
JWT_EXP_MIN = 60  # 1 hora

def crear_token(usuario_dict):
    payload = {
        "id_usuario": usuario_dict["id_usuario"],
        "id_rol": usuario_dict.get("id_rol"),
        "nombre_rol": usuario_dict.get("nombre_rol"),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=JWT_EXP_MIN),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)

def verificar_token(token):
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
