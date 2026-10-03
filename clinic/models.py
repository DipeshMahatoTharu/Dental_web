from django.db import models


class Service(models.Model):
    title = models.CharField(max_length=150)
    category = models.CharField(max_length=100, default='General Dentistry')
    icon = models.CharField(max_length=50, blank=True, default='medical_services')
    image_url = models.URLField(max_length=500, blank=True, null=True)
    description = models.TextField()
    price_range = models.CharField(max_length=100, blank=True, default='Standard clinical fee')
    duration = models.CharField(max_length=100, blank=True, default='30-45 mins')
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'title']
        verbose_name = 'Service'
        verbose_name_plural = 'Services'

    def __str__(self):
        return self.title


class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    author = models.CharField(max_length=120, default='Dr. Dipesh Mahato')
    category = models.CharField(max_length=100, default='Preventive Dentistry')
    read_time = models.CharField(max_length=50, default='4 min read')
    excerpt = models.TextField()
    content = models.TextField()
    image_url = models.URLField(max_length=500, blank=True, null=True)
    is_published = models.BooleanField(default=True)
    published_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-published_at']
        verbose_name = 'Blog Post'
        verbose_name_plural = 'Blog Posts'

    def __str__(self):
        return self.title


class ContactRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('contacted', 'Contacted'),
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    name = models.CharField(max_length=120)
    phone = models.CharField(max_length=40)
    email = models.EmailField(blank=True, null=True)
    service_interested = models.CharField(max_length=120, blank=True, default='General Consultation')
    preferred_date = models.CharField(max_length=50, blank=True)
    message = models.TextField()
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Contact / Appointment Request'
        verbose_name_plural = 'Contact / Appointment Requests'

    def __str__(self):
        return f'{self.name} - {self.phone} ({self.status})'


class ClinicalDocument(models.Model):
    DOCUMENT_TYPES = [
        ('xray', 'Digital X-Ray / Radiograph'),
        ('cbct', 'CBCT 3D Scan'),
        ('panoramic', 'Panoramic OPG Radiograph'),
        ('prescription', 'Doctor Prescription'),
        ('report', 'Lab / Histopathology Report'),
        ('other', 'Other Medical Document'),
    ]

    URGENCY_CHOICES = [
        ('routine', 'Routine Assessment'),
        ('urgent', 'Urgent (Within 24 Hours)'),
        ('emergency', 'Emergency Dental Triage (Immediate)'),
    ]

    patient_name = models.CharField(max_length=120)
    patient_phone = models.CharField(max_length=40)
    patient_email = models.EmailField(blank=True, null=True)
    document_type = models.CharField(max_length=50, choices=DOCUMENT_TYPES, default='xray')
    file_url = models.TextField(help_text='File URL, Cloud Storage URI, or Data Payload')
    file_name = models.CharField(max_length=255, blank=True, default='clinical_xray.png')
    file_size_kb = models.IntegerField(default=0)
    pain_level = models.IntegerField(default=0, help_text='Scale 0 (No pain) to 10 (Severe)')
    urgency = models.CharField(max_length=30, choices=URGENCY_CHOICES, default='routine')
    clinical_notes = models.TextField(blank=True)
    assigned_doctor = models.CharField(max_length=120, default='Dr. Dipesh Mahato (Lead Dental Surgeon)')
    doctor_review_notes = models.TextField(blank=True)
    is_reviewed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Clinical Document / X-Ray'
        verbose_name_plural = 'Clinical Documents & X-Rays'

    def __str__(self):
        return f'{self.patient_name} - {self.document_type} (Pain: {self.pain_level}/10)'


class ChatMessage(models.Model):
    SENDER_CHOICES = [
        ('patient', 'Patient'),
        ('doctor', 'Doctor'),
        ('system', 'Clinical System'),
    ]

    session_id = models.CharField(max_length=100, db_index=True)
    sender_type = models.CharField(max_length=20, choices=SENDER_CHOICES, default='patient')
    sender_name = models.CharField(max_length=120)
    doctor_id = models.CharField(max_length=50, default='dr-dipesh')
    message = models.TextField()
    attachment_url = models.TextField(blank=True, null=True)
    attachment_name = models.CharField(max_length=255, blank=True, null=True)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']
        verbose_name = 'Chat Message'
        verbose_name_plural = 'Chat Messages'

    def __str__(self):
        return f'[{self.session_id}] {self.sender_name} ({self.sender_type}): {self.message[:30]}'
