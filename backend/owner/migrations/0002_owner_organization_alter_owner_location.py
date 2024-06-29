# Generated by Django 5.0.6 on 2024-06-29 08:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("owner", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="owner",
            name="organization",
            field=models.CharField(blank=True, max_length=64),
        ),
        migrations.AlterField(
            model_name="owner",
            name="location",
            field=models.CharField(blank=True, max_length=32),
        ),
    ]