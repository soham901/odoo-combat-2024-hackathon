from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from user.models import User


class UserAPITest(APITestCase):
    def test_list_create_users(self):
        url = reverse("user-list-create")
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

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

    def test_me(self):
        url = reverse("user-profile")
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
