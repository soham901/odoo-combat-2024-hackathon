from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from user.models import User


class AuthAPITest(APITestCase):
    def test_register_and_login_user(self):
        # Register
        url = reverse("user-list-create")
        data = {
            "username": "champak",
            "email": "champak@example.com",
            "password": "nahanejanahane",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, "champak")

        # Login
        url = reverse("user-login")
        data = {
            "email": "champak@example.com",
            "password": "nahanejanahane",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
