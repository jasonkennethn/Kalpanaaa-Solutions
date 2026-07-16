from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Project, Subscriber, ContactMessage
import json

class CoreAPITests(APITestCase):

    def test_subscriber_creation(self):
        url = reverse('subscribe')
        data = {'email': 'test@example.com'}
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Subscriber.objects.count(), 1)
        self.assertEqual(Subscriber.objects.get().email, 'test@example.com')

    def test_duplicate_subscriber_fails(self):
        url = reverse('subscribe')
        data = {'email': 'duplicate@example.com'}
        self.client.post(url, data, format='json')
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Subscriber.objects.count(), 1)

    def test_contact_message_creation(self):
        url = reverse('contact')
        data = {
            'name': 'John Doe',
            'email': 'john@example.com',
            'message': 'Testing Django connection.'
        }
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactMessage.objects.count(), 1)
        msg = ContactMessage.objects.get()
        self.assertEqual(msg.name, 'John Doe')
        self.assertEqual(msg.message, 'Testing Django connection.')

    def test_project_generation_endpoint(self):
        url = reverse('project-list')
        data = {
            'prompt': 'Create a beautiful crypto portfolio dashboard',
            'category': 'Dashboard',
            'title': 'Crypto Ledger'
        }
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Project.objects.count(), 1)
        
        proj = Project.objects.get()
        self.assertEqual(proj.title, 'Crypto Ledger')
        self.assertEqual(proj.category, 'Dashboard')
        self.assertIn('Total Balance', proj.preview_data)
        self.assertIn('crypto-dashboard', proj.code_html)

    def test_project_list_endpoint(self):
        Project.objects.create(
            title="Test Proj",
            prompt="Simple testing",
            category="Landing Page",
            preview_data="{}",
            code_html="<div>Test</div>",
            code_css=".test {}"
        )
        url = reverse('project-list')
        response = self.client.get(url, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], "Test Proj")
