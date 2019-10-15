from rest_framework import routers
from .api import ExamTypesViewSet, ShiftTimeViewSet, ShiftsViewSet

router = routers.DefaultRouter()
router.register('api/exam-types', ExamTypesViewSet, 'exam-types')
router.register('api/shift-times', ShiftTimeViewSet, 'shift-times')
router.register('api/shifts', ShiftsViewSet, 'shifts')

urlpatterns = router.urls
