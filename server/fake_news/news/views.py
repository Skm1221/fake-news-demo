# Create your views here.
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views import View

from news import models
from news.mappers import NewsMapper


class NewNewsInspectionView(View):

    def post(self, request, *args, **kwargs):
        news = get_object_or_404(models.News, pk=1)
        return JsonResponse(
            data={
                'data': {
                    'news': NewsMapper.to_json(news),
                    'unrelated_ratio': 0.1,
                    'agree_ratio': 0.1,
                    'disagree_ratio': 0.1,
                    'discuss_ratio': 0.1,
                    'inspection': 'unrelated'
                }
            }
        )


class NewsInspectionView(View):

    def get(self, request, *args, **kwargs):
        news = get_object_or_404(models.News, pk=kwargs['news_id'])
        return JsonResponse(
            data={
                'data': {
                    'news': NewsMapper.to_json(news),
                    'unrelated_ratio': 0.1,
                    'agree_ratio': 0.1,
                    'disagree_ratio': 0.1,
                    'discuss_ratio': 0.1,
                    'inspection': 'unrelated'
                }
            }
        )
