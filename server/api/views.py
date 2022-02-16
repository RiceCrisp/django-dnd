from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework import filters, generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from . import models
from . import serializers
from . import utils


class UserPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        if (view.action == 'update' or view.action == 'partial_update' or view.action == 'destroy'):
            authorizedUserId = request.user.id
            requestedUserId = view.kwargs.get('pk')
            if not authorizedUserId or not requestedUserId:
                return False
            if int(authorizedUserId) == int(requestedUserId):
                return True
            return False
        return True


class CampaignPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        if (view.action == 'update' or view.action == 'partial_update' or view.action == 'destroy'):
            authorizedUser = utils.getJWTUser(request)
            requestedCampaignId = view.kwargs.get('pk')
            if not authorizedUser or not requestedCampaignId:
                return False
            campaign = models.Campaign.objects.get(pk=requestedCampaignId)
            if not campaign:
                return False
            if int(authorizedUser.id) == int(campaign.owner.id):
                return True
            return False
        if (view.action == 'create'):
            return True if utils.getJWTUser(request) else False
        return True


class CharacterPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        if (view.action == 'update' or view.action == 'partial_update' or view.action == 'destroy'):
            authorizedUser = utils.getJWTUser(request)
            requestedCharacterId = view.kwargs.get('pk')
            if not authorizedUser or not requestedCharacterId:
                return False
            character = models.Character.objects.get(pk=requestedCharacterId)
            if not character:
                return False
            campaign = models.Campaign.objects.get(pk=character.campaign_id)
            if not campaign:
                return False
            if int(authorizedUser.id) == int(campaign.owner.id):
                return True
            return False
        if (view.action == 'create'):
            return True if utils.getJWTUser(request) else False
        return True


class CampaignViewSet(viewsets.ModelViewSet):
    authentication_classes = []
    permission_classes = [CampaignPermissions]
    serializer_class = serializers.Campaign
    queryset = models.Campaign.objects.all()

    def get_queryset(self):
        user = utils.getJWTUser(self.request)
        if (user is not None):
            return super().get_queryset().filter(owner=user.id)
        return super().get_queryset()


class CharacterViewSet(viewsets.ModelViewSet):
    authentication_classes = []
    permission_classes = [CharacterPermissions]
    serializer_class = serializers.Character
    queryset = models.Character.objects.all()
    filter_fields = ['campaign']

    # def update(self, request, pk=None):


    # def patch(self, request, *args, **kwargs):
    #     print('xxxxxx')
    #     if (isinstance(request.data, list)):
    #         ids = [character.id for character in self.queryset]
    #         instance = self.queryset.filter(pk__in=ids)
    #         print(instance)
    #         serializer = self.get_serializer(instance, data=request.data, partial=True, many=True)
    #         serializer.is_valid(raise_exception=True)
    #         # print(serializer)
    #         self.perform_update(serializer)
    #         # if getattr(instance, '_prefetched_objects_cache', None):
    #         #     # If 'prefetch_related' has been applied to a queryset, we need to
    #         #     # forcibly invalidate the prefetch cache on the instance.
    #         #     instance._prefetched_objects_cache = {}

    #         return Response(serializer.data)


class Logout(APIView):
    authentication_classes = []
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh_token')
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [UserPermissions]
    queryset = models.User.objects.all()

    def get_serializer_class(self):
        context = self.get_serializer_context()
        authorizedUserId = self.request.user.id
        requestedUserId = context['view'].kwargs.get('pk')
        if authorizedUserId and requestedUserId:
            if int(authorizedUserId) == int(requestedUserId):
                return serializers.FullUser
        return serializers.BasicUser

    # def retrieve(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance)
    #     return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}
        return Response(serializer.data)
