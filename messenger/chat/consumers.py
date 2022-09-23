import json

from django.contrib.auth import get_user_model
from django.db.models import F, Q
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync

from .models import Connection

from datetime import datetime

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        if self.scope['user'].is_authenticated:
            async_to_sync(self.channel_layer.group_add)(self.scope['user'].username, self.channel_name)
            self.accept()
        else:
            self.close()


    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(self.scope['user'].username, self.channel_name)
        print(close_code)
    
    
    def receive(self, text_data):
        data = json.loads(text_data)
        send_to = Connection.objects.select_related('connected_to').get(id=data['connection_id']).connected_to.username
        send_data = {
             'messageData': {
                'id': int(datetime.now().timestamp()),
                'content': data['message'],
                # 'connectionId': data['connection_id'],
                'sentBy': int(self.scope['user'].id),
                'sentTime': datetime.now().isoformat()
            },
            'connectionData': {
                'chatId': int(data['chat_id']),
                'content': data['message'],
                'sentBy': self.scope['user'].username,
                'sentTime': datetime.now().isoformat()
            }
        }
        
        self.send(json.dumps(send_data))
        # save a message to the database (correct id and sentTime before saving) and update the connections
        async_to_sync(self.channel_layer.group_send)(
            send_to,
            {
                'type': 'chat.message',
                'data': send_data
            }
        )


    def chat_message(self, event):
        data = json.dumps(event['data'])
        self.send(text_data=data)


class SearchConnectionConsumer(WebsocketConsumer):
    def connect(self):
        if self.scope['user'].is_authenticated:
            self.accept()
        else:
            self.close()

    def receive(self, text_data):
        users = list(
            get_user_model().objects.filter(Q(username__icontains=text_data) | Q(first_name__icontains=text_data) | Q(last_name__icontains=text_data)).values(
                'id',
                'username',
                firstName=F('first_name'),
                lastName=F('last_name')
            )
        )
        if users:
            self.send(json.dumps({'users': users}))