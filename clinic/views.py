import uuid
from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import BlogPost, ChatMessage, ClinicalDocument, ContactRequest, Service
from .serializers import (
    BlogPostSerializer,
    ChatMessageSerializer,
    ClinicalDocumentSerializer,
    ContactRequestSerializer,
    ServiceSerializer,
)

DEFAULT_SERVICES = [
    {
        'title': 'Digital X-Ray & Diagnostics',
        'category': 'Diagnostic Radiology',
        'icon': 'radiology',
        'image_url': 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
        'description': 'High-resolution digital radiography with 90% reduced radiation exposure, offering instant chairside diagnosis.',
        'price_range': 'Rs. 500 - Rs. 1,500',
        'duration': '15 mins',
        'order': 1,
        'is_active': True,
    },
    {
        'title': 'CBCT 3D Scan Analysis',
        'category': 'Advanced Imaging',
        'icon': 'view_in_ar',
        'image_url': 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
        'description': 'Sub-millimeter volumetric cone beam 3D computed tomography for precision dental implant planning and nerve tracing.',
        'price_range': 'Rs. 2,500 - Rs. 5,000',
        'duration': '25 mins',
        'order': 2,
        'is_active': True,
    },
    {
        'title': 'General Dentistry & Exams',
        'category': 'Preventive Care',
        'icon': 'dentistry',
        'image_url': 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
        'description': 'Comprehensive oral health assessments, cavity detection, periodontal screening, and customized preventative hygiene plans.',
        'price_range': 'Rs. 500 - Rs. 1,000',
        'duration': '30-45 mins',
        'order': 3,
        'is_active': True,
    },
    {
        'title': 'Ultrasonic Teeth Cleaning & Scaling',
        'category': 'Preventive Care',
        'icon': 'clean_hands',
        'image_url': 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
        'description': 'Advanced piezo ultrasonic calculus removal, subgingival biofilm irrigation, and fluoride polishing to protect gums.',
        'price_range': 'Rs. 1,200 - Rs. 2,500',
        'duration': '40 mins',
        'order': 4,
        'is_active': True,
    },
    {
        'title': 'Root Canal Therapy (Endodontics)',
        'category': 'Restorative',
        'icon': 'merge',
        'image_url': 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
        'description': 'Rotary endodontic therapy with electronic apex locator precision to eliminate infected dental pulp while saving your natural tooth.',
        'price_range': 'Rs. 4,500 - Rs. 9,000',
        'duration': '45-60 mins',
        'order': 5,
        'is_active': True,
    },
    {
        'title': 'Dental Implants & Prosthetics',
        'category': 'Surgical Restoration',
        'icon': 'medical_services',
        'image_url': 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
        'description': 'Titanium and zirconia biocompatible root replacements with computer-guided surgical stent placement for permanent restorations.',
        'price_range': 'Rs. 25,000 - Rs. 55,000',
        'duration': '60 mins',
        'order': 6,
        'is_active': True,
    },
    {
        'title': 'Orthodontics & Clear Aligners',
        'category': 'Orthodontics',
        'icon': 'straighten',
        'image_url': 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
        'description': 'Digital smile simulation, discreet ceramic brackets, and custom transparent aligner treatment series for malocclusion correction.',
        'price_range': 'Rs. 35,000 - Rs. 90,000',
        'duration': '30 mins / visit',
        'order': 7,
        'is_active': True,
    },
    {
        'title': 'Emergency Dental Triage',
        'category': 'Emergency Care',
        'icon': 'emergency',
        'image_url': 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
        'description': 'Same-day emergency treatment for acute pulpal pain, tooth fractures, dental trauma, avulsed teeth, and acute abscesses.',
        'price_range': 'Rs. 1,000 - Rs. 3,500',
        'duration': 'Immediate triage',
        'order': 8,
        'is_active': True,
    },
]


@api_view(['GET'])
def health_check(_request):
    return Response({
        'status': 'ok',
        'service': 'rumidental-clinical-api',
        'database': 'postgresql-supabase',
        'version': '2.0.0',
    })


@api_view(['GET', 'POST'])
def services_view(request):
    if request.method == 'GET':
        services_qs = Service.objects.filter(is_active=True)
        if not services_qs.exists():
            # Seed default services into DB automatically
            for s_data in DEFAULT_SERVICES:
                Service.objects.get_or_create(
                    title=s_data['title'],
                    defaults=s_data
                )
            services_qs = Service.objects.filter(is_active=True)

        serializer = ServiceSerializer(services_qs, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def articles_view(request):
    if request.method == 'GET':
        posts = BlogPost.objects.filter(is_published=True)
        serializer = BlogPostSerializer(posts, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = BlogPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def contact_request_view(request):
    serializer = ContactRequestSerializer(data=request.data)
    if serializer.is_valid():
        contact = serializer.save()
        return Response({
            'id': contact.id,
            'status': 'received',
            'message': 'Your appointment request has been recorded. Our clinical receptionist will contact you shortly.',
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def clinical_documents_view(request):
    if request.method == 'GET':
        phone = request.query_params.get('phone', '').strip()
        if phone:
            docs = ClinicalDocument.objects.filter(patient_phone=phone)
        else:
            docs = ClinicalDocument.objects.all()[:50]
        serializer = ClinicalDocumentSerializer(docs, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ClinicalDocumentSerializer(data=request.data)
        if serializer.is_valid():
            doc = serializer.save()
            return Response({
                'id': doc.id,
                'status': 'uploaded',
                'file_name': doc.file_name,
                'document_type': doc.document_type,
                'pain_level': doc.pain_level,
                'assigned_doctor': doc.assigned_doctor,
                'message': 'Clinical diagnostic document received successfully. Transmitted to doctor review queue.',
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def chat_messages_view(request):
    session_id = request.query_params.get('session_id') or request.data.get('session_id')
    if not session_id:
        session_id = str(uuid.uuid4())[:8]

    if request.method == 'GET':
        messages = ChatMessage.objects.filter(session_id=session_id).order_by('created_at')
        serializer = ChatMessageSerializer(messages, many=True)
        return Response({
            'session_id': session_id,
            'messages': serializer.data,
        })

    elif request.method == 'POST':
        data = request.data.copy()
        data['session_id'] = session_id
        serializer = ChatMessageSerializer(data=data)
        if serializer.is_valid():
            user_msg = serializer.save()

            # Automatic doctor triage reply simulation if this is a patient message
            doctor_reply = None
            if user_msg.sender_type == 'patient':
                reply_text = (
                    "Thank you for sharing your clinical details. I have received your information "
                    "and any attached diagnostic imaging. I am reviewing your case now. "
                    "If you are experiencing severe throbbing pain or swelling, please indicate emergency triage."
                )
                doctor_reply = ChatMessage.objects.create(
                    session_id=session_id,
                    sender_type='doctor',
                    sender_name='Dr. Dipesh Mahato',
                    doctor_id=user_msg.doctor_id or 'dr-dipesh',
                    message=reply_text,
                )

            all_msgs = ChatMessage.objects.filter(session_id=session_id).order_by('created_at')
            return Response({
                'session_id': session_id,
                'messages': ChatMessageSerializer(all_msgs, many=True).data,
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
