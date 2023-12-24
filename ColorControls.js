export class ColorControls {

    //put slides as property, constructor, let new ColControls in main
    static averageHue;

    static HUE = 'hue'; // Q: I forgot why the varnames are in uppercase 
    // and why they are given their names in lowercase as values;
    // was it because it needed to be clear what values colorProp can take?
    static SATURATION = 'saturation';
    static LIGHTNESS = 'lightness';
    static alpha; // Q: 

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

    static getRandomColor(displayBalls) {
        this.alpha = displayBalls ? 1.0 : 0.8;

        return 'hsla(' +
            this.calculateRandom(this.HUE) + ', ' +
            this.calculateRandom(this.SATURATION) + '%, ' +
            this.calculateRandom(this.LIGHTNESS) + '%, ' +
            this.alpha +
            ')'; // Q: and I forgot why returning a string here is useful; is the function that is in the string called immediately?
    }

}

