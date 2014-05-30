
/**
 * Prefix selectors with `str`.
 *
 *    button {
 *      color: red;
 *    }
 *
 * yields:
 *
 *    #dialog button {
 *      color: red;
 *    }
 *
 */

/**
 * @param str {string} - the prefix
 * @param [separator=' '] {string} - String to separate the prefix from
 *     rest of selector
 */
module.exports = function(str, separator) {
  separator = (typeof separator !== 'string') ? ' ' : separator;
  return function(style){
    style.rules = style.rules.map(function(rule){
      if (!rule.selectors) return rule;
      if (rule.selectors.indexOf('@font-face') !== -1) return rule;
      rule.selectors = rule.selectors.map(function(selector){
        if (':root' == selector) return str;
        selector = selector.replace(/^\:root\s?/, '');
        return str + separator + selector;
      });
      return rule;
    });
  }
};
