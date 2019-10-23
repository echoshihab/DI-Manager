# Generated by Django 2.2.6 on 2019-10-22 01:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('techs', '0002_tech_owner'),
        ('shifts', '0005_remove_shifts_location'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='shifts',
            options={'ordering': ['date_of_shift']},
        ),
        migrations.AddField(
            model_name='shifts',
            name='tech',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='techs.Tech'),
        ),
    ]