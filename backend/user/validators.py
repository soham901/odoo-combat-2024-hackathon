from rest_framework import serializers


RESERVED_USERNAMES = ["me"]


def clean_username(value):
    return value.lower().replace(" ", "")


def username_validator(value):
    from .models import User

    username = clean_username(value)

    if username in RESERVED_USERNAMES:
        raise serializers.ValidationError("Username is reserved")

    user = User.objects.filter(username=username).first()

    if user:
        raise serializers.ValidationError("Username already exists")
    else:
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError("Username already exists")
