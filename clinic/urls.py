from django.urls import path

from .views import (
    chat_message,
    contact_request,
    document_upload,
    health_check,
    services,
)

urlpatterns = [
    path('health/', health_check, name='health-check'),
    path('services/', services, name='services'),
    path('contact/', contact_request, name='contact-request'),
    path('documents/', document_upload, name='document-upload'),
    path('chat/', chat_message, name='chat-message'),
]
