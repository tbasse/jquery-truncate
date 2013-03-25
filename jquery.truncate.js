(function ($) {
  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  function findTruncPoint(dimension, max, text, start, end, $workerEl, token, fromEnd, appendMethod) {
    var makeContent = function(content) {
      return (fromEnd ? token : '') + content + (fromEnd ? '' : token);
    };

    var opt1,
      opt2,
      mid;

    if (fromEnd) {
      opt1 = start === 0 ? '' : text.slice(-start);
      opt2 = text.slice(-end);
    } else {
      opt1 = text.slice(0, start);
      opt2 = text.slice(0, end);
    }

    if(max < $workerEl[appendMethod](token)[dimension]()) {
      return 0;
    }

    if ($workerEl[appendMethod](makeContent(opt2))[dimension]() < $workerEl[appendMethod](makeContent(opt1))[dimension]()) {
      return end;
    }

    mid = parseInt((start + end) / 2, 10);
    opt1 = fromEnd ? text.slice(-mid) : text.slice(0, mid);

    $workerEl[appendMethod](makeContent(opt1));
    if ($workerEl[dimension]() === max) {
      return mid;
    }

    if ($workerEl[dimension]() > max) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }

    return findTruncPoint(dimension, max, text, start, end, $workerEl, token, fromEnd, appendMethod);
  }

  $.fn.truncate = function (options) {
    if(!options) { options = {}; }
    // backward compatibility
    if(typeof options.center != 'undefined' && typeof options.side == 'undefined') {
      options.side = 'center';
      delete options.center;
    }
    if(typeof options.side != 'undefined')
      switch(options.side) {
        case 'left': case 'center': case 'right':
          break;
        default:
          // falls back to default
          delete options.side;
      }

    var defaults = {
      width: 'auto',
      token: '&hellip;',
      side: 'right',
      addclass: false,
      addtitle: false,
      multiline: false
    };
    options = $.extend(defaults, options);

    return this.each(function () {
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
          'display': 'none',
          'escapeHTML': false
        },
        elementText = $element.text(),
        appendMethod = options.escapeHTML ? 'text' : 'html',
        $truncateWorker = $('<span/>').css(fontCSS)[appendMethod](elementText).appendTo('body'),
        originalWidth = $truncateWorker.width(),
        truncateWidth = isNumber(options.width) ? options.width : $element.width(),
        dimension = 'width',
        truncatedText, originalDim, truncateDim;

        if(options.multiline) {
          $truncateWorker.width($element.width());
          dimension = 'height';
          originalDim = $truncateWorker.height();
          truncateDim = $element.height() + 1;
        }
        else {
          originalDim = originalWidth;
          truncateDim = truncateWidth;
        }

      if (originalDim > truncateDim) {
        $truncateWorker.text('');
        switch(options.side) {
          case 'left':
            truncatedText = options.token + elementText.slice(-1 * findTruncPoint(dimension, truncateDim, elementText, 0, elementText.length, $truncateWorker, options.token, true, appendMethod));
            break;
          case 'center':
            truncateDim = parseInt(truncateDim / 2, 10) - 1;
            truncatedText = elementText.slice(0, findTruncPoint(dimension, truncateDim, elementText, 0, elementText.length, $truncateWorker, options.token, false, appendMethod))
                    + options.token
                    + elementText.slice(-1 * findTruncPoint(dimension, truncateDim, elementText, 0, elementText.length, $truncateWorker, '', true, appendMethod));
            break;
          case 'right':
            truncatedText = elementText.slice(0, findTruncPoint(dimension, truncateDim, elementText, 0, elementText.length, $truncateWorker, options.token, false, appendMethod)) + options.token;
            break;
        }

        if (options.addclass) {
          $element.addClass(options.addclass);
        }

        if (options.addtitle) {
          $element.attr('title', elementText);
        }

        if(options.escapeHTML){
          $element.text(truncatedText);
        } else {
          $element.empty().append(truncatedText);
        }

      }

      $truncateWorker.remove();
    });
  };
})(jQuery);