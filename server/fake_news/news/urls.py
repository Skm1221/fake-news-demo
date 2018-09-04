
from django.conf.urls import url

from news import views

urlpatterns = [
    url(r'^news', views.NewsListView.as_view(), name='news-list-view'),
    url(r'^news/<slug:slug)/inspect', views.NewsInspectionView.as_view()),
]
