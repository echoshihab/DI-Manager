from django.db import models


class Location(models.Model):
    location = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.location


class Room(models.Model):
    room = models.CharField(max_length=10, unique=True)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)

    def __str__(self):
        return self.room

    