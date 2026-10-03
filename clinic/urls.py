from django.urls import path

from .views import (
    articles_view,
    chat_messages_view,
    clinical_documents_view,
    contact_request_view,
    health_check,
    services_view,
)

urlpatterns = [
    path('health/', health_check, name='health-check'),
    path('services/', services_view, name='services'),
    path('articles/', articles_view, name='articles'),
    path('contact/', contact_request_view, name='contact-request'),
    path('documents/', clinical_documents_view, name='clinical-documents'),
    path('chat/', chat_messages_view, name='chat-messages'),
]
