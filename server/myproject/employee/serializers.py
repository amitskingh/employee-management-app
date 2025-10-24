from rest_framework import serializers
from .models import Employee, User


class ListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employee
        fields = "__all__"
        # fields = ['id', 'name', 'age', 'email', 'department']
        # exclude = ["created_at", "updated_at"]


class UserRegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = "__all__"
        # fields = ['id', 'name', 'age', 'email', 'department']
        # exclude = ["created_at", "updated_at"]


class UserLoginSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["id", "name", "role", "email"]
