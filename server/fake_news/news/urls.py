from django.urls import path

from news import views

urlpatterns = [
    path('news/inspection', views.NewNewsInspectionView.as_view(), name='news-list-view'),
    path('news/<int:news_id>/inspection', views.NewsInspectionView.as_view(), name='news-inspection-view'),
]
