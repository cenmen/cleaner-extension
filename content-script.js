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
  JIANSHU: 'www.jianshu.com',
  INTERVIEW: 'vue3js.cn',
  SHANGGUIGU: 'www.atguigu.com',
}

const handler = {
  [HOST.CSDN]: () => {
    injectCSS('csdn-styles.css')
    autoRemoveNodeBySelector('body', 'passport-login-container')
  },
  [HOST.BILIBILI]: () => {
    injectCSS('bilibili-styles.css')
    document.querySelector('#app').style = 'background-color:black;'
    document.querySelector('.v-wrap').style = 'background-color:black;'
    const ul = document.querySelector('.bilibili-player-video-btn-speed-menu')
    const createSpeed = (speed) => {
      const element = document.createElement('li')
      element.classList.add('bilibili-player-video-btn-speed-menu-list')
      element.dataset.value = speed
      element.innerText = `${speed}x`
      ul.insertBefore(element, ul.firstChild)
    }
    createSpeed(2.5)
    setTimeout(() => {
      createSpeed(3.0)
    }, 3000)
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
  [HOST.JIANSHU]: () => {
    injectCSS('jianshu-styles.css')
  },
  [HOST.INTERVIEW]: () => {
    injectCSS('interview-styles.css')
    setInterval(() => {
      document.title = ''
    }, 3000)
  },
  [HOST.SHANGGUIGU]: () => {
    injectCSS('atguigu-styles.css')
  },
}

function start() {
  const host = window.location.host
  console.log('==> content-script', host)
  const exec = handler[host]
  exec()
}

/**
 * @description: ?????????????????????????????????????????????????????????
 * @param {string} listener // ????????? selector
 * @param {string} name // ????????????????????? id ????????? classList ??????????????????
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
 * @description: ?????????????????????????????????????????????????????????
 * @param {string} listener // ????????? selector
 * @param {callback} callback // ????????????????????? id ????????? classList ??????????????????
 * @return {*}
 */
function listenerNodeInsert(listener, name, callback) {
  if (!listener && !name && !callback) return
  const _listener = document.querySelector(listener)
  _listener.addEventListener('DOMNodeInserted', (event) => {
    console.log(event)
    const { id, classList } = event.target
    if (id === name || (classList && classList.value.indexOf(name) !== -1)) {
      console.log('==> exec callback', name)
      callback()
    }
  })
}

start()
