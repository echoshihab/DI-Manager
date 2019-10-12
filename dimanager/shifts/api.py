from shifts.models import ExamTypes 
from rest_framework import viewsets, permissions
from .serializers import ExamTypesSerializer

class ExamTypesViewSet(viewsets.ModelViewSet):
    queryset = ExamTypes.objects.all() 
    permission_classes = [
        permissions.AllowAny #changed from AllowAny
    ]

    serializer_class = ExamTypesSerializer
