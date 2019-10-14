from rest_framework import routers
from .api import LocationViewSet, RoomViewSet

router = routers.DefaultRouter()
router.register('api/location', LocationViewSet, 'location')
router.register('api/room', RoomViewSet, 'room')

urlpatterns = router.urls
