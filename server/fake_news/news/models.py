from django.db import models

# Create your models here.


class News (models.Model):
    news_id = models.AutoField(primary_key=True)
    headline = models.CharField(max_length=255)
    body = models.TextField()
    stance = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'news'
