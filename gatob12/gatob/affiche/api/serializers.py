from rest_framework import serializers
from affiche.models import Theater, MainImages, Ticket, Row, Seat, Backstage, BackstageBlock, Conductor, Performers, \
    PerformanceCreatives, Performance, PerformanceFiles


class TheaterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theater
        fields = '__all__'


class MainImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MainImages
        fields = '__all__'


class PerformanceFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerformanceFiles
        fields = '__all__'


class PerformanceSerializer(serializers.ModelSerializer):
    image_carousel = PerformanceFilesSerializer(many=True, read_only=True)

    class Meta:
        model = Performance
        fields = '__all__'


class PerformanceCreativesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerformanceCreatives
        fields = '__all__'


class PerformersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Performers
        fields = '__all__'


class ConductorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conductor
        fields = '__all__'


class BackstageBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = BackstageBlock
        fields = '__all__'


class BackstageSerializer(serializers.ModelSerializer):
    blocks = BackstageBlockSerializer(many=True, read_only=True)

    class Meta:
        model = Backstage
        fields = '__all__'


class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = '__all__'


class RowSerializer(serializers.ModelSerializer):
    seats = SeatSerializer(many=True, read_only=True)

    class Meta:
        model = Row
        fields = '__all__'


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'
