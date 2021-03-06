# Generated by Django 4.0 on 2022-02-09 03:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_character__class_alter_character_race'),
    ]

    operations = [
        migrations.AlterField(
            model_name='character',
            name='race',
            field=models.CharField(choices=[['none', 'None'], ['dragonborn', 'Dragonborn'], ['dwarf', 'Dwarf'], ['elf', 'Elf'], ['gnome', 'Gnome'], ['half-elf', 'Half-Elf'], ['halfling', 'Halfling'], ['half-orc', 'Half-Orc'], ['human', 'Human'], ['tiefling', 'Tiefling']], max_length=64),
        ),
    ]
