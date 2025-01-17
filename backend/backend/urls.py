from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from user.views import login_view, signup_view, logout_view


@api_view(["GET"])
def health_check(request):
    return Response({"status": "ok"}, status=status.HTTP_200_OK)


apipatterns = [
    path("", health_check),
    path("api-auth/", include("rest_framework.urls")),
    path("auth/", include("authentication.urls")),
    path("users/", include("user.urls")),
    path("customers/", include("customer.urls")),
    path("workspaces/", include("workspaces.urls")),
]

urlpatterns = [
    path("admin/", admin.site.urls),
    path("workspaces/", include("workspaces.urls")),
    path("booking/", include("booking.urls")),
    path("", include("home.urls")),
    path("signup/", signup_view, name="signup"),
    path("login/", login_view, name="login"),
    path("logout/", logout_view, name="logout"),
    # path("api/", include(apipatterns)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
