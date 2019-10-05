from django.db import models

# Create your models here.
class Tech(models.Model):
    name = models.CharField(max_length=100)
    initials = models.CharField(max_length=5, unique=True)
    certs = models.CharField(max_length=500, blank=True)
