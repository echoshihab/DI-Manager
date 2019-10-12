from rest_framework import serializers
from shifts.models import ExamTypes

class ExamTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model= ExamTypes
        fields = '__all__'
