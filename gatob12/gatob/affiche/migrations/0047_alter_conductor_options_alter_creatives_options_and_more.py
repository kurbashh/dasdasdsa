# Generated by Django 4.2.13 on 2024-06-17 11:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('affiche', '0046_rename_name_performanceperformers_performer_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='conductor',
            options={'verbose_name_plural': 'Дирижеры'},
        ),
        migrations.AlterModelOptions(
            name='creatives',
            options={'verbose_name_plural': 'Постановщики'},
        ),
        migrations.AlterModelOptions(
            name='mainimages',
            options={'verbose_name_plural': 'Изображения для карусели'},
        ),
        migrations.AlterModelOptions(
            name='performance',
            options={'verbose_name_plural': 'Представления'},
        ),
        migrations.AlterModelOptions(
            name='performanceconductor',
            options={'verbose_name_plural': 'Дирижер представления'},
        ),
        migrations.AlterModelOptions(
            name='performancecreatives',
            options={'verbose_name_plural': 'Постановщики представления'},
        ),
        migrations.AlterModelOptions(
            name='performancefiles',
            options={'verbose_name_plural': 'Галерея представлений'},
        ),
        migrations.AlterModelOptions(
            name='performanceperformers',
            options={'verbose_name_plural': 'Исполнители представления'},
        ),
        migrations.AlterModelOptions(
            name='performers',
            options={'verbose_name_plural': 'Исполнители'},
        ),
        migrations.RemoveField(
            model_name='performanceperformers',
            name='performer',
        ),
        migrations.AddField(
            model_name='performanceperformers',
            name='performer',
            field=models.ManyToManyField(to='affiche.performers'),
        ),
    ]