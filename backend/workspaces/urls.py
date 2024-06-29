from django.urls import path

from . import views


urlpatterns = [
    path("", views.WorkSpaceListView.as_view(), name="workspace-list"),
    path("<slug:slug>/", views.WorkSpaceDetailView.as_view(), name="workspace-detail"),
    # path("", views.WorkSpaceListCreateView.as_view(), name="workspace-list-create"),
    # path(
    #     "@<str:slug>/",
    #     views.WorkSpaceRetrieveUpdateDestroyView.as_view(),
    #     name="workspace-detail",
    # ),
]
