from rest_framework import serializers

from .models import BlogPost, ChatMessage, ClinicalDocument, ContactRequest, Service


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = '__all__'


class ContactRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactRequest
        fields = '__all__'
        read_only_fields = ['id', 'status', 'created_at']


class ClinicalDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicalDocument
        fields = '__all__'
        read_only_fields = ['id', 'is_reviewed', 'doctor_review_notes', 'created_at']


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = '__all__'
        read_only_fields = ['id', 'created_at']
