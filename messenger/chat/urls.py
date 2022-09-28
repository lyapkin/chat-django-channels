from django.urls import path

from . import views

app_name = 'chat'
urlpatterns = [
    path('', views.index, name='index'),
    path('connections/', views.provide_connections, name='connections'),
    path('connections/<int:to_user_id>', views.provide_messages, name='chat'),
    path('connections-search/<str:search>', views.search_connections, name='search')
]