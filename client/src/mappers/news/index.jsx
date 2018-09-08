import { News } from "../../models/news/index";


export class NewsMapper {

  fromJson(json) {
    console.log(json);
    return new News(
      json.id,
      json.headline,
      json.body,
      json.stance
    );
  }

  toJson(news) {
    return {
      headline: news.headline,
      body: news.body,
      stance: news.stance
    }
  }

}

