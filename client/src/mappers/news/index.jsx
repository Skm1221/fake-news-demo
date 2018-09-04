import { News } from "../../models/news/index";


export class NewsMapper {

  fromJson(json) {
    return new News(
      json.id,
      json.name,
      json.url,
    );
  }

}
