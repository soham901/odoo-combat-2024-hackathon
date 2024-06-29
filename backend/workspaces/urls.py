from django.urls import path

from . import views


urlpatterns = [
    path("", views.WorkSpaceListCreateView.as_view(), name="workspace-list-create"),
    path(
        "@<str:slug>/",
        views.WorkSpaceRetrieveUpdateDestroyView.as_view(),
        name="workspace-detail",
    ),
]
