from django.db import models
from django.core.validators import (
    MinValueValidator,
    MaxValueValidator,
    MaxLengthValidator,
    MinLengthValidator,
)

from django.core.exceptions import ValidationError


# Create your models here.


def validate_department(value):

    if value not in ["it", "law"]:
        raise ValidationError(f"{value} is not a valid department.")


def validate_designation(value):

    if value not in ["associate", "manager", "secretary"]:
        raise ValidationError(f"{value} is not a valid designation.")


def validate_status(value):

    if value not in [True, False]:
        raise ValidationError(f"{value} is not a valid status.")


def validate_phone(value):

    if len(value) != 10:
        raise ValidationError("Phone number must be 10 digits long.")


def validate_role(value):

    if value not in ["admin", "sub_admin"]:
        raise ValidationError(f"{value} is not a valid role.")


class Employee(models.Model):
    name = models.CharField(
        validators=[
            MinLengthValidator(3, message="Name must be at least 3 characters long"),
            MaxLengthValidator(100, message="Name must be at most 100 characters long"),
        ],
        error_messages={
            "required": "Name is required.",
        },
    )

    email = models.EmailField(
        unique=True,
        error_messages={
            "required": "Email is required.",
        },
    )

    salary = models.IntegerField(
        validators=[
            MinValueValidator(0, message="Salary must be greater than 0"),
            MaxValueValidator(1000000, message="Salary must be less than Rs. 1000000"),
        ],
        error_messages={
            "required": "Salary is required.",
        },
    )

    phone = models.CharField(
        validators=[validate_phone],
        error_messages={
            "required": "Phone number is required.",
            "max_length": "Phone number must be at most 10 characters long.",
        },
    )

    designation = models.CharField(
        validators=[validate_designation],
        error_messages={
            "required": "Designation is required.",
        },
    )

    department = models.CharField(
        validators=[validate_department],
        error_messages={
            "required": "Department is required.",
        },
    )

    date_of_joining = models.DateField(
        error_messages={
            "required": "Date of joining is required.",
        },
    )

    status = models.BooleanField(default=True, validators=[validate_status])

    address = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class User(models.Model):
    name = models.CharField(
        max_length=100,
        error_messages={
            "required": "Name is required.",
            "max_length": "Name must be at most 100 characters long.",
        },
        validators=[
            MinLengthValidator(3, message="Name must be at least 3 characters long")
        ],
    )

    email = models.EmailField(
        unique=True,
        error_messages={
            "required": "Email is required.",
            "unique": "Email must be unique.",
        },
    )

    password = models.CharField(
        error_messages={
            "required": "Password is required.",
        },
        validators=[
            MinLengthValidator(8, message="Password must be at least 8 characters long")
        ],
    )

    role = models.CharField(validators=[validate_role])

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
