from rest_framework import serializers

from .models import Customer
# from .validators import username_validator


class CustomerSerializer(serializers.ModelSerializer):
    user = serializers.CharField(max_length=150, source="user.username", read_only=True)

    def create(self, validated_data):
        customer = Customer.objects.create(**validated_data)
        return customer

    # def update(self, instance, validated_data):

    class Meta:
        model = Customer
        fields = "__all__"


class CustomerListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        exclude = ["user"]
        # fields = "__all__"  # ["id", "username", "display_name"]
