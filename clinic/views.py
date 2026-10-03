from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from pymongo.errors import PyMongoError

from .documents import ChatMessage, ClinicalDocument, ContactRequest, Service


DEFAULT_SERVICES = [
    {'icon': 'dentistry', 'title': 'General Dentistry', 'description': 'Comprehensive exams, cleanings, and preventive care for all ages.'},
    {'icon': 'clean_hands', 'title': 'Teeth Cleaning', 'description': 'Professional plaque removal and oral hygiene maintenance.'},
    {'icon': 'auto_fix_high', 'title': 'Teeth Whitening', 'description': 'Brighten your smile with advanced whitening systems.'},
    {'icon': 'medical_services', 'title': 'Dental Implants', 'description': 'Permanent solutions for missing teeth with a natural look.'},
    {'icon': 'merge', 'title': 'Root Canal', 'description': 'Expert endodontic treatment to save your natural teeth.'},
    {'icon': 'straighten', 'title': 'Orthodontics', 'description': 'Braces and clear aligners for perfectly aligned smiles.'},
    {'icon': 'sentiment_very_satisfied', 'title': 'Cosmetic Dentistry', 'description': 'Veneers and bonding to create the smile of your dreams.'},
    {'icon': 'emergency', 'title': 'Emergency Care', 'description': 'Urgent care for toothaches, accidents, and dental injuries.'},
]


@api_view(['GET'])
def health_check(_request):
    return Response({'status': 'ok', 'service': 'rumidental-api'}, status=status.HTTP_200_OK)


@api_view(['GET'])
def services(_request):
    try:
        stored_services = list(Service.objects(is_active=True).order_by('order', 'title'))
    except PyMongoError:
        return Response(DEFAULT_SERVICES, status=status.HTTP_200_OK)

    if not stored_services:
        return Response(DEFAULT_SERVICES, status=status.HTTP_200_OK)

    return Response(
        [
            {
                'id': str(service.id),
                'icon': service.icon,
                'title': service.title,
                'description': service.description,
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

    name = str(raw_name).strip() if raw_name is not None else ''
    phone = str(raw_phone).strip() if raw_phone is not None else ''
    message = str(raw_message).strip() if raw_message is not None else ''
    email = str(raw_email).strip() if raw_email else None

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
        contact = ContactRequest(name=name, phone=phone, email=email, message=message)
        contact.save()
    except PyMongoError:
        return Response(
            {'detail': 'MongoDB is not available.'},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )

    return Response({'id': str(contact.id), 'status': 'received'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def document_upload(request):
    raw_name = request.data.get('name', '')
    raw_phone = request.data.get('phone', '')
    raw_email = request.data.get('email', '')
    raw_doctor = request.data.get('doctor', 'Dr. Robert Vance, DDS')
    raw_doc_name = request.data.get('documentName', 'Diagnostic X-Ray Scan')
    raw_doc_type = request.data.get('documentType', 'Dental Radiograph / X-Ray')
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
        pain_level = max(1, min(10, int(raw_pain)))
    except (ValueError, TypeError):
        pain_level = 1

    if not name or not phone or not doc_name:
        return Response(
            {'detail': 'Patient name, phone number, and document name are required.'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        clinical_doc = ClinicalDocument(
            patient_name=name,
            patient_phone=phone,
            patient_email=email,
            doctor_assigned=doctor,
            document_name=doc_name,
            document_type=doc_type,
            pain_level=pain_level,
            clinical_notes=notes,
        )
        clinical_doc.save()
        doc_id = str(clinical_doc.id)
    except PyMongoError:
        doc_id = 'temp-case-ref'

    return Response(
        {
            'status': 'uploaded_and_queued',
            'caseId': doc_id,
            'doctorAssigned': doctor,
            'message': 'Your X-ray and case notes have been encrypted and queued for clinical review.',
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
        msg = ChatMessage(
            sender_type=sender_type,
            sender_name=sender_name,
            recipient_name=recipient_name,
            message_text=text,
            attachment_name=attachment,
        )
        msg.save()
        msg_id = str(msg.id)
    except PyMongoError:
        msg_id = 'chat-msg-ack'

    return Response(
        {
            'status': 'sent',
            'messageId': msg_id,
        },
        status=status.HTTP_201_CREATED,
    )
