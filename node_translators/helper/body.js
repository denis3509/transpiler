/*jslint node: true, indent: 2 */
'use strict';

let noSemiColons = [
  'class', 'interface', 'trait', 'namespace', 'try',
  'if', 'switch', 'for', 'foreach', 'function', 'method',
  'while', 'doc', 'comment', 'label', 'declare',
  'usegroup', 'traituse', 'inline', 'block'
];

module.exports = function (writer, currentIndent, body, isProgram, dontIncreaseIndent) {

  let str = '', expr, i, indentation, delimiter, that = this, line, next, after, dontUseNewLine, isInlineEcho;

  // Set the rows delimiter
  delimiter = that._options.collapseEmptyLines ? '' : '\n';

  // Set the indentation
  if (dontIncreaseIndent) {
    indentation = currentIndent;
  } else {
    indentation = isProgram ? '' : currentIndent + that._indent;
  }

  // Force body as an array
  if (!Array.isArray(body)) {
    body = [body];
  }

  for (i = 0; i < body.length; i += 1) {
    expr = body[i];
    next = body[i + 1] || {};
    after = body[i + 2] || {};

    // Return empty string
    if (expr !== null) {


      /**
       * If this expression is an inline, the next is an echo, and the one after
       * is another expression inline, treat it as an inline echo
       */
      if (expr.kind === 'inline' && next.kind === 'echo' && after.kind === 'inline') {
        expr.isInlineEcho = true;
        next.isInlineEcho = true;
        after.omitClosingTag = true;
        dontUseNewLine = true;
      }


      // Is this expr the echo of an inline echo?
      isInlineEcho = expr.kind === 'echo' && expr.isInlineEcho === true;

      if (expr.kind === 'label' || isInlineEcho || expr.omitClosingTag) {
        line = writer(expr, indentation);
      } else {
        line = indentation + writer(expr, indentation);
      }

      // This expressions don't require semicolons
      if (noSemiColons.indexOf(expr.kind) === -1 && !isInlineEcho) {
        line += ';';
      }

      // Check if the next expression is a comment that should be
      // on the same line as this expression
      if (next.kind === 'doc' && next.loc && expr.loc && next.loc.start.line === expr.loc.start.line) {
        line += that._ws + writer(next, '').trim();
        next.alreadyParsed = true; // prevent to parse again the comment
      }


      str += line;
      if (!dontUseNewLine && !isInlineEcho) {
        str += that._nl + delimiter;
      }
    }
  }

  // Return the generated string
  return str;
};
