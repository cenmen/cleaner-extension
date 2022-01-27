function injectCSS(file) {
  const link = document.createElement('link')
  link.href = chrome.runtime.getURL(file)
  link.type = 'text/css'
  link.rel = 'stylesheet'
  document.querySelector('head').appendChild(link)
}

const HOST = {
  BILIBILI: 'www.bilibili.com',
  CSDN: 'blog.csdn.net',
  MAIMAI: 'maimai.cn',
  ZHIHU: 'www.zhihu.com',
  ZHIHU_ZHUANLAN: 'zhuanlan.zhihu.com',
}

const handler = {
  [HOST.CSDN]: () => {
    injectCSS('csdn-styles.css')
    autoRemoveNodeBySelector('body', 'passport-login-container')
  },
  [HOST.BILIBILI]: () => {
    injectCSS('bilibili-styles.css')
  },
  [HOST.MAIMAI]: () => {
    injectCSS('maimai-styles.css')
  },
  [HOST.ZHIHU]: () => {
    const callback = document.querySelector('.Modal-closeButton').click()
    listenerNodeInsert('body', 'Modal-wrapper', callback)
  },
  [HOST.ZHIHU_ZHUANLAN]: () => {
    const callback = document.querySelector('.Modal-closeButton').click()
    listenerNodeInsert('body', 'Modal-wrapper', callback)
  },
}

function start() {
  const host = window.location.host
  const exec = handler[host]
  exec()
  console.log('==> content-script', host)
}

/**
 * @description: 监听父节点，若目标节点被插入，自动移除
 * @param {string} listener // 父节点 selector
 * @param {string} name // 目标移除节点的 id 等于或 classList 包含的字符串
 * @return {*}
 */
function autoRemoveNodeBySelector(listener, name) {
  if (!listener && !name) return
  const _listener = document.querySelector(listener)
  _listener.addEventListener('DOMNodeInserted', (event) => {
    console.log(event)
    const { id, classList } = event.target
    if (id === name || (classList && classList.value.indexOf(name) !== -1)) {
      console.log('==> removeChild', listener, name)
      const check = document.querySelector(`#${name}`) || document.querySelector(`.${name}`)
      check && _listener.removeChild(event.target)
    }
  })
}

/**
 * @description: 监听父节点，若目标节点被插入，执行回调
 * @param {string} listener // 父节点 selector
 * @param {callback} callback // 目标移除节点的 id 等于或 classList 包含的字符串
 * @return {*}
 */
function listenerNodeInsert(listener, name, callback) {
  if (!listener && !name && !callback) return
  const _listener = document.querySelector(listener)
  _listener.addEventListener('DOMNodeInserted', (event) => {
    console.log(event)
    const { id, classList } = event.target
    if (id === name || (classList && classList.value.indexOf(name) !== -1)) {
      console.log('==> exec callback', name);
      callback()
    }
  })
}

start()
