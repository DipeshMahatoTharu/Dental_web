from django.contrib import admin

from .models import BlogPost, ChatMessage, ClinicalDocument, ContactRequest, Service


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'price_range', 'duration', 'order', 'is_active')
    list_filter = ('category', 'is_active')
    search_fields = ('title', 'description')
    ordering = ('order', 'title')


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'category', 'read_time', 'is_published', 'published_at')
    list_filter = ('category', 'is_published')
    search_fields = ('title', 'content', 'author')
    prepopulated_fields = {'slug': ('title',)}


@admin.register(ContactRequest)
class ContactRequestAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'email', 'service_interested', 'status', 'created_at')
    list_filter = ('status', 'service_interested', 'created_at')
    search_fields = ('name', 'phone', 'email', 'message')


@admin.register(ClinicalDocument)
class ClinicalDocumentAdmin(admin.ModelAdmin):
    list_display = ('patient_name', 'patient_phone', 'document_type', 'pain_level', 'urgency', 'is_reviewed', 'created_at')
    list_filter = ('document_type', 'urgency', 'is_reviewed', 'created_at')
    search_fields = ('patient_name', 'patient_phone', 'clinical_notes', 'doctor_review_notes')


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ('session_id', 'sender_name', 'sender_type', 'doctor_id', 'is_read', 'created_at')
    list_filter = ('sender_type', 'is_read', 'created_at')
    search_fields = ('session_id', 'sender_name', 'message')
