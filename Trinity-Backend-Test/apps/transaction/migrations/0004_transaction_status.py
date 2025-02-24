# Generated by Django 4.2 on 2025-02-05 16:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("transaction", "0003_transaction_transaction_type"),
    ]

    operations = [
        migrations.AddField(
            model_name="transaction",
            name="status",
            field=models.CharField(
                choices=[("p", "process"), ("a", "approved"), ("r", "reject")],
                default="p",
                max_length=1,
            ),
        ),
    ]
