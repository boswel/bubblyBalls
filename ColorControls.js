export class ColorControls {

    static getColorPropSlides(colorProp) {
        let selector = 'input.' + colorProp;
        return document.querySelectorAll(selector);
    }

    static calculateRangeValues(colorProp) {
        let slides = this.getColorPropSlides(colorProp); // Q: I am overwriting global slides but this stays within the scope of calculateRangeValues, right? problem? // edit: now in its own class, even less of a problem?

        let min = slides[0].value < slides[1].value ? +slides[0].value : +slides[1].value;
        let diff = Math.abs(slides[0].value - slides[1].value);

        return { diff: diff, min: min }
    }

    static getRandomColor() {
        let hue = Math.floor(Math.random() * this.calculateRangeValues('hue')['diff']) + this.calculateRangeValues('hue')['min'];
        let saturation = Math.floor(Math.random() * this.calculateRangeValues('saturation')['diff']) + this.calculateRangeValues('saturation')['min'];
        let lightness = Math.floor(Math.random() * this.calculateRangeValues('lightness')['diff']) + this.calculateRangeValues('lightness')['min'];

        return 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';
    }

}