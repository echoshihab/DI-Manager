from django.db import models
from django.contrib.auth.models import User

class Location(models.Model):
    location = models.CharField(max_length=20)
    owner = models.ForeignKey(User, related_name="Locations", on_delete=models.PROTECT, null=True)

    class Meta:
        unique_together = ["location", "owner"]

    def __str__(self):
        return self.location


class Room(models.Model):
    room = models.CharField(max_length=10, unique=True)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, related_name="Rooms", on_delete=models.PROTECT, null=True)

    def __str__(self):
        return self.room

    