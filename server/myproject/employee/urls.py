from django.urls import path
from .views import ListAndCreateAPI, SingleObjectAPI, UserRegisterAPI, UserLoginAPI

urlpatterns = [
    path("", ListAndCreateAPI.as_view(), name="list_and_create"),
    path("<int:pk>/", SingleObjectAPI.as_view(), name="object_detail"),
    path("register/", UserRegisterAPI.as_view(), name="user_register"),
    path("login/", UserLoginAPI.as_view(), name="user_register"),
]
