from techs.models import Tech 
from rest_framework import viewsets, permissions
from .serializers import TechSerializer

class TechViewSet(viewsets.ModelViewSet):
    queryset = Tech.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = TechSerializer