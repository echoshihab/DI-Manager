from shifts.models import ExamTypes, ShiftTime, Shifts
from rest_framework import viewsets, permissions
from .serializers import ExamTypesSerializer, ShiftTimeSerializer, ShiftsSerializer, ShiftsCreateSerializer

class ExamTypesViewSet(viewsets.ModelViewSet):
    queryset = ExamTypes.objects.all() 
    permission_classes = [
        permissions.AllowAny #changed from AllowAny
    ]

    serializer_class = ExamTypesSerializer

class ShiftTimeViewSet(viewsets.ModelViewSet):
    queryset = ShiftTime.objects.all()
    permission_classes = [
        permissions.AllowAny 
    ]

    serializer_class = ShiftTimeSerializer

class ShiftsViewSet(viewsets.ModelViewSet):
    queryset = Shifts.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ShiftsSerializer
    serializer_action_classes = {
        'create': ShiftsCreateSerializer
    }

    def get_serializer_class(self):
        try:
            return self.serializer_action_classes[self.action]
        except (KeyError, AttributeError):
            return super().get_serializer_class()
