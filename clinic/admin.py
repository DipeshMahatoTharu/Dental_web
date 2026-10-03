from django.contrib import admin

from .models import BlogPost, ChatMessage, ClinicalDocument, ContactRequest, Service


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'duration', 'order', 'is_active')
    list_filter = ('category', 'is_active')
    search_fields = ('title', 'description', 'category')
    list_editable = ('order', 'is_active')


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'created_at')
    list_filter = ('category', 'created_at')
    search_fields = ('title', 'excerpt', 'content')
    prepopulated_fields = {'slug': ('title',)}


@admin.register(ContactRequest)
class ContactRequestAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'service_interest', 'status', 'created_at')
    list_filter = ('status', 'service_interest', 'created_at')
    search_fields = ('name', 'phone', 'email', 'message')


@admin.register(ClinicalDocument)
class ClinicalDocumentAdmin(admin.ModelAdmin):
    list_display = (
        'patient_name',
        'patient_phone',
        'doctor_assigned',
        'document_type',
        'pain_level',
        'created_at',
    )
    list_filter = ('doctor_assigned', 'document_type', 'pain_level', 'created_at')
    search_fields = (
        'patient_name',
        'patient_phone',
        'patient_email',
        'document_name',
        'clinical_notes',
    )


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ('sender_name', 'sender_type', 'recipient_name', 'created_at')
    list_filter = ('sender_type', 'created_at')
    search_fields = ('sender_name', 'recipient_name', 'message_text')
