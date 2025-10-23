from django.db import models
from django.core.validators import (
    MinValueValidator,
    MaxValueValidator,
    MaxLengthValidator,
)

from django.core.exceptions import ValidationError


# Create your models here.


def validate_department(value):

    if value not in ["angular", "react", "node"]:
        raise ValidationError(f"{value} is not a valid department.")


class Employee(models.Model):
    name = models.CharField(
        MaxLengthValidator(100, message="Name must be at most 100 characters long")
    )
    age = models.IntegerField(
        validators=[
            MinValueValidator(18, message="Age must be at least 18"),
            MaxValueValidator(60, message="Age must be at most 60"),
        ]
    )

    email = models.EmailField(unique=True)

    department = models.CharField(validators=[validate_department])

    image = models.ImageField(null=True, upload_to="student_image")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
