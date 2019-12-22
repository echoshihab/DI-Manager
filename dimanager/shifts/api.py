from shifts.models import ExamTypes, ShiftTime, Shifts, Modality
from rest_framework import viewsets, permissions
from .serializers import ExamTypesSerializer, ShiftTimeSerializer, ShiftsSerializer, ShiftsCreateSerializer, ModalitySerializer
from accounts.permissions import IsCoordinator


class ModalityViewSet(viewsets.ModelViewSet):
    queryset = Modality.objects.all()
    serializer_class = ModalitySerializer

    permission_classes = [
        permissions.AllowAny
    ]
    
    

class ExamTypesViewSet(viewsets.ModelViewSet):
    serializer_class = ExamTypesSerializer

    permission_classes = [
        IsCoordinator
    ]

    def get_queryset(self):
        query_parameter = self.request.query_params.get('modality', None)
        if query_parameter == None:
            return self.request.user.ExamTypes.all()
        else:
            modality = Modality.objects.get(id=query_parameter)
            return self.request.user.ExamTypes.filter(modality = modality)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ShiftTimeViewSet(viewsets.ModelViewSet):
    serializer_class = ShiftTimeSerializer
    permission_classes = [
        IsCoordinator
    ]

    def get_queryset(self):
        return self.request.user.ShiftTimes.all()
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    

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
            return Shifts.objects.filter(date_of_shift=date_parameter).order_by('room')
        elif date_range_parameter is not None:
            date_range = date_range_parameter.split("^")
            return Shifts.objects.filter(date_of_shift__range=date_range).order_by('room')
        else:
            return Shifts.objects.all()


