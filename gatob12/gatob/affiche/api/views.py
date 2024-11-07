from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.utils import timezone
from datetime import timedelta
from django.db.models import Q
from .serializers import (
    TheaterSerializer, MainImagesSerializer, PerformanceFilesSerializer, PerformanceSerializer,
    PerformanceCreativesSerializer, PerformersSerializer, ConductorSerializer, BackstageBlockSerializer,
    BackstageSerializer, SeatSerializer, RowSerializer, TicketSerializer
)
from ..models import (
    Theater, MainImages, PerformanceFiles, Performance, PerformanceCreatives, Performers, Conductor,
    BackstageBlock, Backstage, Seat, Row, Ticket
)


class TheaterListAPIView(generics.ListAPIView):
    queryset = Theater.objects.all()
    serializer_class = TheaterSerializer


class TheaterDetailAPIView(generics.RetrieveAPIView):
    queryset = Theater.objects.all()
    serializer_class = TheaterSerializer


class MainImagesListAPIView(generics.ListAPIView):
    queryset = MainImages.objects.all()
    serializer_class = MainImagesSerializer


class MainImagesDetailAPIView(generics.RetrieveAPIView):
    queryset = MainImages.objects.all()
    serializer_class = MainImagesSerializer


class PerformanceFilesListAPIView(generics.ListAPIView):
    queryset = PerformanceFiles.objects.all()
    serializer_class = PerformanceFilesSerializer


class PerformanceFilesDetailAPIView(generics.RetrieveAPIView):
    queryset = PerformanceFiles.objects.all()
    serializer_class = PerformanceFilesSerializer


class PerformanceListAPIView(generics.ListAPIView):
    queryset = Performance.objects.all()
    serializer_class = PerformanceSerializer

    def get_queryset(self):
        now = timezone.now()
        return Performance.objects.filter(
            (Q(datetime1__gte=now) & Q(datetime1__lte=now + timedelta(days=31))) |
            (Q(datetime2__gte=now) & Q(datetime2__lte=now + timedelta(days=31))),
            hidden=False
        ).order_by('datetime1')


class PerformanceDetailAPIView(generics.RetrieveAPIView):
    queryset = Performance.objects.all()
    serializer_class = PerformanceSerializer


class PerformanceCreativesListAPIView(generics.ListAPIView):
    queryset = PerformanceCreatives.objects.all()
    serializer_class = PerformanceCreativesSerializer


class PerformanceCreativesDetailAPIView(generics.RetrieveAPIView):
    queryset = PerformanceCreatives.objects.all()
    serializer_class = PerformanceCreativesSerializer


class PerformersListAPIView(generics.ListAPIView):
    queryset = Performers.objects.all()
    serializer_class = PerformersSerializer


class PerformersDetailAPIView(generics.RetrieveAPIView):
    queryset = Performers.objects.all()
    serializer_class = PerformersSerializer


class ConductorListAPIView(generics.ListAPIView):
    queryset = Conductor.objects.all()
    serializer_class = ConductorSerializer


class ConductorDetailAPIView(generics.RetrieveAPIView):
    queryset = Conductor.objects.all()
    serializer_class = ConductorSerializer


class BackstageBlockListAPIView(generics.ListAPIView):
    queryset = BackstageBlock.objects.all()
    serializer_class = BackstageBlockSerializer


class BackstageBlockDetailAPIView(generics.RetrieveAPIView):
    queryset = BackstageBlock.objects.all()
    serializer_class = BackstageBlockSerializer


class BackstageListAPIView(generics.ListAPIView):
    queryset = Backstage.objects.all()
    serializer_class = BackstageSerializer


class BackstageDetailAPIView(generics.RetrieveAPIView):
    queryset = Backstage.objects.all()
    serializer_class = BackstageSerializer


class SeatListAPIView(generics.ListAPIView):
    queryset = Seat.objects.all()
    serializer_class = SeatSerializer


class SeatDetailAPIView(generics.RetrieveAPIView):
    queryset = Seat.objects.all()
    serializer_class = SeatSerializer


class RowListAPIView(generics.ListAPIView):
    queryset = Row.objects.all()
    serializer_class = RowSerializer


class RowDetailAPIView(generics.RetrieveAPIView):
    queryset = Row.objects.all()
    serializer_class = RowSerializer


class TicketListAPIView(generics.ListAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer


class TicketDetailAPIView(generics.RetrieveAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer


class BuyTicketAPIView(APIView):
    def post(self, request, *args, **kwargs):
        seat_id = request.data.get('seat_id')
        seat = get_object_or_404(Seat, id=seat_id)
        seat.is_reserved = True
        seat.save()

        ticket = Ticket.objects.create(seat=seat)

        response_data = {
            'row': seat.row.number,
            'seat_number': seat.number,
            'ticket_price': 10000  # Цена билета
        }
        return Response(response_data)