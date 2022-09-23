import json

from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from django.forms import ValidationError, model_to_dict
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.http import require_http_methods

from .models import CustomUser

# Create your views here.
def index(request):
    return render(request)


def reg(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user = CustomUser(**data)
            user.full_clean()
            # user.save()
            return JsonResponse(model_to_dict(user), status=201)
        except ValidationError as error:
            return JsonResponse(error.message_dict, status=400)
    return HttpResponse('request')


def auth_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = authenticate(username=data['username'], password=data['password'])
        if user is not None:
            login(request, user)
            data = {
                'success': True,
                'data': {
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'firsName': user.first_name,
                        'lastName': user.last_name
                    },
                    'is_authenticated': user.is_authenticated
                }
            }
            return JsonResponse(data, status=200)

    data = {
        'success': False,
        'data': None
    }
    return JsonResponse(data, status=400)


@require_http_methods(['DELETE'])
def auth_logout(request):
    logout(request)
    return HttpResponse()


def session_check(request):
    if request.user.is_authenticated:
        data = {
            'success': True,
            'data': {
                'user': {
                    'id': request.user.id,
                    'username': request.user.username,
                    'firsName': request.user.first_name,
                    'lastName': request.user.last_name
                },
                'is_authenticated': request.user.is_authenticated
            }
        }
        return JsonResponse(data, status=200)
    else:
        data = {
            'success': False,
            'data': None
        }
        return JsonResponse(data, status=200)