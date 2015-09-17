// Page objects for the standard (i.e. non-directive) autocompleter test page
var BasePage = require('./basePage').BasePage;
var config = require('../config');

var AutocompPage = function() {
  BasePage.call(this);

  this.nonField = $('#content');
  this.prefetchCNEFieldName = 'race_or_ethnicity';
  this.prefetchCNE = $('#'+this.prefetchCNEFieldName);

  this.longOddCNECSS = '#long_odd_cne';
  this.longOddCNE = $(this.longOddCNECSS);
  this.longOddCNENoScrollCSS = '#long_odd_cne_no_scroll';
  this.longOddCNENoScroll = $(this.longOddCNENoScrollCSS);
  this.prefetchCWEID = 'prefetch_cwe';  // single-select
  this.prefetchCWE = $('#'+this.prefetchCWEID);  // single-select
  this.prefetchWithDefault = $('#prefetch_default_cne');
  this.searchCNE = $('#fe_search_cne');

  // Multi-select CNE prefetch list
  this.multiPrefetchCNEID = 'multi_sel_cne';

  // Multi-select CWE prefetch list
  var multiPrefetchCWESectionCSS = '#multiPrefetchCWESection';
  this.multiPrefetchCWEID = 'multi_sel_cwe';
  this.multiPrefetchCWE = $('#'+this.multiPrefetchCWEID);
  this.multiPrefetchCWEFirstSelected =
    element(by.css(multiPrefetchCWESectionCSS + ' li:first-child button'));
  this.multiPrefetchCWESelected =
    element.all(by.css(multiPrefetchCWESectionCSS + ' button'));

  // Multi-select CWE search list
  var multiSearchCWESectionCSS = '#multiSearchCWESection';
  this.multiSearchCWEID = 'multi_sel_search_cwe';
  this.multiSearchCWE = $('#'+this.multiSearchCWEID);
  this.multiSearchCWEFirstSelected =
    element(by.css(multiSearchCWESectionCSS + ' li:first-child button'));
  this.multiSearchCWESelected =
    element.all(by.css(multiSearchCWESectionCSS + ' button'));

  // Multi-select CWE prefetch list with headings
  var multiHeadingCWESectionCSS = '#multi_headings_cwe_section';
  this.multiHeadingCWEID = 'multi_headings_cwe';
  this.multiHeadingCWE = $('#'+this.multiHeadingCWEID);
  this.multiHeadingCWESelected =
    element.all(by.css(multiHeadingCWESectionCSS + ' button'));

  // CWE prefetch list with headings without two-column flow
  this.headings1ColCWE = $('#headings_1col_cwe');

  // Multi-field lists
  this.multiFieldPrefetch = $('#multi_field_cwe');
  this.multiFieldPrefetchCol2 = $('#multi_field_cwe2'); // 2nd column
  this.multiFieldSearch = $('#multi_field_search_cwe');


  this.openTestPage = function() {
    browser.get('http://localhost:'+config.port+
      '/test/protractor/autocomp_atr.html');
  }

  // Returns the scroll position of the window
  this.windowScrollTop = function() {
    return browser.driver.executeScript('return jQuery(window).scrollTop()');
  }

};

module.exports = new AutocompPage();
