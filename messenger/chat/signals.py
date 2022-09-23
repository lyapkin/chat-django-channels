from django.db.models import Q
from django.core.signals import pre_delete
# from django.dispatch import receiver
from models import Message, Connection

# @receiver(pre_delete, sender=Message)
def change_field_value(sender, instance, **kwargs):
    print('here')
    # If there is a message after an instance-message update its previous_message field
    Message.objects.filter(previous_message=instance).update(previous_message=instance.previous_message)

    # Update the last sent and read message fields in the connection table if they are filled with the instance-message
    # connections_with_del_msg = Connections.objects.filter(Q(last_read_message=instance) | Q(last_sent_message=instance))
    # if connections_with_del_msg.exists():
    #     # new_last_message = Message.objects.get(id=instance.previous_message.id)
    #     new_last_message = instance.previous_message
    #     for connection in connections_with_del_msg:
    #         if connection.last_read_message == instance:
    #             connection.last_read_message = new_last_message

    #         if connection.last_sent_message == instance:
    #             connection.last_sent_message = new_last_message

            # connection.save()
    
    new_last_message = Message.objects.get(id=instance.previous_message.id)
    # new_last_message = instance.previous_message
    instance.last_sent_message.all().update(last_sent_message=new_last_sent)
    instance.last_read_message.all().update(last_read_message=new_last_sent)

# pre_delete.connect(change_field_value, sender=Message, dispatch_uid='change_value_in_connection')