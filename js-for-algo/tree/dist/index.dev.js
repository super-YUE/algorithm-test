"use strict";

var sequence = function sequence(root) {
  var res = [];
  var q = [];

  if (root) {
    q.push(root);
  }

  while (q.length) {
    var currentLevelSize = q.length;
    res.push([]);

    for (var i = 0; i < currentLevelSize; i++) {
      var node = q.shift(); // xxx

      if (node.left) {
        q.push(node.left);
      }

      if (node.right) {
        q.push(node.right);
      }
    }
  }
};

var preOrderTraverse = function preOrderTraverse(root) {
  var res = [];

  function preOrder(node) {
    if (!node) return;
    res.push(node.val);
    preOrder(node.left);
    preOrder(node.right);
  }

  preOrder(root);
  return res;
};

{
  var _preOrderTraverse = function _preOrderTraverse(root) {
    var res = [];
    var stack = [];

    if (root) {
      stack.push(root);
    }

    while (stack.length) {}
  };
}