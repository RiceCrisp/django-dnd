from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import datetime


def abilities_default():
    return {
        'strength': 0,
        'dexterity': 0,
        'constitution': 0,
        'intelligence': 0,
        'wisdom': 0,
        'charisma': 0
    }


def skills_default():
    return {
        'acrobatics': 0,
        'animalHandling': 0,
        'arcana': 0,
        'atheletics': 0,
        'deception': 0,
        'history': 0,
        'insight': 0,
        'intimidation': 0,
        'investigation': 0,
        'medicine': 0,
        'nature': 0,
        'perception': 0,
        'performance': 0,
        'persuasion': 0,
        'religion': 0,
        'sleightOfHand': 0,
        'stealth': 0,
        'survival': 0
    }


class User(AbstractUser):
    email = models.EmailField(unique=True, blank=False, max_length=256)
    fav_color = models.CharField(blank=True, max_length=120)


class Campaign(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(blank=False, max_length=256)
    date_created = models.DateTimeField(editable=False, auto_now_add=True)


class Character(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)
    order = models.IntegerField(default=0)
    name = models.CharField(blank=False, max_length=254)
    race = models.CharField(choices=[
        ['', 'None'],
        ['dragonborn', 'Dragonborn'],
        ['dwarf', 'Dwarf'],
        ['elf', 'Elf'],
        ['gnome', 'Gnome'],
        ['half-elf', 'Half-Elf'],
        ['halfling', 'Halfling'],
        ['half-orc', 'Half-Orc'],
        ['human', 'Human'],
        ['tiefling', 'Tiefling']
    ], max_length=64)
    _class = models.CharField(choices=[
        ['', 'None'],
        ['barbarian', 'Barbarian'],
        ['bard', 'Bard'],
        ['cleric', 'Cleric'],
        ['druid', 'Druid'],
        ['fighter', 'Fighter'],
        ['monk', 'Monk'],
        ['paladin', 'Paladin'],
        ['ranger', 'Ranger'],
        ['rogue', 'Rogue'],
        ['sorcerer', 'Sorcerer'],
        ['warlock', 'Warlock'],
        ['wizard', 'Wizard'],
        ['artificer', 'Artificer'],
        ['bloodHunter', 'Blood Hunter']
    ], max_length=64)
    abilities = models.JSONField(default=abilities_default)
    skills = models.JSONField(default=skills_default)
    hp = models.IntegerField(default=0)
    maxHp = models.IntegerField(default=0)
    date_created = models.DateTimeField(editable=False, auto_now_add=True)
