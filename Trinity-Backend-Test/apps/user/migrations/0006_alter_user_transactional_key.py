# Generated by Django 4.2 on 2025-02-05 18:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0005_alter_user_document_number"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="transactional_key",
            field=models.CharField(blank=True, max_length=128, null=True),
        ),
    ]
