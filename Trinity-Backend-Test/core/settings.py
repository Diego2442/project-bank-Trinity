
from datetime import timedelta

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-=pjr$a_05u-ye(ownb4*m)m8a@npr0$yohq4^-y@@n9)qb!v82"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

DJANGO_APPS = [
    'daphne',
    #
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

MY_APPS = [
    'apps.user',
    'apps.product',
    'apps.transaction',
]

THIRD_APPS = [
    'rest_framework',
    'djoser',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'corsheaders',
    #
    'channels',
]

INSTALLED_APPS = DJANGO_APPS + MY_APPS + THIRD_APPS

MIDDLEWARE = [
    #
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    #
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"

# Configuración de Channels
ASGI_APPLICATION = "core.asgi.application"

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels.layers.InMemoryChannelLayer',  # Usar InMemoryChannelLayer si no estás usando Redis
    },
}

#Esto pero debo instalar redis pip install channels_redis / sudo apt-get install redis-server o en docker
""" CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [('127.0.0.1', 6379)],  # Puerto y dirección de tu servidor Redis
        },
    },
} """

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

#Cifrado mas fuerte
PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.Argon2PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher',
    'django.contrib.auth.hashers.BCryptSHA256PasswordHasher',
    'django.contrib.auth.hashers.BCryptPasswordHasher',
]


AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"


USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = "static/"


REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        #'rest_framework.permissions.IsAuthenticated',
        #'rest_framework.permissions.IsAuthenticatedOrReadOnly',
        'rest_framework.permissions.AllowAny'
    ],
    ###con simple jwt
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

#Simple JWT es el token de autenticación autilizar
SIMPLE_JWT={
    'AUTH_HEADER_TYPES': ('JWT', ), #JWT es el nombre del token que puede ser x-token o el que se quiera, es el que se recibe en los headers
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=1440), #hours
    'REFRESH_TOKEN_LIFETIME': timedelta(days=30),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION':True,
    'AUTH_TOKEN_CLASSES':(
        'rest_framework_simplejwt.tokens.AccessToken',
    )
}

#Configuración de DJOSER 'https://djoser.readthedocs.io/en/latest/settings.html'
DJOSER = {
    'LOGIN_FIELD': 'email', #con que campo hace login
    'USER_CREATE_PASSWORD_RETYPE': True, #repetir campo constraseña al crear
    'USERNAME_CHANGED_EMAIL_CONFIRMATION': True,#enviar email al cambiar usuario
    'PASSWORD_CHANGED_EMAIL_CONFIRMATION': True,
    #enviar email al cambiar contraseña
    'SEND_CONFIRMATION_EMAIL': True, #al registrarse, confirmar email o no
    'SEND_ACTIVATION_EMAIL': True, #al registrarse, confirmar email o no
    'SET_USERNAME_RETYPE': True,
    'PASSWORD_RESET_CONFIRM_URL': 'auth/reset-confirm?uid={uid}&token={token}',#link confirmación cambio contraseña
    #'PASSWORD_RESET_CONFIRM_URL': 'password/reset/confirm/{uid}/{token}',#link confirmación cambio contraseña
    'SET_PASSWORD_RETYPE': True, #reescribir contraseña
    'PASSWORD_RESET_CONFIRM_RETYPE':True,
    'USERNAME_RESET_CONFIRM_URL': 'email/reset/confirm/{uid}/{token}', #confirmar el cambio de usuario
    'ACTIVATION_URL': 'auth/verificacion-registro/?uid={uid}&token={token}',
    #'ACTIVATION_URL': 'activate/{uid}/{token}',#url para activar usuario y es la que llega al email
    'SERIALIZERS': {
        'user_create':'apps.user.serializers.UserSerializerAuth', 
        'user': 'apps.user.serializers.UserSerializerAuth',
        'current_user': 'apps.user.serializers.UserSerializerAuth',
        'user_delete': 'djoser.serializers.UserDeleteSerializer'
    },
}

#Fernet Key para la clave transactional
FERNET_KEY = b'BOMVU4odHtYnKKLgRZxHlXmUUjeTvS9vW_fRwCEfWJI='


AUTH_USER_MODEL = 'user.User'

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

#Configuración de cors
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOW_HEADERS = ["Authorization", "Content-Type", "Accept"]
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = ['http://localhost:5173','http://127.0.0.1:5173']

CSRF_TRUSTED_ORIGINS = ['http://localhost:5173','http://127.0.0.1:5173']


# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
