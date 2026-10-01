from mongoengine import DateTimeField, Document, EmailField, StringField
from mongoengine import URLField
from mongoengine import BooleanField
from mongoengine import IntField
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
