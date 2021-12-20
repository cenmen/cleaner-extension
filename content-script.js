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
}

start()
