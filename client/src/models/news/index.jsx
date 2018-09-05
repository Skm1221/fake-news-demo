

export class News {
    constructor(id, headline, body) {
        this.id = id;
        this.headline = headline;
        this.body = body;
    }
}


export const generateNews = () => new News(null, '', '');