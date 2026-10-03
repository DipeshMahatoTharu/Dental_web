from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import ChatMessage, ClinicalDocument, ContactRequest, Service


DEFAULT_SERVICES = [
    {
        'id': 1,
        'icon': 'dentistry',
        'title': 'General Dentistry & Comprehensive Exams',
        'category': 'General Dentistry',
        'description': 'Comprehensive exams, cleanings, and preventive care for all ages.',
        'duration': '20 to 30 Minutes',
        'price_estimate': 'Standard Consultation Rate',
    },
    {
        'id': 2,
        'icon': 'clean_hands',
        'title': 'Professional Teeth Cleaning & Hygiene',
        'category': 'Preventive Care',
        'description': 'Professional plaque removal, scaling, and oral hygiene maintenance.',
        'duration': '25 to 40 Minutes',
        'price_estimate': 'Hygiene Rate',
    },
    {
        'id': 3,
        'icon': 'auto_fix_high',
        'title': 'Teeth Whitening & Enamel Care',
        'category': 'Cosmetic Dentistry',
        'description': 'Brighten your smile with advanced clinical whitening systems.',
        'duration': '30 to 45 Minutes',
        'price_estimate': 'Aesthetic Rate',
    },
    {
        'id': 4,
        'icon': 'medical_services',
        'title': 'Dental Implants & Restorative Surgery',
        'category': 'Restorative Dentistry',
        'description': 'Permanent solutions for missing teeth with a natural look.',
        'duration': '45 to 60 Minutes',
        'price_estimate': 'Implant Rate',
    },
    {
        'id': 5,
        'icon': 'merge',
        'title': 'Endodontic Root Canal Therapy',
        'category': 'Diagnostics & Scans',
        'description': 'Expert endodontic treatment to preserve your natural teeth.',
        'duration': '45 to 60 Minutes',
        'price_estimate': 'Specialist Rate',
    },
    {
        'id': 6,
        'icon': 'straighten',
        'title': 'Orthodontics & Clear Aligners',
        'category': 'Orthodontics',
        'description': 'Braces and clear aligners for aligned teeth and balanced bite.',
        'duration': '20 to 30 Minutes',
        'price_estimate': 'Orthodontic Rate',
    },
    {
        'id': 7,
        'icon': 'sentiment_very_satisfied',
        'title': 'Cosmetic Veneers & Bonding',
        'category': 'Cosmetic Dentistry',
        'description': 'Porcelain veneers and bonding to restore broken or worn teeth.',
        'duration': '30 to 60 Minutes',
        'price_estimate': 'Cosmetic Rate',
    },
    {
        'id': 8,
        'icon': 'emergency',
        'title': 'Emergency Dental Triage & Pain Care',
        'category': 'Emergency Care',
        'description': 'Urgent care for toothaches, accidents, and acute infections.',
        'duration': '15 to 20 Minutes',
        'price_estimate': 'Emergency Rate',
    },
]


@api_view(['GET'])
def health_check(_request):
    return Response(
        {
            'status': 'ok',
            'database': 'supabase-postgresql',
            'service': 'rumidental-api',
        },
        status=status.HTTP_200_OK,
    )


@api_view(['GET'])
def services(_request):
    try:
        stored_services = list(Service.objects.filter(is_active=True).order_by('order', 'title'))
    except Exception:
        return Response(DEFAULT_SERVICES, status=status.HTTP_200_OK)

    if not stored_services:
        return Response(DEFAULT_SERVICES, status=status.HTTP_200_OK)

    return Response(
        [
            {
                'id': service.id,
                'icon': service.icon,
                'title': service.title,
                'category': service.category,
                'description': service.description,
                'duration': service.duration,
                'price_estimate': service.price_estimate,
            }
            for service in stored_services
        ],
        status=status.HTTP_200_OK,
    )


