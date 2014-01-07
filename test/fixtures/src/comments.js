/*!
 * *! protocol comment in comments.js
 */
function foo() {
  return 'foo';
}
// @preserve preserve
// @license license
function bar() {
  return 'bar';
}
/* @preserve
 * multiline preserve
 */
/* @license
 * multiline license
 */
function baz() {
  return bar() + bar();
}
// end - not preserved