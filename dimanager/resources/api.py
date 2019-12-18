from resources.models import Location, Room
from rest_framework import viewsets, permissions
from .serializers import LocationSerializer, RoomSerializer
from accounts.permissions import IsCoordinator

class LocationViewSet(viewsets.ModelViewSet):
    serializer_class = LocationSerializer
    
    permission_classes = [
        IsCoordinator
    ]

    def get_queryset(self):
        return self.request.user.Locations.all()
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    

class RoomViewSet(viewsets.ModelViewSet):
    serializer_class = RoomSerializer
    permission_classes = [
        IsCoordinator
    ]

    def get_queryset(self):
        query_parameter = self.request.query_params.get('location', None)
        if query_parameter == None:
            return self.request.user.Rooms.all()
        else:
            location = Location.objects.get(id=query_parameter)
            return self.request.user.Rooms.filter(location = location)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


  