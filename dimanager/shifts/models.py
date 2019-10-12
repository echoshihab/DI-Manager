from django.db import models

# Create your models here.
class ExamTypes(models.Model):
    exam_type = models.CharField(max_length=7, unique=True)


