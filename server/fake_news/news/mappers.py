from typing import Dict

from news import models


class NewsMapper:

    @classmethod
    def to_json(cls, news: models.News) -> Dict[str, any]:
        return {
            'id': news.news_id,
            'headline': news.headline,
            'body': news.body,
            'stance': news.stance
        }
