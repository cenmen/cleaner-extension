function injectCSS(file) {
  const link = document.createElement('link')
  link.href = chrome.runtime.getURL(file)
  link.type = 'text/css'
  link.rel = 'stylesheet'
  document.querySelector('head').appendChild(link)
}

function start() {
  /* CSDN */
  injectCSS('csdn-styles.css')
  autoRemoveNodeBySelector('body', '.passport-login-container')
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
  _listener.addEventListener('DOMNodeInserted', (event, relate) => {
    console.log(event, relate)
    const { id, classList } = event.target
    if (id === name || classList.value.indexOf(name) !== -1) {
      console.log('==> removeChild', listener, name);
      const check = document.querySelector(`#${name}`) || document.querySelector(`.${name}`)
      check && _listener.removeChild(event.target)
    }
  })
}

start()
