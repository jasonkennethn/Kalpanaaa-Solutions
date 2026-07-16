from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, subscribe_view, contact_view

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')

urlpatterns = [
    path('', include(router.urls)),
    path('subscribe/', subscribe_view, name='subscribe'),
    path('contact/', contact_view, name='contact'),
]
