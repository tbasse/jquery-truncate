(function ($) {
	function isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}
	function findTruncPoint(maxWidth, text, start, end, $workerEl, token, fromEnd) {
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

		if ($workerEl.html(opt2 + token).width() < $workerEl.html(opt1 + token).width()) {
			return end;
		}

		mid = parseInt((start + end) / 2, 10);
		opt1 = fromEnd ? text.slice(-mid) : text.slice(0, mid);

		$workerEl.html(opt1 + token);
		if ($workerEl.width() === maxWidth) {
			return mid;
		}

		if ($workerEl.width() > maxWidth) {
			end = mid - 1;
		} else {
			start = mid + 1;
		}

		return findTruncPoint(maxWidth, text, start, end, $workerEl, token, fromEnd);
	}

	$.fn.truncate = function (options) {
		var defaults = {
			width: 'auto',
			token: '&hellip;',
			center: false,
			addclass: false,
			addtitle: false
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
					'display': 'none'
				},
				elementText = $element.text(),
				$truncateWorker = $('<span/>').css(fontCSS).html(elementText).appendTo('body'),
				originalWidth = $truncateWorker.width(),
				truncateWidth = isNumber(options.width) ? options.width : $element.width(),
				truncatedText;

			if (originalWidth > truncateWidth) {
				$truncateWorker.text('');
				if (options.center) {
					truncateWidth = parseInt(truncateWidth / 2, 10) + 1;
					truncatedText = elementText.slice(0, findTruncPoint(truncateWidth, elementText, 0, elementText.length, $truncateWorker, options.token, false))
									+ options.token
									+ elementText.slice(-1 * findTruncPoint(truncateWidth, elementText, 0, elementText.length, $truncateWorker, '', true));
				} else {
					truncatedText = elementText.slice(0, findTruncPoint(truncateWidth, elementText, 0, elementText.length, $truncateWorker, options.token, false)) + options.token;
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
	};
})(jQuery);