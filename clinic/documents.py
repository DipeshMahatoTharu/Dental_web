from mongoengine import DateTimeField, Document, EmailField, StringField, URLField, BooleanField, IntField
from django.utils import timezone


class Service(Document):
    title = StringField(required=True, max_length=120)
    description = StringField(required=True)
    icon = StringField(required=True, max_length=80)
    order = IntField(default=0)
    is_active = BooleanField(default=True)

    meta = {'collection': 'services', 'ordering': ['order', 'title']}


class BlogPost(Document):
    title = StringField(required=True, max_length=180)
    category = StringField(required=True, max_length=80)
    excerpt = StringField(required=True)
    image_url = URLField()
    slug = StringField(required=True, unique=True)
    created_at = DateTimeField(default=timezone.now)

    meta = {'collection': 'blog_posts', 'ordering': ['-created_at']}


class ContactRequest(Document):
    name = StringField(required=True, max_length=120)
    phone = StringField(required=True, max_length=40)
    email = EmailField()
    message = StringField(required=True)
    created_at = DateTimeField(default=timezone.now)

    meta = {'collection': 'contact_requests', 'ordering': ['-created_at']}


class ClinicalDocument(Document):
    patient_name = StringField(required=True, max_length=120)
    patient_phone = StringField(required=True, max_length=40)
    patient_email = EmailField()
    doctor_assigned = StringField(max_length=120, default='General Triage')
    document_name = StringField(required=True, max_length=200)
    document_type = StringField(max_length=80, default='Dental Radiograph / X-Ray')
    pain_level = IntField(min_value=1, max_value=10, default=1)
    clinical_notes = StringField()
    created_at = DateTimeField(default=timezone.now)

    meta = {'collection': 'clinical_documents', 'ordering': ['-created_at']}


class ChatMessage(Document):
    sender_type = StringField(required=True, choices=['patient', 'doctor', 'system'])
    sender_name = StringField(required=True, max_length=120)
    recipient_name = StringField(required=True, max_length=120)
    message_text = StringField(required=True, max_length=4000)
    attachment_name = StringField(max_length=200)
    created_at = DateTimeField(default=timezone.now)

    meta = {'collection': 'chat_messages', 'ordering': ['created_at']}
