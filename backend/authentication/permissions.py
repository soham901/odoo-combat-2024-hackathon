from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of thier own objects to edit it.
    """

    def has_object_permission(self, request, view, obj):
        try:
            if request.user.is_staff or request.user.is_admin:
                return True

            return (
                request.user.is_authenticated and obj.username == request.user.username
            )

        except Exception as e:
            print("ERROR:", e)
            return False
