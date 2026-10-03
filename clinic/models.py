from django.db import models


class Service(models.Model):
    title = models.CharField(max_length=120)
    category = models.CharField(max_length=80, default='General Dentistry')
    description = models.TextField()
    icon = models.CharField(max_length=80, default='dentistry')
    duration = models.CharField(max_length=60, default='20 to 30 Minutes')
    price_estimate = models.CharField(max_length=80, blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'services'
        ordering = ['order', 'title']

    def __str__(self):
        return self.title


class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=80)
    excerpt = models.TextField()
    content = models.TextField(blank=True)
    image_url = models.URLField(blank=True, null=True)
    slug = models.SlugField(unique=True, max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'blog_posts'
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class ContactRequest(models.Model):
    name = models.CharField(max_length=120)
    phone = models.CharField(max_length=40)
    email = models.EmailField(blank=True, null=True)
    service_interest = models.CharField(max_length=120, blank=True, default='General Dental Examination')
    preferred_time = models.CharField(max_length=80, blank=True, null=True)
    message = models.TextField()
    status = models.CharField(max_length=30, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'contact_requests'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.phone}"


class ClinicalDocument(models.Model):
    patient_name = models.CharField(max_length=120)
    patient_phone = models.CharField(max_length=40)
    patient_email = models.EmailField(blank=True, null=True)
    doctor_assigned = models.CharField(max_length=120, default='Dr. Robert Vance, DDS')
    document_name = models.CharField(max_length=255)
    document_type = models.CharField(max_length=100, default='Digital Periapical / Panoramic X-Ray')
    pain_level = models.PositiveSmallIntegerField(default=1)
    clinical_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'clinical_documents'
        ordering = ['-created_at']

    def __str__(self):
        return f"Case for {self.patient_name} ({self.document_name})"


class ChatMessage(models.Model):
    SENDER_CHOICES = [
        ('patient', 'Patient'),
        ('doctor', 'Doctor'),
        ('system', 'System'),
    ]

    sender_type = models.CharField(max_length=20, choices=SENDER_CHOICES, default='patient')
    sender_name = models.CharField(max_length=120)
    recipient_name = models.CharField(max_length=120)
    message_text = models.TextField()
    attachment_name = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'chat_messages'
        ordering = ['created_at']

    def __str__(self):
        return f"{self.sender_name} -> {self.recipient_name}: {self.message_text[:30]}"
