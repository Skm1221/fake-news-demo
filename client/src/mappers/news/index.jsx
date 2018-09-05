import { News } from "../../models/news/index";


export class NewsMapper {

  fromJson(json) {
    console.log(json);
    return new News(
      json.id,
      json.headline,
      json.body,
    );
  }

  toJson(news) {
    return {
      headline: news.head,
      body: news.body
    }
  }

}

