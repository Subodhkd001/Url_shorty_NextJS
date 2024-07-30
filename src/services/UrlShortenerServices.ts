import { url } from 'inspector';
import shortId from 'shortid';
import UrlRepository from './../repositories/UrlRepository';
export default class UrlShortenerService {
    private urlRepository

    constructor() {
        this.urlRepository = new UrlRepository();
    }

    async shortenUrl(originalUrl: string) : Promise<string> {
        let url = await this.urlRepository.getUrlByOriginalUrl(originalUrl);
        if(url){
            return url.shortUrl;
        }
        let shortUrl = shortId();
        url = await this.urlRepository.getUrlByShortUrl(shortUrl);
        while(url){
            shortUrl = shortId();
            url = await this.urlRepository.getUrlByShortUrl(shortUrl);
        }

        await this.urlRepository.createUrl(originalUrl, shortUrl);
        return shortUrl;
    }
    async getAllUrls(){
        return await this.urlRepository.getAllUrls();
    }
}