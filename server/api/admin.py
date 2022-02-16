from django.contrib import admin
from . import models


class User(admin.ModelAdmin):
    model = models.User


class Campaign(admin.ModelAdmin):
    model = models.Campaign
    list_display = ['id', 'name']
    readonly_fields = ['date_created']


class Character(admin.ModelAdmin):
    model = models.Character
    list_display = ['id', 'name']


admin.site.register(models.User, User)
admin.site.register(models.Campaign, Campaign)
admin.site.register(models.Character, Character)
