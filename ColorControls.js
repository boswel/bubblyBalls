export class ColorControls {

    //put slides as property, constructor, let new ColControls in main
    static averageHue;

    static HUE = 'hue';
    static SATURATION = 'saturation';
    static LIGHTNESS = 'lightness';

    static getColorPropSlides(colorProp) {
        let selector = 'input.' + colorProp;
        return document.querySelectorAll(selector);
    }

    static calculateRandom(colorProp) {
        let slides = this.getColorPropSlides(colorProp);

        let min = Math.min(slides[0].value, slides[1].value);
        let diff = Math.abs(slides[0].value - slides[1].value);

        if (colorProp === this.HUE) {
            this.averageHue = min + diff / 2;
        }

        return Math.floor(Math.random() * diff) + min;

    }

    static getRandomColor() {
        return 'hsl(' +
            this.calculateRandom(this.HUE) + ', ' +
            this.calculateRandom(this.SATURATION) + '%, ' +
            this.calculateRandom(this.LIGHTNESS) + '%' +
            ')';
    }

}

