from typing import Any
from django.db.models.query import QuerySet
from django.views.generic import ListView, DetailView
from django.core.paginator import Paginator
from .models import WorkSpace
from resources.models import Resource


class CustomPaginator(Paginator):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)


class WorkSpaceListView(ListView):
    model = WorkSpace
    # paginator_class = CustomPaginator
    template_name = "workspaces/list.html"
    context_object_name = "workspaces"
    paginate_by = 9

    def get_queryset(self):
        queryset = super().get_queryset()
        city = self.request.GET.get("city")
        state = self.request.GET.get("state")
        amenity = self.request.GET.get("amenity")

        if city:
            queryset = queryset.filter(city__name__icontains=city)
        if state:
            queryset = queryset.filter(state__name__icontains=state)
        if amenity:
            queryset = queryset.filter(amenities__name__icontains=amenity)

        return queryset


class WorkSpaceDetailView(DetailView):
    model = WorkSpace
    template_name = "workspaces/detail.html"
    context_object_name = "workspace"
