from django.db import models
from django.contrib.auth.models import User


class ExamTypes(models.Model):
    exam_type = models.CharField(max_length=7, unique=True)
    owner = models.ForeignKey(User, related_name="ExamTypes", on_delete=models.PROTECT, null=True)
    


class ShiftTime(models.Model):
    start_time = models.TimeField()
    end_time = models.TimeField()
    class Meta:
        unique_together = ["start_time", "end_time"]

class Shifts(models.Model):
    date_of_shift = models.DateField()
    exam_type = models.ForeignKey('ExamTypes', on_delete=models.CASCADE)
    shift_time = models.ForeignKey('ShiftTime', on_delete=models.CASCADE)
    room = models.ForeignKey('resources.Room', on_delete=models.CASCADE)
    tech = models.ForeignKey('techs.Tech', on_delete=models.CASCADE, null=True)

    class Meta:
        ordering = ['date_of_shift']


    