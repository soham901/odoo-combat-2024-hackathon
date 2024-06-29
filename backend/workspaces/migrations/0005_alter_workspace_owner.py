# Generated by Django 5.0.6 on 2024-06-29 10:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("owner", "0002_owner_organization_alter_owner_location"),
        ("workspaces", "0004_workspace_owner"),
    ]

    operations = [
        migrations.AlterField(
            model_name="workspace",
            name="owner",
            field=models.ForeignKey(
                null=True, on_delete=django.db.models.deletion.CASCADE, to="owner.owner"
            ),
        ),
    ]
