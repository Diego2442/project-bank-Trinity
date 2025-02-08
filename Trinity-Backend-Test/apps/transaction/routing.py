from django.urls import re_path
from . import consumers  # Importa tu consumidor (consumer)

websocket_urlpatterns = [
    # Aquí estamos configurando una ruta para WebSocket
    re_path(r'ws/debit_room_(?P<user_id>\d+)/$', consumers.DebitRequestConsumer.as_asgi()),
]
