from django.contrib.auth.models import Group
from rest_framework import permissions


class IsCoordinator(permissions.BasePermission):
    message = "Insufficient Permissions"
    def has_permission(self, request, viewset):
        if viewset.action == 'list' and request.user:
            return True
        elif viewset.action == 'create' or viewset.action == 'destroy':
            if request.user.groups.filter(name="Coordinator"):
                return True
        return False