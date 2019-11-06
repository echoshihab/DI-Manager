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

    def get_queryset(self):
        date_parameter = self.request.query_params.get('date', None)
        date_range_parameter = self.request.query_params.get('date_range', None)

        if date_parameter is not None:
            return Shifts.objects.filter(date_of_shift=date_parameter)
        elif date_range_parameter is not None:
            date_range = date_range_parameter.split("^")
            return Shifts.objects.filter(date_of_shift__range=date_range)
        else:
            return Shifts.objects.all()


