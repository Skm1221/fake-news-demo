from django.urls import path

from news import views

urlpatterns = [
    path(
        'news/inspection/explanation',
        views.NewsInputInspectionExplanationView.as_view(),
         name='news-input-inspection-explain-view'),
    path(
        'news/<int:news_id>/inspection/explanation',
        views.NewsInspectionExplanationView.as_view(),
         name='news-inspection-explain-view'),
    path(
        'news/inspection',
        views.NewsInputInspectionView.as_view(),
        name='news-input-inspection-view'),
    path(
        'news/<int:news_id>/inspection',
        views.NewsInspectionView.as_view(),
        name='news-inspection-view'),


]
