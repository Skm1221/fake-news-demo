

export class News {
    constructor(id, headline, body, stance=null) {
        this.id = id;
        this.headline = headline;
        this.body = body;
        this.stance = stance;
    }
}


export const generateNews = () => new News(null, '', '', null);