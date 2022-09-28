import json

from django.contrib.auth import get_user_model
from django.db.models import F, Q
from django.core.exceptions import ObjectDoesNotExist
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync

from .models import Connection, Chat, Message

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
        try:
            connection = Connection.objects.select_related('connected_to', 'chat').get(user=self.scope['user'].id, connected_to=data['connected_to'])
            connection_to = Connection.objects.select_related('connected_to', 'chat').get(user=data['connected_to'], connected_to=self.scope['user'].id)
            prev_message = Message.objects.filter(chat=connection.chat).last()
            message = Message(content=data['message'], sent_by=self.scope['user'], previous_message=prev_message, chat=connection.chat)
        except ObjectDoesNotExist:
            user_to_connect = get_user_model().objects.get(id=data['connected_to'])
            chat = Chat()
            print(chat)
            message = Message(content=data['message'], sent_by=self.scope['user'], chat=chat)
            connection = Connection(user=self.scope['user'], connected_to=user_to_connect, chat=chat)
            connection_to = Connection(user=user_to_connect, connected_to=self.scope['user'], chat=chat)
            chat.save()
        
        connection.last_sent_message = message
        connection_to.last_sent_message = message
        message.save()
        connection.save()
        connection_to.save()
        
        data_to_send = {
             'messageData': {
                'id': message.id,
                'content': message.content,
                'sentBy': int(self.scope['user'].id),
                'sentTime': message.sent_time.isoformat()
            },
            'connectionData': {
                'chatId': int(connection.chat.id),
                'content': message.content,
                'sentBy': self.scope['user'].username,
                'sentTime': message.sent_time.isoformat()
            }
        }
        # data_to_send = {
        #      'messageData': {
        #         'id': int(datetime.now().timestamp()),
        #         'content': data['message'],
        #         'sentBy': int(self.scope['user'].id),
        #         'sentTime': datetime.now().isoformat()
        #     },
        #     'connectionData': {
        #         'chatId': int(connection.chat.id),
        #         'content': data['message'],
        #         'sentBy': self.scope['user'].username,
        #         'sentTime': datetime.now().isoformat()
        #     }
        # }
        
        self.send(json.dumps(data_to_send))
        # reminder: save a message to the database (correct id and sentTime before saving) and update the connections
        async_to_sync(self.channel_layer.group_send)(
            connection.connected_to.username,
            {
                'type': 'chat.message',
                'data': data_to_send
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
                'username',
                userId=F('id'),
                firstName=F('first_name'),
                lastName=F('last_name')
            )
        )
        if users:
            self.send(json.dumps({'users': users}))