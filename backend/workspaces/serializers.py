from rest_framework import serializers

from .models import WorkSpace, WorkSpaceImage


class WorkSpaceSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(
        max_length=150, source="owner.username", read_only=True
    )
    city = serializers.CharField(max_length=255, source="city.name", read_only=True)
    state = serializers.CharField(max_length=255, source="state.name", read_only=True)
    images = serializers.SerializerMethodField()

    def get_images(self, obj):
        images = WorkSpaceImage.objects.filter(workspace=obj)
        return [image.image.url for image in images]

    def create(self, validated_data):
        workspace = WorkSpace.objects.create(**validated_data)
        return workspace

    class Meta:
        model = WorkSpace
        fields = "__all__"
        depth = 1


class WorkSpaceListSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(
        max_length=150, source="owner.username", read_only=True
    )
    city = serializers.CharField(max_length=255, source="city.name", read_only=True)
    state = serializers.CharField(max_length=255, source="state.name", read_only=True)
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        image = WorkSpaceImage.objects.filter(workspace=obj).first()
        if image:
            return image.image.url
        return None

    class Meta:
        model = WorkSpace
        # fields = "__all__"  # ["id", "username", "display_name"]
        exclude = ["amenities", "rules"]
        depth = 1
