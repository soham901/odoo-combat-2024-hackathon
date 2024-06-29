from django.urls import path

from . import views


urlpatterns = [
    path("", views.CustomerListCreateView.as_view(), name="customer-list-create"),
    path(
        "@<str:user__username>/",
        views.CustomerRetrieveUpdateDestroyView.as_view(),
        name="customer-detail",
    ),
]
