from rest_framework import serializers
from shifts.models import ExamTypes, ShiftTime, Shifts, Modality
from techs.serializers import TechSerializer
from resources.serializers import RoomSerializer

class ModalitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Modality
        fields = ('id', 'modality')

class ExamTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model= ExamTypes
        fields = '__all__'

class ShiftTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShiftTime
        fields = '__all__'
        validators = [
            serializers.UniqueTogetherValidator(
                queryset = model.objects.all(),
                fields=("start_time", "end_time"),
                message="Error: Duplicate Shift"
            )
        ]


class ShiftsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shifts
        fields = '__all__'
        depth = 1


class ShiftsCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model= Shifts
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['exam_type'] = ExamTypesSerializer(instance.exam_type).data
        response['shift_time'] = ShiftTimeSerializer(instance.shift_time).data
        response['room'] = RoomSerializer(instance.room).data
        response['tech'] = TechSerializer(instance.tech).data
        return response
    


