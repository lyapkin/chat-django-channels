from django.urls import path

from . import views

app_name = 'logreg'
urlpatterns = [
    path('', views.index, name='index'),
    path('reg/', views.reg, name='reg'),
    path('login/', views.auth_login, name='login'),
    path('logout/', views.auth_logout, name='logout'),
    path('sessioncheck/', views.session_check, name='session_check')
]