from django.db import models
from django.conf import settings

# Create your models here.
class Chat(models.Model):
    def __str__(self):
        return f'{self.id}'



class Message(models.Model):
    content = models.CharField(max_length=4096)
    sent_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING)
    sent_time = models.DateTimeField(auto_now_add=True)
    previous_message = models.OneToOneField('self', on_delete=models.DO_NOTHING, null=True)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='messages')
    # connection


    def __str__(self):
        return f'{self.sent_by} - "{self.content}"'

    
    def delete(self, *args, **kwargs):
        # If there is a message after a self-message update its previous_message field
        Message.objects.filter(previous_message=self).update(previous_message=self.previous_message)

        # Update the last sent and read message fields in the connection table if they are filled with the self-message
        # connections_with_del_msg = Connections.objects.filter(Q(last_read_message=self) | Q(last_sent_message=self))
        # if connections_with_del_msg.exists():
        #     # new_last_message = Message.objects.get(id=self.previous_message.id)
        #     new_last_message = self.previous_message
        #     for connection in connections_with_del_msg:
        #         if connection.last_read_message == self:
        #             connection.last_read_message = new_last_message

        #         if connection.last_sent_message == self:
        #             connection.last_sent_message = new_last_message

                # connection.save()
        
        # new_last_message = Message.objects.get(id=self.previous_message.id)
        new_last_message = self.previous_message
        self.last_sent_message.all().update(last_sent_message=new_last_message)
        self.last_read_message.all().update(last_read_message=new_last_message)

        super().delete(*args, **kwargs)


class Connection(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, related_name='connections')
    connected_to = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING)
    last_sent_message = models.ForeignKey(Message, on_delete=models.DO_NOTHING, null=True, related_name='last_sent_message')
    last_read_message = models.ForeignKey(Message, on_delete=models.DO_NOTHING, null=True, related_name='last_read_message')
    is_in_chat_list = models.BooleanField(default=True, editable=False)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    # is_active

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'connected_to'], name='unique_connection')
        ]

    def __str__(self):
        return f'"{self.user}-user" connects to "{self.connected_to}-user"'