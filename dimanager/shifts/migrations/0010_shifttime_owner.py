# Generated by Django 2.2.6 on 2019-12-15 01:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('shifts', '0009_auto_20191214_1700'),
    ]

    operations = [
        migrations.AddField(
            model_name='shifttime',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='ShiftTimes', to=settings.AUTH_USER_MODEL),
        ),
    ]
