# Generated by Django 4.2.13 on 2024-06-02 11:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('affiche', '0022_rename_content_backstage_block1_content_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='performance',
            name='type',
            field=models.CharField(choices=[('Балет', 'Балет'), ('Опера', 'Опера')], default='Балет', max_length=10),
        ),
    ]