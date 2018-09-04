import {NewsInspection} from "../../models/news-inspection/index";
import {NewsMapper} from "../news/index";


export class NewsInspectionMapper {

    fromJson(json) {
        return new NewsInspection(
            new NewsMapper().fromJson(json.news),
            json.unrelated_ratio,
            json.agree_ratio,
            json.disagree_ratio,
            json.discuss_ratio,
            json.inspection
        );
    }

}
