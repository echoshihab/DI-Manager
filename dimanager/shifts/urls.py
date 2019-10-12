from rest_framework import routers
from .api import ExamTypesViewSet

router = routers.DefaultRouter()
router.register('api/exam-types', ExamTypesViewSet, 'exam-types')

urlpatterns = router.urls
