from django.urls import path

from . import views


urlpatterns = [
    path("", views.UserListCreateView.as_view(), name="user-list-create"),
    path("me/", views.MeView.as_view(), name="user-profile"),
    path(
        "@<str:username>/",
        views.UserRetrieveUpdateDestroyView.as_view(),
        name="user-detail",
    ),
]
