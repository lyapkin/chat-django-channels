from django.urls import re_path

from .consumers import ChatConsumer, SearchConnectionConsumer

websocket_urlpattern = [
    re_path(r'ws/chat/', ChatConsumer.as_asgi()),
    re_path(r'ws/search/', SearchConnectionConsumer.as_asgi()),
]