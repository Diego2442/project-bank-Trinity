import json
import uuid
from channels.generic.websocket import AsyncWebsocketConsumer

class DebitRequestConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # El usuario es obtenido de la solicitud WebSocket
        self.user = self.scope['url_route']['kwargs']['user_id']
        self.room_name = f'debit_room_{self.user}'
        self.room_group_name = f'{self.room_name}'

        # Unirse a un grupo de WebSocket específico para este usuario
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        print(self.channel_name, self.room_group_name, self.user)
        await self.accept()

    async def disconnect(self, close_code):
        # Dejar el grupo WebSocket
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Recibiendo un mensaje de WebSocket
    async def receive(self, text_data):
        data = json.loads(text_data)
        if data['type'] == 'debit_request':
            # Procesamos la solicitud de débito
            product_id = data['product_id']
            amount = data['amount']
            admin_id = data['admin_id']
            user_id = data['user_id']
            print(f"Recibiendo solicitud de débito: {data}")  # Depuración

            # Enviar solicitud de débito al cliente correspondiente
            await self.channel_layer.group_send(
                f'debit_room_{user_id}',
                {
                    'type': 'debit_request',  # Tipo de mensaje
                    'product_id': product_id,
                    'amount': amount,
                    'admin_id': admin_id,
                }
            )
            print(f"Enviando solicitud de débito al grupo 'debit_room_{user_id}'.")

        elif data['type'] == 'debit_response':
            # Procesamos la respuesta del cliente (true/false)
            admin_id = data['admin_id']
            response = data['response']  # true o false
            amount = data['amount']
            product_id = data['product_id']
            response_id = str(uuid.uuid4())  # Generamos el ID único
            print(f"Recibiendo respuesta de débito: {response}")

            # Enviar respuesta al administrador correspondiente
            await self.channel_layer.group_send(
                f'debit_room_{admin_id}',
                {
                    'type': 'debit_response',
                    'response': response,
                    'admin_id': admin_id,
                    'amount': amount,
                    'product_id': product_id,
                    'response_id': response_id
                }
            )
            print(f"Enviando respuesta de débito al grupo 'debit_room_{admin_id}'.")

    # Enviando una solicitud de débito al cliente
    async def debit_request(self, event):
        await self.send(text_data=json.dumps({
            'type': 'debit_request',
            'product_id': event['product_id'],
            'amount': event['amount'],
            'admin_id': event['admin_id'],
        }))

    # Enviando una respuesta de débito al administrador
    async def debit_response(self, event):
        await self.send(text_data=json.dumps({
            'type': 'debit_response',
            'response': event['response'],
            'admin_id': event['admin_id'],
            'amount':   event['amount'],
            'product_id': event['product_id'],
            'response_id': event['response_id']
        }))
