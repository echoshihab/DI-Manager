# Generated by Django 2.2.6 on 2019-11-02 17:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shifts', '0006_auto_20191021_2121'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='shifttime',
            unique_together={('start_time', 'end_time')},
        ),
    ]
