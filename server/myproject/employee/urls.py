from django.urls import path
from .views import ListAndCreateSerializer, SingleObjectSerializer

urlpatterns = [
    path("", ListAndCreateSerializer.as_view(), name="list_and_create"),
    path("/<int:pk>", SingleObjectSerializer.as_view(), name="object_detail"),
]
