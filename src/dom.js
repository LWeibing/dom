window.dom = {
  //增
  create(str) {
    const container = document.createElement("template");
    container.innerHTML = str.trim();
    return container.content.firstChild;
  },

  after(node, nodeNext) {
    node.parentNode.insertBefore(nodeNext, node.nextSibling);
  },

  before(node, nodeNext) {
    node.parentNode.insertBefore(nodeNext, node);
  },

  append(parent, child) {
    parent.appendChild(child);
  },

  wrap(child, parent) {
    dom.before(child, parent);
    dom.append(parent, child);
  },

  //删
  remove(node) {
    node.parentNode.removeChild(node);
  },

  empty(parent) {
    const arr = [];
    let x = parent.firstChild;
    while (x) {
      arr.push(dom.remove(x));
      x = parent.firstChild;
    }
    return arr;
  },

  //改
  att(node, name, value) {
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },

  text(node, str) {
    //适配
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = str;
      } else {
        node.textContent = str;
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },

  html(node, str) {
    if (arguments.length === 2) {
      node.innerHTML = str;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },

  style(node, name, value) {
    if (arguments.length === 3) {
      //div  color  red
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (name instanceof Objec) {
        for (let key in name) {
          node.style[key] = name[key];
        }
      } else if (typeof name === "string") {
        return node.style[name];
      }
    }
  },
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  sibiling(node) {
    let list = node.parentNode.children;
    let arr = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i] !== node) {
        arr.push(list[i]);
      }
    }
    return arr;
  },
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },
  each(node, fn) {
    for (let i = 0; i < node.length; i++) {
      fn.call(null, node[i]);
    }
  },
  index(node) {
    const list = dom.children(dom.parent(node));
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
