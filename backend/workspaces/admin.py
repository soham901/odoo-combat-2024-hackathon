from django.contrib import admin
from .models import Amenity, WorkSpace, WorkSpaceImage


class WorkSpaceImageInline(admin.TabularInline):
    model = WorkSpaceImage
    extra = 1


@admin.register(WorkSpace)
class WorkSpaceAdmin(admin.ModelAdmin):
    inlines = [WorkSpaceImageInline]


@admin.register(Amenity)
class AmenityAdmin(admin.ModelAdmin):
    pass
