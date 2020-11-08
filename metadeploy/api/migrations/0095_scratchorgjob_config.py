# Generated by Django 2.2.15 on 2020-09-08 17:45

import django.contrib.postgres.fields.jsonb
from django.core.serializers.json import DjangoJSONEncoder
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0094_merge_20200904_1913"),
    ]

    operations = [
        migrations.AddField(
            model_name="scratchorgjob",
            name="config",
            field=django.contrib.postgres.fields.jsonb.JSONField(
                blank=True, null=True, encoder=DjangoJSONEncoder
            ),
        ),
    ]