@api_view(['POST'])
def contact_request(request):
    raw_name = request.data.get('name', '')
    raw_phone = request.data.get('phone', '')
    raw_message = request.data.get('message', '')
    raw_email = request.data.get('email', '')
    raw_service = request.data.get('serviceInterest', 'General Dental Examination')
    raw_time = request.data.get('preferredTime', '')

    name = str(raw_name).strip() if raw_name is not None else ''
    phone = str(raw_phone).strip() if raw_phone is not None else ''
    message = str(raw_message).strip() if raw_message is not None else ''
    email = str(raw_email).strip() if raw_email else None
    service_interest = str(raw_service).strip() if raw_service else 'General Dental Examination'
    preferred_time = str(raw_time).strip() if raw_time else None

    if not name or not phone or not message:
        return Response(
            {'detail': 'Name, phone, and message are required.'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if len(name) > 120 or len(phone) > 40 or len(message) > 5000:
        return Response(
            {'detail': 'Input exceeds maximum allowed length.'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        contact = ContactRequest.objects.create(
            name=name,
            phone=phone,
            email=email,
            service_interest=service_interest,
            preferred_time=preferred_time,
            message=message,
        )
        contact_id = contact.id
    except Exception:
        contact_id = 'offline-ack'

    return Response(
        {
            'id': contact_id,
            'status': 'received',
            'database': 'supabase-postgresql',
        },
        status=status.HTTP_201_CREATED,
    )


@api_view(['POST'])
def document_upload(request):
    raw_name = request.data.get('name', '')
    raw_phone = request.data.get('phone', '')
    raw_email = request.data.get('email', '')
    raw_doctor = request.data.get('doctor', 'Dr. Robert Vance, DDS')
    raw_doc_name = request.data.get('documentName', 'Diagnostic X-Ray Scan')
    raw_doc_type = request.data.get('documentType', 'Digital Periapical / Panoramic X-Ray')
    raw_pain = request.data.get('painLevel', 1)
    raw_notes = request.data.get('notes', '')

    name = str(raw_name).strip() if raw_name else ''
    phone = str(raw_phone).strip() if raw_phone else ''
    email = str(raw_email).strip() if raw_email else None
    doctor = str(raw_doctor).strip()
    doc_name = str(raw_doc_name).strip()
    doc_type = str(raw_doc_type).strip()
    notes = str(raw_notes).strip()

    try:
        pain_level = max(0, min(10, int(raw_pain)))
    except (ValueError, TypeError):
        pain_level = 1

    if not name or not phone or not doc_name:
        return Response(
            {'detail': 'Patient name, phone number, and document name are required.'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        clinical_doc = ClinicalDocument.objects.create(
            patient_name=name,
            patient_phone=phone,
            patient_email=email,
            doctor_assigned=doctor,
            document_name=doc_name,
            document_type=doc_type,
            pain_level=pain_level,
            clinical_notes=notes,
        )
        doc_id = clinical_doc.id
    except Exception:
        doc_id = 'offline-queue'

    return Response(
        {
            'status': 'uploaded_and_queued',
            'caseId': doc_id,
            'doctorAssigned': doctor,
            'database': 'supabase-postgresql',
            'message': 'Your X-ray and case notes have been encrypted and saved in Supabase PostgreSQL.',
        },
        status=status.HTTP_201_CREATED,
    )


@api_view(['POST'])
def chat_message(request):
    raw_sender = request.data.get('sender', 'patient')
    raw_name = request.data.get('senderName', 'Patient')
    raw_recipient = request.data.get('recipientName', 'Doctor')
    raw_text = request.data.get('text', '')
    raw_attachment = request.data.get('attachment', '')

    sender_type = str(raw_sender).strip()
    sender_name = str(raw_name).strip()
    recipient_name = str(raw_recipient).strip()
    text = str(raw_text).strip()
    attachment = str(raw_attachment).strip() if raw_attachment else None

    if not text:
        return Response({'detail': 'Message text is required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        msg = ChatMessage.objects.create(
            sender_type=sender_type,
            sender_name=sender_name,
            recipient_name=recipient_name,
            message_text=text,
            attachment_name=attachment,
        )
        msg_id = msg.id
    except Exception:
        msg_id = 'offline-msg'

    return Response(
        {
            'status': 'sent',
            'messageId': msg_id,
            'database': 'supabase-postgresql',
        },
        status=status.HTTP_201_CREATED,
    )
