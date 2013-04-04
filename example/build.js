;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0](function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
(function() {
  var css, html, style, _ref;

  _ref = require("../lilyturf.coffee"), html = _ref.html, css = _ref.css;

  style = css(function() {
    return {
      "html": {
        "css": "red",
        head: {
          fontSize: 10
        }
      }
    };
  });

  console.log("load", style);

}).call(this);


},{"../lilyturf.coffee":2}],2:[function(require,module,exports){
(function() {
  var css, css_tools, html_scope, html_tools, pair_elems, resolve, single_elems,
    __slice = [].slice;

  html_scope = {};

  pair_elems = "head title body script  div nav header footer section article  p span textarea br pre code a address b backquote  button font frame form hr i  ul li ol table tr td th title  canvas audio video select style".split(/\s+/);

  single_elems = "img meta input link iframe audio video".split(/\s+/);

  html_tools = {
    attrs: function(obj) {
      var attrs, key, value;
      attrs = "";
      for (key in obj) {
        value = obj[key];
        attrs += " " + key + "='" + value + "'";
      }
      return attrs;
    },
    text: function(text) {
      return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\s/g, "&nbsp;");
    }
  };

  resolve = function(list) {
    var elem, obj;
    obj = {};
    elem = [];
    list.forEach(function(item) {
      var key, that, value, _i, _len, _results, _results1;
      if (item != null) {
        if (item.__proto__ === Object.prototype) {
          _results = [];
          for (key in item) {
            value = item[key];
            _results.push(obj[key] = value);
          }
          return _results;
        } else if (item.__proto__ === Array.prototype) {
          _results1 = [];
          for (_i = 0, _len = item.length; _i < _len; _i++) {
            that = item[_i];
            _results1.push(elem.push(that));
          }
          return _results1;
        } else {
          return elem.push(item);
        }
      }
    });
    return [obj, elem];
  };

  pair_elems.map(function(tag) {
    return html_scope[tag] = function() {
      var list, obj, _ref;
      list = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _ref = resolve(list), obj = _ref[0], list = _ref[1];
      return "<" + tag + (html_tools.attrs(obj)) + ">" + (list.join("")) + "</" + tag + ">";
    };
  });

  single_elems.map(function(tag) {
    return html_scope[tag] = function(obj) {
      if (obj == null) {
        obj = {};
      }
      return "<" + tag + (html_tools.attrs(obj)) + "/>";
    };
  });

  html_scope.html = function(string) {
    return string;
  };

  html_scope.text = html_tools.text;

  css_tools = {
    template: function(base, selector, declaration) {
      return "" + base + " " + selector + "{\n" + declaration + "\n}\n";
    },
    utils: {
      hsl: function(h, s, l) {
        return "hsl(" + h + ", " + s + "%, " + l + "%)";
      },
      hsla: function(h, s, l, a) {
        return "hsl(" + h + ", " + s + "%, " + l + "%, " + a + ")";
      }
    },
    type: function(value) {
      var match, string;
      match = Object.prototype.toString.call(value).match(/\s\w+/);
      string = match[0].slice(1);
      return string.toLowerCase();
    },
    pretty: function(char) {
      if (char.match(/^[A-Z]$/) != null) {
        return "-" + char.toLowerCase();
      } else {
        return char;
      }
    }
  };

  css = function(generator) {
    var data, style, write_rule;
    style = "";
    css_tools.utils.generator = generator;
    data = css_tools.utils.generator();
    write_rule = function(base, data) {
      var attribute, declaration, nest_selector, nested, plain, rule, selector, value, values, _i, _len, _results;
      nested = {};
      for (selector in data) {
        declaration = data[selector];
        plain = [];
        for (attribute in declaration) {
          value = declaration[attribute];
          if ((css_tools.type(value)) === "object") {
            nest_selector = "" + base + " " + selector;
            if (nested[nest_selector] == null) {
              nested[nest_selector] = {};
            }
            nested[nest_selector][attribute] = value;
          } else {
            attribute = attribute.split("").map(css_tools.pretty).join("");
            if ((css_tools.type(value)) === "number") {
              value = "" + value + "px";
            }
            if ((css_tools.type(value)) === "array") {
              values = value;
              for (_i = 0, _len = values.length; _i < _len; _i++) {
                value = values[_i];
                plain.push("  " + attribute + ": " + value + ";");
              }
            } else {
              plain.push("  " + attribute + ": " + value + ";");
            }
          }
        }
        if (plain.length > 0) {
          declaration = plain.join("\n");
          rule = css_tools.template(base, selector, declaration);
          style += rule.trimLeft();
        }
      }
      if ((Object.keys(nested)).length > 0) {
        _results = [];
        for (base in nested) {
          data = nested[base];
          _results.push(write_rule(base, data));
        }
        return _results;
      }
    };
    write_rule("", data);
    return style;
  };

  exports.html = function(generator) {
    console.log(html_scope);
    return generator.call(html_scope);
  };

  exports.css = function(data) {
    return css(data);
  };

}).call(this);


},{}]},{},[1])
;