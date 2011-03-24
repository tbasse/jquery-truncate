(function($) {
    $.fn.extend({

        truncate: function(options) {
            var defaults = {
                width: 'auto',
                token: '&hellip;',
                center: false,
                addclass: false,
                addtitle: false
            };
            options = $.extend(defaults, options);

            return this.each(function() {

                var $element = $(this),
                    fontCSS = {
                        'fontFamily': $element.css('fontFamily'),
                        'fontSize': $element.css('fontSize'),
                        'fontStyle': $element.css('fontStyle'),
                        'fontWeight': $element.css('fontWeight'),
                        'font-variant': $element.css('font-variant'),
                        'text-indent': $element.css('text-indent'),
                        'text-transform': $element.css('text-transform'),
                        'letter-spacing': $element.css('letter-spacing'),
                        'word-spacing': $element.css('word-spacing'),
                        'display': 'none'
                    },
                    elementText = $element.text(),
                    truncatedText = '',
                    $truncateWorker = $('<span/>').css(fontCSS).html(elementText).appendTo('body'),
                    originalWidth = $truncateWorker.width(),
                    truncateWidth = $.fn.isNumber(options.width) ? options.width : $element.width();



                if (originalWidth > truncateWidth) {
                    $truncateWorker.text('');
                    if (options.center) {
                        truncatedText = elementText.slice(0, $.fn.findTruncPoint((parseInt(truncateWidth / 2, 10) + 1), elementText, 0, elementText.length, $truncateWorker, options.token, false,0)) 
                                        + options.token 
                                        + elementText.slice(-1 * $.fn.findTruncPoint((parseInt(truncateWidth / 2, 10)+ 1), elementText, 0, elementText.length, $truncateWorker, '', true,0));
                    }
                    else {
                        truncatedText = elementText.slice(0, $.fn.findTruncPoint(truncateWidth, elementText, 0, elementText.length, $truncateWorker, options.token, false,0)) + options.token;
                    }

                    if (options.addclass) {
                        $element.addClass(options.addclass);
                    }

                    if (options.addtitle) {
                        $element.attr('title', elementText);
                    }

                    $element.html(truncatedText);

                }
                $truncateWorker.remove();
            });

        },

        isNumber: function(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        },
        reverseString: function(str) {
            return str.split('').reverse().join('');
        },

        findTruncPoint: function(maxWidth, text, start, end, $workerEl, token, reversed, count) {
            var opt1 = "",
                opt2 = "",
                mid = 0;
                count++;
            if (reversed) {
                opt1 = $.fn.reverseString($.fn.reverseString(text).slice(0, start));
                opt2 = $.fn.reverseString($.fn.reverseString(text).slice(0, end));
            } else {
                opt1 = text.slice(0, start);
                opt2 = text.slice(0, end);
            }

            if ($workerEl.html(opt2 + token).width() < $workerEl.html(opt1 + token).width()) {
                return end;
            }
            mid = parseInt((start + end) / 2, 10);
            if (reversed) {
                opt1 = $.fn.reverseString($.fn.reverseString(text).slice(0, mid));
            } else {
                opt1 = text.slice(0, mid);
            }


            if ($workerEl.html(opt1 + token).width() == maxWidth) {
                return mid;
            }

            if ($workerEl.html(opt1 + token).width() > maxWidth) {
                return $.fn.findTruncPoint(maxWidth, text, start, (mid - 1), $workerEl, token, reversed,count);
            } else {
                return $.fn.findTruncPoint(maxWidth, text, (mid + 1), end, $workerEl, token, reversed,count);
            }
        }

    });
})(jQuery);
