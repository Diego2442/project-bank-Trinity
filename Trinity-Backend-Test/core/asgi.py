import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import apps.transaction.routing  # Asegúrate de importar las rutas de tu aplicación

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),  # Maneja las solicitudes HTTP
    "websocket": AuthMiddlewareStack(  # Maneja las conexiones WebSocket
        URLRouter(
            apps.transaction.routing.websocket_urlpatterns  # Aquí definimos las rutas para WebSocket
        )
    ),
})
