from rest_framework import serializers
from shifts.models import ExamTypes, ShiftTime, Shifts

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
    shift_time = ShiftTimeSerializer(many=False)
    room = serializers.SlugRelatedField(many=False, read_only=True, slug_field='room')

    class Meta:
        model = Shifts
        fields = '__all__'