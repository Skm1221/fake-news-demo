from autoslug import AutoSlugField
from django.db import models

# Create your models here.


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class News (BaseModel):
    news_id = models.AutoField(primary_key=True)
    slug = AutoSlugField(populate_from='title', max_length=255, unique=True)
    title = models.CharField(max_length=255)
    body = models.TextField()

    class Meta:
        managed = False
        db_table = 'news'
