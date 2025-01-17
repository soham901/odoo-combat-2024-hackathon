# Generated by Django 5.0.2 on 2024-06-29 08:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("resources", "0004_remove_resourcereservation_user_and_more"),
        ("workspaces", "0004_workspace_owner"),
    ]

    operations = [
        migrations.AddField(
            model_name="resource",
            name="workspace",
            field=models.OneToOneField(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="workspaces.workspace",
            ),
        ),
    ]
