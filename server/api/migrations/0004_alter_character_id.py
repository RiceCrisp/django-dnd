# Generated by Django 4.0 on 2022-01-27 22:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_character_hp_character_maxhp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='character',
            name='id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]
