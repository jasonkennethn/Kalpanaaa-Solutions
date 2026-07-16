from rest_framework import serializers
from .models import Project, Subscriber, ContactMessage
import json

class ProjectSerializer(serializers.ModelSerializer):
    # Field to handle JSON parsing of preview_data in API requests/responses
    preview_data_parsed = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['id', 'title', 'prompt', 'category', 'preview_data', 'preview_data_parsed', 'code_html', 'code_css', 'created_at']
        read_only_fields = ['id', 'created_at', 'code_html', 'code_css', 'preview_data']

    def get_preview_data_parsed(self, obj):
        try:
            return json.loads(obj.preview_data)
        except Exception:
            return {}

class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = ['id', 'email', 'created_at']
        read_only_fields = ['id', 'created_at']

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'company', 'service', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']
