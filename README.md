Simple plugin that truncates a text either at its end or middle based on a given width or it's elements width.

### Usage

    $('.class').truncate();

    $('.class').truncate({
    	width: 'auto',
    	after: '&hellip;',
    	center: false,
    });

### Options

- **width** (int) Optional width to which the text will be truncated *[default: auto]*
- **after** (string) Replacement string for the truncated part *[default: '&amp;hellip;']*
- **center** (bool) Truncates center part if set to 'true' *[default: false]*