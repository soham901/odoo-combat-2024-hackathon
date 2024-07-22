from django.db import models
from django.utils.text import slugify

from resources.models import Resource
from owner.models import Owner
from locations.models import City, State


class Amenity(models.Model):
    name = models.CharField(max_length=255)
    icon = models.ImageField(upload_to="amenities")

    def __str__(self):
        return self.name


class WorkSpace(models.Model):
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE, null=True)
    resources = models.ManyToManyField(Resource)
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, null=True, blank=True)
    tagline = models.CharField(max_length=96)
    amenities = models.ManyToManyField(Amenity)
    location = models.CharField(max_length=255, null=True)
    city = models.ForeignKey(
        City, related_name="workspaces", on_delete=models.CASCADE, null=True
    )
    state = models.ForeignKey(
        State, related_name="workspaces", on_delete=models.CASCADE, null=True
    )
    rules = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class WorkSpaceImage(models.Model):
    workspace = models.ForeignKey(
        WorkSpace, related_name="images", on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to="workspace_images")

    def __str__(self):
        return self.workspace.name
