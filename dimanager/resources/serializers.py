from rest_framework import serializers
from resources.models import Location, Room

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model= Location
        fields = '__all__'

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'

