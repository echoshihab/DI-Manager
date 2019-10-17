from resources.models import Location, Room
from rest_framework import viewsets, permissions
from .serializers import LocationSerializer, RoomSerializer

class LocationViewSet(viewsets.ModelViewSet):
    serializer_class = LocationSerializer
    queryset = Location.objects.all() 
    permission_classes = [
        permissions.AllowAny 
    ]

    

class RoomViewSet(viewsets.ModelViewSet):
    serializer_class = RoomSerializer
    permission_classes = [
        permissions.AllowAny 
    ]

    def get_queryset(self):
        query_parameter = self.request.query_params.get('location', None)
        location = Location.objects.get(id=query_parameter)
        return Room.objects.filter(location = location)


  