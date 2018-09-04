

export class NewsInspection {
    constructor(
        news,
        unrelatedRatio,
        agreeRatio,
        disagreeRatio,
        discussRatio,
        inspection
    ) {
        this.news = news;
        this.unrelatedRatio = unrelatedRatio;
        this.agreeRatio = agreeRatio;
        this.disagreeRatio = disagreeRatio;
        this.discussRatio = discussRatio;
        this.inspection = inspection;
    }
}
