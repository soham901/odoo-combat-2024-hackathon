from django.conf import settings

from rest_framework import generics, status
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import LoginSerializer, ProfileSerializer
# from .permissions import IsOwnerOrReadOnly


class LoginView(generics.CreateAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        response = Response(
            {"access": access_token, "user": ProfileSerializer(user).data},
            status=status.HTTP_200_OK,
        )

        # Set the refresh token in the cookie
        cookie_max_age = 3600 * 24  # 24 hours
        response.set_cookie(
            key=settings.SIMPLE_JWT["AUTH_COOKIE_REFRESH"],
            value=str(refresh),
            expires=cookie_max_age,
            httponly=True,
            secure=True,
            domain=None,
            samesite="none",
        )

        return response


class RefreshTokenView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        print(request.COOKIES)
        refresh_token = request.COOKIES.get(settings.SIMPLE_JWT["AUTH_COOKIE_REFRESH"])

        if not refresh_token:
            return Response(
                {"detail": "Refresh token not found"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        refresh = RefreshToken(refresh_token)
        access_token = str(refresh.access_token)

        response = Response({"access": access_token}, status=status.HTTP_200_OK)

        # Set the refresh token in the cookie
        cookie_max_age = 3600 * 24  # 24 hours
        response.set_cookie(
            key=settings.SIMPLE_JWT["AUTH_COOKIE_REFRESH"],
            value=str(refresh),
            expires=cookie_max_age,
            httponly=True,
            secure=True,
        )

        return response


class LogoutView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        try:
            token = RefreshToken(
                request.COOKIES.get(settings.SIMPLE_JWT["AUTH_COOKIE_REFRESH"])
            )
            token.blacklist()
            response = Response(
                {"message": "Logout successful"}, status=status.HTTP_200_OK
            )
            response.set_cookie(
                key=settings.SIMPLE_JWT["AUTH_COOKIE_REFRESH"],
                value="",
                max_age=0,
                samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
                httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
                secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
            )
            response.delete_cookie(settings.SIMPLE_JWT["AUTH_COOKIE_REFRESH"])
            return response

        except Exception as e:
            print(e)
            return Response(
                {"message": "Logout failed"}, status=status.HTTP_400_BAD_REQUEST
            )


class GetCookiesView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        print(request.COOKIES)
        return Response(status=status.HTTP_200_OK)


# class ProfileView(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = ProfileSerializer
#     permission_classes = [IsOwnerOrReadOnly]

#     def get_object(self):
#         if self.request.user.is_authenticated:
#             return self.request.user
#         else:
#             return None

#     def get(self, request, *args, **kwargs):
#         obj = self.get_object()
#         if obj is None:
#             return Response(status=status.HTTP_404_NOT_FOUND)
#         serializer = self.get_serializer(obj)
#         return Response(serializer.data)

#     def put(self, request, *args, **kwargs):
#         obj = self.get_object()
#         if obj is None:
#             return Response(status=status.HTTP_404_NOT_FOUND)
#         serializer = self.get_serializer(obj, data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data)

#     def patch(self, request, *args, **kwargs):
#         obj = self.get_object()
#         if obj is None:
#             return Response(status=status.HTTP_404_NOT_FOUND)
#         serializer = self.get_serializer(obj, data=request.data, partial=True)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data)

#     def delete(self, request, *args, **kwargs):
#         obj = self.get_object()
#         if obj is None:
#             return Response(status=status.HTTP_404_NOT_FOUND)
#         obj.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
