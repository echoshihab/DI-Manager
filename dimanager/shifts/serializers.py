from rest_framework import serializers
from shifts.models import ExamTypes, ShiftTime, Shifts
from techs.serializers import TechSerializer
from resources.serializers import RoomSerializer

class ExamTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model= ExamTypes
        fields = '__all__'

class ShiftTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShiftTime
        fields = '__all__'


class ShiftsSerializer(serializers.ModelSerializer):
    exam_type = serializers.SlugRelatedField(many=False, read_only=True, slug_field='exam_type')
    shift_time = ShiftTimeSerializer(many=False, read_only=True)
    room = serializers.SlugRelatedField(many=False, read_only=True, slug_field='room')
    tech = serializers.SlugRelatedField(many=False, read_only=True, slug_field='initials')

    class Meta:
        model = Shifts
        fields = '__all__'
    

class ShiftsCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model= Shifts
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['exam_type'] = ExamTypesSerializer(instance.exam_type).data['exam_type']
        response['shift_time'] = ShiftTimeSerializer(instance.shift_time).data
        response['room'] = RoomSerializer(instance.room).data['room']
        response['tech'] = TechSerializer(instance.tech).data['initials']
        return response
    


