{
  // createElement
  function createElement(type, config, ...children) {
    const props = {
      ...config,
      children: children.map(child =>
        typeof child === "object" ? child : createTextNode(child)
      )
    };
    return {
      props,
      type
    }
  }

  function createTextNode(text){
    return {
      type: 'text',
      props: {
        nodeValue: text,
        children: []
      }
    }
  }

  // render函数
  function render(vNode, container) {
    const node = creatNode(vNode)
    container.appendChild(node)
  }

  function creatNode(vNode) {
    let node = null
    const { type, props } = vNode
    if (type == 'text') {
      node = document.createTextNode('')
    } else if(type == "string") {
      node = document.createElement(type);
    } else if(type == 'function') {
      node = type.isReactComponent ? updateClassComponent(vnode) : updateFunctionComponent(vnode)
    } else {
      node = document.createDocumentFragment()
    }

    reconcileChildren(props.children, node);
    updateNode(node, props);

    return node
  }

  function reconcileChildren(children, node) {
    for (let i = 0; i < children.length; i++) {
      let child = children[i]
      render(child, node)
    }
  }

  function updateClassComponent(vNode) {
    const { type, props } = vNode
    const comp = new type(props)
    const vvNode = comp.render()
    // 返回真实dom节点
    const node = createNode(vvnode);
    return vvNode
  }

  function updateFunctionComponent(vNode) {
    const {type, props} = vNode;
    const vvNode = type(props);
    const node = createNode(vvNode);
    return node
  }

  function updateNode(node, props) {
    Object.keys(props).filter(item => item != 'function').forEach(k => {
      node[k] = props[k]
    })
  }
}

// fiber
{
  let nextUnitWork = null
  let wipRoot = null

  function render(vNode, container) {
    wipRoot = {
      node: container,
      props: {
        child: [vNode]
      },
      base: null
    }
    nextUnitOfWork = wipRoot;
  }
  
  function createNode(vNode) {
    let node = null
    const {type, props} = vnode;
    if (type === TEXT) {
      //创建文本节点
      node = document.createTextNode("");
    } else if (typeof type === "string") {
      // 证明是个html标签节点， 比如div、span
      node = document.createElement(type);
    }

    updateNode(node, props);
    return node;
  }

  // 协调子节点
  function reconcileChildren(workInProgress, children) {
    let prevSibling = null;
    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      let newFiber = {
        type: child.type,
        props: child.props,
        node: null,
        base: null,
        return: workInProgress,
        effectTag: PLACEMENT
      };
      if (i === 0) {
        workInProgress.child = newFiber;
      } else {
        prevSibling.sibling = newFiber;
      }
      prevSibling = newFiber;
    }
  }

  // 更新子元素
  function updateNode(node, nextVal) {
    Object.keys(nextVal)
      .filter(k => k !== "children")
      .forEach(k => {
        node[k] = nextVal[k];
      });
  }

  function updateFunctionComponent(fiber) {
    const {type, props} = fiber;
    const children = [type(props)];
    reconcileChildren(fiber, children);
  }
  
  function updateHostComponent(fiber) {
    if (!fiber.node) {
      fiber.node = createNode(fiber);
    }
    const { children } = fiber.props;
    reconcileChildren(fiber, children);
  }

  function performUnitOfWork(fiber) {
    // step1: 执行更新当前fiber
    const {type} = fiber;
    if (typeof type === "function") {
      type.isReactComponent
        ? updateClassComponent(fiber)
        : updateFunctionComponent(fiber);
    } else {
      // 原生标签的
      updateHostComponent(fiber);
    }
    // step2: 并且返回下一个要执行的fiber
    // 原则就是：先看下有没子节点
    if (fiber.child) {
      return fiber.child;
    }
    // 如果没有子节点，找兄弟
    let nextFiber = fiber;
    while (nextFiber) {
      if (nextFiber.sibling) {
        return nextFiber.sibling;
      }
      nextFiber = nextFiber.return;
    }
  }

  function workLoop(deadline) {
    while (nextUnitOfWork && deadline.timeRemaining() > 1) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }
    if (!nextUnitOfWork && wipRoot) {
      commitRoot();
    }
    requestIdleCallback(workLoop)
  }

  requestIdleCallback(workLoop);
  
  function commitRoot() {
    commitWorker(wipRoot.child);
    wipRoot = null
  }

  function commitWorker(fiber) {
    if(!fiber) return

    let parentNodeFiber = fiber.return;
    while(!parentNodeFiber.node) {
      parentNodeFiber = parentNodeFiber.return
    }
    const parentNode = parentNodeFiber.node;
    // fiber有node节点
    if (fiber.effectTag === PLACEMENT && fiber.node !== null) {
      parentNode.appendChild(fiber.node);
    }

    commitWorker(parentNodeFiber.child)
    commitWorker(parentNodeFiber.sibling)
  }
}