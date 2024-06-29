from django.contrib.auth import authenticate, get_user_model

from rest_framework import serializers


User = get_user_model()


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        if email and password:
            user = authenticate(
                request=self.context.get("request"), email=email, password=password
            )
            if not user:
                raise serializers.ValidationError(
                    "Unable to log in with provided credentials.", code="authorization"
                )
        else:
            raise serializers.ValidationError(
                'Must include "email" and "password".', code="authorization"
            )

        data["user"] = user
        return data


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]

    def update(self, instance, validated_data):
        instance.username = validated_data.get("username", instance.username)
        instance.email = validated_data.get("email", instance.email)
        instance.save()
        return instance
