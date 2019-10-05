from rest_framework import routers
from .api import TechViewSet

router = routers.DefaultRouter()
router.register('api/techs', TechViewSet, 'techs')

urlpatterns = router.urls
