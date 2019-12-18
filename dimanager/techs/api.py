from techs.models import Tech 
from rest_framework import viewsets
from .serializers import TechSerializer
from accounts.permissions import IsCoordinator

class TechViewSet(viewsets.ModelViewSet):
    serializer_class = TechSerializer

    permission_classes = [
        IsCoordinator 
    ]
    
    def get_queryset(self):
        return self.request.user.techs.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        