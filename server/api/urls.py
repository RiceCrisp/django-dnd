from django.urls import include, path
from rest_framework_simplejwt import views as jwt_views
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'campaigns', views.CampaignViewSet)
router.register(r'characters', views.CharacterViewSet)

app_name = 'api'
urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path(
        'auth/jwt/destroy/',
        views.Logout.as_view(),
        name='auth_logout'
    ),
    path('test/', views.TestView.as_view())
]
