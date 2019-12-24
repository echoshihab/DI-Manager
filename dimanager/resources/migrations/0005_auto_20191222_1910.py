# Generated by Django 2.2.6 on 2019-12-23 00:10

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('resources', '0004_delete_modality'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='location',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterUniqueTogether(
            name='location',
            unique_together={('location', 'owner')},
        ),
    ]