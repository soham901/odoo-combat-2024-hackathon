from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.

        try:
            if request.user.is_staff or request.user.is_admin:
                return True

            if request.method in permissions.SAFE_METHODS:
                return True

            return obj.user.username == request.user.username

        except Exception as e:
            print("ERROR:", e)
            return False
