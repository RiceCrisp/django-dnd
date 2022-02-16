from rest_framework_simplejwt.tokens import AccessToken
from rest_framework import serializers
from django.contrib.auth import authenticate

from . import models
from . import utils


class FullUser(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined']


class BasicUser(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['username', 'date_joined']


class Campaign(serializers.ModelSerializer):
    class Meta:
        model = models.Campaign
        fields = ['id', 'name']
        read_only_fields = ['date_created']
    
    def create(self, validated_data):
        user = utils.getJWTUser(self.context['request'])
        campaign = self.Meta.model(
            name=validated_data['name'],
            owner=user
        )
        campaign.save()
        return campaign


class CharacterList(serializers.ListSerializer):
    def update(self, instance, validated_data):
        character_mapping = { character.id: character for character in instance }
        print(validated_data)
        data_mapping = { item['id']: item for item in validated_data }
        ret = []
        for characterId, data in data_mapping.items():
            character = character_mapping.get(characterId, None)
            ret.append(self.child.update(character, data))
        return ret


class Character(serializers.ModelSerializer):
    # id = serializers.IntegerField()

    class Meta:
        model = models.Character
        fields = '__all__'
        # list_serializer_class = CharacterList
