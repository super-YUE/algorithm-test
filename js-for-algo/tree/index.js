const sequence = (root) => {
  const res = []
  const q = []
  if(root) {
    q.push(root)
  }
  while(q.length) {
    const currentLevelSize = q.length
    res.push([])
    for(let i = 0; i < currentLevelSize; i++) {
      const node = q.shift()
      // xxx
      if(node.left) {
        q.push(node.left)
      }
      if(node.right) {
        q.push(node.right)
      }
    }
  }
}

const preOrderTraverse = root => {
  const res = []
  function preOrder(node) {
    if (!node) return
    res.push(node.val)
    preOrder(node.left)
    preOrder(node.right)
  }
  preOrder(root)
  return res
}

{
  const preOrderTraverse = root => {
    const res = []
    const stack = []
    if (root) {
      stack.push(root)
    }
    while(stack.length) {}
  }
}