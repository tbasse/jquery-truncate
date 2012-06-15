# jQuery Truncate Text Plugin #

Simple plugin that truncates a text either at its end or middle based on a given width or it's elements width. The width calculation takes into account all the original elements css styles like font-size, font-family, font-weight, text-transform, letter-spacing etc.  
Additionally if the text has been shortened you can set a class to be appended to the element and/or set the "title" attribute to the original text.

## Usage ##


    $('.class').truncate();

    $('.class').truncate({
    	width: 'auto',
    	token: '&hellip;',
    	center: false,
    	multiline: false
    });

## Options ##

- **width** (int) Width to which the text will be shortened *[default: auto]*
- **token** (string) Replacement string for the stripped part *[default: '&amp;hellip;']*
- **center** (bool) Shortens at the center of the string if set to 'true' *[default: false]*
- **addclass** (string) Add a class to the truncated strings element *[default: false]*
- **addtitle** (bool) Add/Set "title" attribute with original text to the truncated strings element *[default: false]*
- **multiline** (bool) Applies truncation to multi-line, wrapped text *[default: false]*

## License ##

Released under the MIT license.