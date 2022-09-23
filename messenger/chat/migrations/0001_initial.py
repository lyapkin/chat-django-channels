# Generated by Django 4.0.6 on 2022-08-10 08:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Connection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_in_chat_list', models.BooleanField(default=True, editable=False)),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=4096)),
                ('sent_time', models.DateTimeField(auto_now_add=True)),
                ('previous_message', models.OneToOneField(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='chat.message')),
            ],
        ),
    ]
