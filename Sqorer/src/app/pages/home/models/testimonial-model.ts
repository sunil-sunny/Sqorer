
export class Testimonial {
    name: string;
    review: string;
    imageUrl: string;

    constructor( name: string,  review: string, imageUrl: string){
        this.name=name;
        this.review=review;
        this.imageUrl=imageUrl;
    }
}
