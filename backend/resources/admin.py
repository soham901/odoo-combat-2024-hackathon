from django.contrib import admin

from .models import Resource, ResourceReservation

admin.site.register(Resource)

admin.site.register(ResourceReservation)
