from django.urls import path

from .views import contact_request, health_check, services

urlpatterns = [
    path('health/', health_check, name='health-check'),
    path('services/', services, name='services'),
    path('contact/', contact_request, name='contact-request'),
]
