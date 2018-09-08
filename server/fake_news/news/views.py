import json

from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views import View

import news.ml_model as ml
from news import models
from news.mappers import NewsMapper


class NewsInputInspectionView(View):

    def post(self, request, *args, **kwargs):
        data = json.loads(request.body.decode("utf-8"))
        data_input = ml.combine_sentence(data['headline'], data['body'])
        prob = ml.classifier_fn([data_input])[0]
        index = 0
        max_num = prob[0]
        for i, num in enumerate(prob):
            if num >= max_num:
                max_num = num
                index = i
        return JsonResponse(
            data={
                'data': {
                    'news': {
                        "headline": data['headline'],
                        "body": data['body']
                    },
                    'unrelated_ratio': prob[3],
                    'agree_ratio': prob[0],
                    'disagree_ratio': prob[1],
                    'discuss_ratio': prob[2],
                    'inspection': ml.CLASS_NAMES[index]
                }
            }
        )


class NewsInspectionView(View):

    def get(self, request, *args, **kwargs):
        news = get_object_or_404(models.News, pk=kwargs['news_id'])
        data_input = ml.combine_sentence(news.headline, news.body)
        prob = ml.classifier_fn([data_input])[0]
        index = 0
        max_num = prob[0]
        for i, num in enumerate(prob):
            if num >= max_num:
                max_num = num
                index = i
        return JsonResponse(
            data={
                'data': {
                    'news': NewsMapper.to_json(news),
                    'unrelated_ratio': prob[3],
                    'agree_ratio': prob[0],
                    'disagree_ratio': prob[1],
                    'discuss_ratio': prob[2],
                    'inspection': ml.CLASS_NAMES[index]
                }
            }
        )


class NewsInputInspectionExplanationView(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body.decode("utf-8"))
        exp = ml.explain_instance(data['headline'], data['body'])
        exp.save_to_file('./explanations/oi.html')
        return JsonResponse(
            data={
                'data': {
                    'url': "/explanations/oi.html"
                }
            }
        )


class NewsInspectionExplanationView(View):

    def get(self, request, *args, **kwargs):
        news = get_object_or_404(models.News, pk=kwargs['news_id'])
        exp = ml.explain_instance(news.headline, news.body)
        exp.save_to_file('./explanations/oi.html')
        return JsonResponse(
            data={
                'data': {
                    'url': '/explanations/oi.html'
                }
            }
        )
