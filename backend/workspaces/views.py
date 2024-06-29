from django.views.generic import ListView, DetailView
from .models import WorkSpace


class WorkSpaceListView(ListView):
    model = WorkSpace
    template_name = "workspaces/list.html"
    context_object_name = "workspaces"
    paginate_by = 9  # Changed to 9 for a 3x3 grid layout

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


# from django.db.utils import IntegrityError

# from rest_framework.permissions import IsAuthenticated
# from rest_framework import generics, status
# from rest_framework.authentication import SessionAuthentication
# from rest_framework_simplejwt.authentication import JWTAuthentication
# from rest_framework.response import Response

# from user.models import Role


# # from .permissions import IsOwnerOrReadOnly
# from .models import WorkSpace
# from .serializers import WorkSpaceSerializer, WorkSpaceListSerializer


# class WorkSpaceListCreateView(generics.ListCreateAPIView):
#     """
#     API endpoint for creating and listing WorkSpaces.
#     """

#     queryset = WorkSpace.objects.filter()
#     authentication_classes = [JWTAuthentication, SessionAuthentication]
#     permission_classes = [IsAuthenticated]
#     serializer_class = WorkSpaceListSerializer

#     def create(self, request, *args, **kwargs):
#         serializer = self.serializer_class(data=request.data)

#         # check if user have any roles or not
#         if request.user.role in [Role.USER]:
#             if serializer.is_valid():
#                 try:
#                     serializer.save(user=request.user)
#                     return Response(
#                         {
#                             "data": serializer.data,
#                             "message": "WorkSpace created successfully",
#                         },
#                         status=status.HTTP_201_CREATED,
#                     )
#                 except IntegrityError as e:
#                     field = e.args[0].split(".")[1] or "input"
#                     return Response(
#                         {field: "WorkSpace already exists with this " + field},
#                         status=status.HTTP_400_BAD_REQUEST,
#                     )

#             else:
#                 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         # otherwise raise error
#         else:
#             return Response(
#                 {"message": "User is already a WorkSpace or owner"},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )


# class WorkSpaceRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
#     """
#     API endpoint for retrieving, updating, and deleting WorkSpaces.
#     """

#     queryset = WorkSpace.objects.filter()
#     serializer_class = WorkSpaceSerializer
#     lookup_field = "slug"
#     # permission_classes = [IsOwnerOrReadOnly]
