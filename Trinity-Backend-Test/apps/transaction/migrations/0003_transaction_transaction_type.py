# Generated by Django 4.2 on 2025-02-05 16:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("transaction", "0002_alter_transaction_description"),
    ]

    operations = [
        migrations.AddField(
            model_name="transaction",
            name="transaction_type",
            field=models.CharField(
                blank=True,
                choices=[
                    ("deposit", "DEPOSIT"),
                    ("debit", "DEBIT"),
                    ("transfer", "TRANSFER"),
                ],
                max_length=10,
                null=True,
            ),
        ),
    ]
