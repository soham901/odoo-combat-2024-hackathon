from django.db.utils import IntegrityError

from rest_framework import generics, status
from rest_framework.response import Response


from .permissions import IsOwnerOrReadOnly
from .models import User
from .serializers import UserSerializer, MeSerializer


class UserListCreateView(generics.ListCreateAPIView):
    """
    API endpoint for creating and listing users.
    """

    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            try:
                serializer.save()
                return Response(
                    {
                        "data": serializer.data,
                        "message": "User created successfully, please verify your email",
                    },
                    status=status.HTTP_201_CREATED,
                )
            except IntegrityError as e:
                field = e.args[0].split(".")[1] or "input"
                return Response(
                    {field: "User already exists with this " + field},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint for retrieving, updating, and deleting users.
    """

    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    lookup_field = "username"
    permission_classes = [IsOwnerOrReadOnly]


class MeView(UserRetrieveUpdateDestroyView):
    """
    API endpoint for retrieving, updating and deleting the current user.
    """

    serializer_class = MeSerializer

    def get_object(self):
        if self.request.user.is_anonymous:
            return None
        return self.request.user

    def get(self, request, *args, **kwargs):
        obj = self.get_object()
        if obj is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(obj)
        return Response(serializer.data)
