from rest_framework import serializers
from .models import Employee


class ListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employee
        # fields = "__all__"
        fields = ['id', 'name', 'age', 'email', 'department']
