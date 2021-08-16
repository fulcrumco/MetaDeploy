# Generated by Django 3.1.12 on 2021-08-04 15:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0113_builtin_jsonfield"),
    ]

    operations = [
        migrations.AddField(
            model_name="plan",
            name="calculated_average_duration",
            field=models.IntegerField(
                blank=True,
                null=True,
                verbose_name="Average duration of a plan (seconds)",
            ),
        ),
    ]
