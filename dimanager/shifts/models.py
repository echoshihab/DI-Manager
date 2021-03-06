from django.db import models
from django.contrib.auth.models import User


class Modality(models.Model):
    modality = models.CharField(max_length=7, unique=True)
    coordinator = models.ManyToManyField(User, related_name="modalities")



class ExamTypes(models.Model):
    exam_type = models.CharField(max_length=7, unique=True)
    modality = models.ForeignKey(Modality, related_name="modality_exams", on_delete=models.PROTECT, null=True)
    owner = models.ForeignKey(User, related_name="ExamTypes", on_delete=models.PROTECT, null=True)
    


class ShiftTime(models.Model):
    start_time = models.TimeField()
    end_time = models.TimeField()
    owner = models.ForeignKey(User, related_name="ShiftTimes", on_delete=models.PROTECT, null=True)

    class Meta:
        unique_together = ["start_time", "end_time"]

class Shifts(models.Model):
    date_of_shift = models.DateField()
    exam_type = models.ForeignKey('ExamTypes', on_delete=models.CASCADE)
    shift_time = models.ForeignKey('ShiftTime', on_delete=models.CASCADE)
    room = models.ForeignKey('resources.Room', on_delete=models.CASCADE)
    tech = models.ForeignKey('techs.Tech', on_delete=models.CASCADE, null=True)
    modality = models.ForeignKey(Modality, related_name="modality_shifts", null=True, on_delete=models.CASCADE)

    class Meta:
        ordering = ['date_of_shift']


    