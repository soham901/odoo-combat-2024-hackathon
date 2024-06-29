from django.urls import path

from . import views


urlpatterns = [
    path("<slug:slug>/", views.create_booking, name="booking-view"),
    path("", views.booking_success, name="booking_success"),
]
