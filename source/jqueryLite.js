// A replacement for the parts of jQuery (right now just jQuery UI) needed by
// the autocomplete-lhc package.  Parts of what is below may be borrowed from
// jQuery, which is under the MIT license.

(function() {
  function initJqueryLite(Def) {

    Def.jqueryLite = function() {
      "use strict";

      return {
        ui: {
          keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
          }
        },
        /**
         * equivalent of jQuery offset().
         * @param elem HTML element
         * @return {{top: *, left: *}}
         */
        getElementOffset: function(elem) {
          // Get document-relative position by adding viewport scroll to viewport-relative gBCR
          const rect = elem.getBoundingClientRect();
          const win = elem.ownerDocument.defaultView;
          return {
            top: rect.top + win.pageYOffset,
            left: rect.left + win.pageXOffset
          };
        },
        /**
         * equivalent of jQuery ajax().
         * @param url
         * @param options
         * @param options.data an object containing query params for the request
         * @param options.complete a callback function to be executed after the request is finished
         * @return {XMLHttpRequest}
         */
        ajax: function(url, options) {
          if (options.data) {
            const urlParams = Object.entries(options.data).map(([key, value]) => `${key}=${value}`).join('&');
            url += `?${urlParams}`;
          }
          const r = new XMLHttpRequest();
          // r.responseType = options.dataType || '';
          r.open("GET", encodeURI(url), true);
          r.onreadystatechange = function() {
            if (r.readyState === 4) {
              options.complete(r, r.statusText);
            }
          };
          r.send();
          return r;
        }
      }
    }();
  }

  if (typeof module !== 'undefined')
    module.exports = initJqueryLite;
  else
    initJqueryLite(Def);
})();
