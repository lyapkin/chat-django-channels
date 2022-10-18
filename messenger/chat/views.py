from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, Http404
from django.contrib.auth import get_user_model
from django.db.models import F, Q
from django.core.exceptions import ObjectDoesNotExist

from .models import Connection, Message, Chat

# Create your views here.
def index(request):
    return HttpResponse('chat')


def provide_connections(request):
    data = list(
        Connection.objects.filter(user=request.user).select_related('connected_to', 'last_sent_message').values(
                'id',
                chatId=F('chat'),
                connectionUserId=F('connected_to__id'),
                connectionUsername=F('connected_to__username'),
                connectionFirstName=F('connected_to__first_name'),
                connectionLastName=F('connected_to__last_name'),
                lastMessageContent=F('last_sent_message__content'),
                lastMessageSentBy=F('last_sent_message__sent_by__username'),
                lastMessageTime = F('last_sent_message__sent_time')
        ).order_by('-last_sent_message__sent_time')
    )
    return JsonResponse(data, status=200, safe=False)


def provide_messages(request, to_user_id):
    try:
        chat_id = Connection.objects.get(user=request.user.id, connected_to=to_user_id).chat
    except ObjectDoesNotExist:
        return HttpResponse(status=204)
        
    data = list(
        Message.objects.filter(chat=chat_id).values(
            'id',
            'content',
            sentBy=F('sent_by'),
            sentTime=F('sent_time')
        )
    )
    
    return JsonResponse(data, status=200, safe=False)


def search_connections(request, search):
    users = list(
        get_user_model().objects.filter(Q(username__icontains=search) | Q(first_name__icontains=search) | Q(last_name__icontains=search)).values(
            'id',
            'username',
            firstName=F('first_name'),
            lastName=F('last_name')
        )
    )
    if not users:
        raise Http404('No result')

    return JsonResponse({'users': users}, status=200, safe=False)