from rest_framework import serializers
from techs.models import Tech


#Tech serializer
class TechSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tech
        fields = '__all__'
