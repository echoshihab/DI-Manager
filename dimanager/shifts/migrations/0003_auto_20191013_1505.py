# Generated by Django 2.2.6 on 2019-10-13 19:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shifts', '0002_shifttime'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shifttime',
            name='end_time',
            field=models.TimeField(),
        ),
        migrations.AlterField(
            model_name='shifttime',
            name='start_time',
            field=models.TimeField(),
        ),
    ]