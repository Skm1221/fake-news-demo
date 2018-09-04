# Create your views here.
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views import View

from news import models
from news.mappers import NewsMapper


class NewsListView(View):

    def get(self, request, *args, **kwargs):
        return JsonResponse(
            data={
                'data': [
                    NewsMapper.to_json(news)
                    for news in models.News.objects.all()
                ]
            }
        )


class NewsInspectionView(View):

    def get(self, request, *args, **kwargs):
        news = get_object_or_404(models.News, slug=kwargs['slug'])
        return JsonResponse(
            data={
                'data': {
                    'news': NewsMapper.to_json(news),
                    'type': 'unrelated'
                }
            }
        )
