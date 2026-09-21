// Small DOM helpers shared by every renderer module.

export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'class') node.className = value;
    else if (key === 'html') node.innerHTML = value;
    else if (key.startsWith('on') && typeof value === 'function') node.addEventListener(key.slice(2), value);
    else if (value !== undefined && value !== null) node.setAttribute(key, value);
  }
  for (const child of [].concat(children)) {
    if (child === undefined || child === null) continue;
    node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return node;
}

export function mount(containerId, node) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.replaceChildren(node);
}

export function randomItem(list) {
  if (!Array.isArray(list) || list.length === 0) return undefined;
  return list[Math.floor(Math.random() * list.length)];
}
