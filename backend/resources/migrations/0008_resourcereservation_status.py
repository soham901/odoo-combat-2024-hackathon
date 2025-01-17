# Generated by Django 5.0.2 on 2024-06-29 08:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("resources", "0007_resourcereservation_quantity"),
    ]

    operations = [
        migrations.AddField(
            model_name="resourcereservation",
            name="status",
            field=models.CharField(
                choices=[
                    ("Pending", "Pending"),
                    ("Confirmed", "Confirmed"),
                    ("Cancelled", "Cancelled"),
                ],
                default="Pending",
                max_length=20,
            ),
        ),
    ]
