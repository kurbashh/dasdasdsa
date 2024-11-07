import json

from dal import autocomplete
from django.http import JsonResponse, HttpResponse
from django.utils import timezone
from datetime import timedelta
from django.db.models import Q
from django.shortcuts import get_object_or_404, render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .api.serializers import MainImagesSerializer, PerformanceSerializer
from .models import MainImages, Performance, Creatives, Performers, Backstage, Ticket, Seat, Row, \
    PerformancePerformers, PerformanceConductor, PerformanceCreatives, Conductor
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


@api_view(['GET'])
def index_page_view(request):
    if request.method == 'GET':
        images = MainImages.objects.all()
        now = timezone.now()
        performances = Performance.objects.filter(
            (Q(datetime1__gte=now) & Q(datetime1__lte=now + timedelta(days=31))) |
            (Q(datetime2__gte=now) & Q(datetime2__lte=now + timedelta(days=31))),
            hidden=False
        ).order_by('datetime1')

        images_serializer = MainImagesSerializer(images, many=True)
        performances_serializer = PerformanceSerializer(performances, many=True)

        data = {
            'images': images_serializer.data,
            'performances': performances_serializer.data,
        }
        return Response(data)


def performance_detail_page_view(request, pk):
    if request.method == 'GET':
        performance = get_object_or_404(Performance, id=pk)
        performance_creatives = list(PerformanceCreatives.objects.filter(performance=performance).values())
        performance_performers = list(PerformancePerformers.objects.filter(performance=performance).values())
        performance_conductor = list(PerformanceConductor.objects.filter(performance=performance).values())

        short_roles = [performer for performer in performance_performers if performer['short_roles']]
        long_roles = [performer for performer in performance_performers if performer['long_roles']]

        data = {
            'performance': {
                'id': performance.id,
                'title': performance.title,
                # Добавьте нужные поля по аналогии
            },
            'performance_creatives': performance_creatives,
            'performance_performers': performance_performers,
            'short_roles': short_roles,
            'long_roles': long_roles,
            'performance_conductor': performance_conductor,
        }

        return JsonResponse(data)


def backstage_page_view(request):
    if request.method == 'GET':
        backstages_list = Backstage.objects.all()
        paginator = Paginator(backstages_list, 24)
        page_number = request.GET.get('page')
        try:
            backstages = paginator.page(page_number)
        except PageNotAnInteger:
            backstages = paginator.page(1)
        except EmptyPage:
            backstages = paginator.page(paginator.num_pages)

        data = {
            'backstages': list(backstages.object_list.values()),  # Преобразуем QuerySet в список словарей
            'page_range': list(backstages.paginator.page_range),  # Преобразуем диапазон страниц в список
        }

        return JsonResponse(data)


def backstage_detail_page_view(request, backstage_pk):
    if request.method == 'GET':
        backstage = get_object_or_404(Backstage, id=backstage_pk)

        data = {
            'backstage': {
                'id': backstage.id,
                'title': backstage.title,
                # Добавьте нужные поля по аналогии
            }
        }

        return JsonResponse(data)


def repertory_page_view(request):
    if request.method == 'GET':
        performances = Performance.objects.all()
        performance_type = request.GET.get('type')
        if performance_type:
            performances = performances.filter(type=performance_type)

        data = {
            'performances': list(performances.values()),  # Преобразуем QuerySet в список словарей
        }

        return JsonResponse(data)


def repertory_detail_page_view(request, performance_pk):
    performance = get_object_or_404(Performance, id=performance_pk)
    image_urls = performance.image_carousel.all()
    performers = PerformancePerformers.objects.filter(performance=performance)
    creatives = PerformanceCreatives.objects.filter(performance=performance)

    data = {
        'performance': {
            'id': performance.id,
            'title': performance.title,
            # Добавьте нужные поля по аналогии
        },
        'image_urls': list(image_urls.values()),  # Преобразуем QuerySet в список словарей
        'performers': list(performers.values()),  # Преобразуем QuerySet в список словарей
        'creatives': list(creatives.values()),  # Преобразуем QuerySet в список словарей
    }

    return JsonResponse(data)


def hall_view(request, pk):
    rows = Row.objects.all()
    performance = get_object_or_404(Performance, id=pk)

    context = {
        'rows': list(rows.values()),  # Преобразуем QuerySet в список словарей
        'performance': {
            'id': performance.id,
            'title': performance.title,
            # Добавьте нужные поля по аналогии
        },
    }

    return JsonResponse(context)


def buy_ticket(request):
    if request.method == 'POST':
        seat_id = request.POST.get('seat_id')

        seat = Seat.objects.get(id=seat_id)
        seat.is_reserved = True
        seat.save()

        ticket = Ticket.objects.create(seat=seat)

        response_data = {
            'row': seat.row.number,
            'seat_number': seat.number,
            'ticket_price': 10000  # Цена билета
        }
        return JsonResponse(response_data)

    return HttpResponse(status=405)


class CreativeAutocomplete(autocomplete.Select2QuerySetView):
    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return Creatives.objects.none()

        qs = Creatives.objects.all()

        if self.q:
            qs = qs.filter(name__icontains=self.q)

        return qs


class PerformerAutocomplete(autocomplete.Select2QuerySetView):
    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return Performers.objects.none()

        qs = Performers.objects.all()

        if self.q:
            qs = qs.filter(name__icontains=self.q)

        return qs


class ConductorAutocomplete(autocomplete.Select2QuerySetView):
    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return Conductor.objects.none()

        qs = Conductor.objects.all()

        if self.q:
            qs = qs.filter(name__icontains=self.q)

        return qs
