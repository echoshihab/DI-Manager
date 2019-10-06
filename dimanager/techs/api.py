from techs.models import Tech 
from rest_framework import viewsets, permissions
from .serializers import TechSerializer

class TechViewSet(viewsets.ModelViewSet):
    # queryset = Tech.objects.all() this is to view all
    permission_classes = [
        permissions.IsAuthenticated #changed from AllowAny
    ]

    def get_queryset(self):
        return self.request.user.leads.all()

    serializer_class = TechSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        