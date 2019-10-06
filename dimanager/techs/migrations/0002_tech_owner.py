# Generated by Django 2.2.6 on 2019-10-06 20:52

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('techs', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tech',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='techs', to=settings.AUTH_USER_MODEL),
        ),
    ]