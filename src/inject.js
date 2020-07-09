'use strict'

/*

Image of the current frame:

function captureVideo(video) {
    var canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    var canvasContext = canvas.getContext("2d");
    canvasContext.drawImage(video, 0, 0);
    return canvas.toDataURL('image/png');
}
Current time:

var frameAfterSeek = Math.floor(_video.currentTime);

*/

/* eslint-disable no-inner-declarations */

// import overlay from "bundle-text:./overlay.pug";

const ytpitem = '<div class="ytp-menuitem" aria-haspopup="false" role="menuitem" tabindex="0"><div class="ytp-menuitem-icon"><svg fill="#fff" style="enable-background:new 0 0 30 30;" version="1.1" viewBox="0 0 30 30" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M6,19V17c0-0.552-0.448-1-1-1H5c-0.552,0-1,0.448-1,1V19c0,0.552,0.448,1,1,1H5C5.552,20,6,19.552,6,19z"/><path d="M10,5L10,5c0,0.553,0.448,1,1,1H13c0.552,0,1-0.448,1-1V5c0-0.552-0.448-1-1-1H11C10.448,4,10,4.448,10,5z"/><path d="M5,14L5,14c0.553,0,1-0.448,1-1V11c0-0.552-0.448-1-1-1H5c-0.552,0-1,0.448-1,1V13C4,13.552,4.448,14,5,14z"/><path d="M23,6h1l0,1c0,0.552,0.448,1,1,1h0c0.552,0,1-0.448,1-1V6c0-1.105-0.895-2-2-2h-1c-0.552,0-1,0.448-1,1v0   C22,5.552,22.448,6,23,6z"/><path d="M16,5L16,5c0,0.552,0.448,1,1,1h2c0.552,0,1-0.448,1-1v0c0-0.552-0.448-1-1-1h-2C16.448,4,16,4.448,16,5z"/><path d="M7,24H6v-1c0-0.552-0.448-1-1-1H5c-0.552,0-1,0.448-1,1v1c0,1.105,0.895,2,2,2h1c0.552,0,1-0.448,1-1V25   C8,24.448,7.552,24,7,24z"/><path d="M6,7V6h1c0.552,0,1-0.448,1-1V5c0-0.552-0.448-1-1-1H6C4.895,4,4,4.895,4,6v1c0,0.552,0.448,1,1,1H5C5.552,8,6,7.552,6,7z"/><path d="M24,11l0,2.001c0,0.552,0.448,1,1,1h0c0.552,0,1-0.448,1-1V11c0-0.552-0.448-1-1-1h0C24.448,10,24,10.448,24,11z"/></g><g><path d="M25,16h-1.764c-0.758,0-1.45-0.428-1.789-1.106l-0.171-0.342C21.107,14.214,20.761,14,20.382,14h-4.764   c-0.379,0-0.725,0.214-0.894,0.553l-0.171,0.342C14.214,15.572,13.521,16,12.764,16H11c-0.552,0-1,0.448-1,1v8c0,0.552,0.448,1,1,1   h14c0.552,0,1-0.448,1-1v-8C26,16.448,25.552,16,25,16z M18,25c-2.209,0-4-1.791-4-4c0-2.209,1.791-4,4-4s4,1.791,4,4   C22,23.209,20.209,25,18,25z"/><circle cx="18" cy="21" r="2"/></g></svg></div><div class="ytp-menuitem-label">Save this frame!</div><div class="ytp-menuitem-content"></div></div>'
const overlay = '<div class="stf-overlay"><div class="stf-main"><div class="stf-header"><h1>Save This Frame!</h1><div class="stf-close"><svg height="512px" fill="#fff" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/></svg></div></div><div class="stf-settings"><h1>Size</h1><input type="radio" id="stf-hd" name="stf-size" value="hd">\n<label for="stf-hd">High Quality / HD</label><br>\n<input type="radio" id="stf-as-is" name="stf-size" value="as-is" checked>\n<label for="stf-as-is">As Visible</label><br>\n<input type="radio" id="stf-screen" name="stf-size" value="screen">\n<label for="stf-screen">Screen Size</label><br>\n<input type="radio" id="stf-custom" name="stf-size" value="custom">\n<label for="stf-custom">Custom (WIP)</label><br><br/><h1>Format</h1><input type="radio" id="stf-png" name="stf-format" value="png" checked>\n<label for="stf-png">PNG</label><br>\n<input type="radio" id="stf-jpg" name="stf-format" value="jpg">\n<label for="stf-jpg">JPG</label><br><br/><p class="the-button">Save Screenshot</p></div></div></div>';

(async () => {
  const log = (...a) => process.env.NODE_ENV === 'development' ? console.log('[stf] ' + a.shift(), ...a) : false

  log('loading')

  const $ = require('jquery')

  let lastEv

  $('body').on('mousedown', _lastEv => {
    log('mousedown')
    lastEv = _lastEv
  })

  chrome.runtime.onMessage.addListener(
    function (request) {
      if (request.stf && request.event === 'triggerUi') {
        log('trigger ui recieved')
        doCapture(lastEv.target)
      }
    })

  function collection2array (col) {
    const out = []

    for (let i = 0; i < col.length; i++) {
      out.push(col[i])
    }

    return out
  }

  async function forceDownload (_url, fileName) {
    const a = document.createElement('a')
    document.body.appendChild(a)
    a.style = 'display: none'

    const res = await window.fetch(_url)
    // const blob = new Blob((await res.arrayBuffer()), { type: 'octet/stream' })
    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)
    a.href = url
    a.download = fileName
    a.click()
    window.URL.revokeObjectURL(url)

    $(a).remove()
  }

  function _doCapture (video, settings) {
    const canvas = document.createElement('canvas')

    // TODO: use size from settings
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const canvasContext = canvas.getContext('2d')
    canvasContext.drawImage(video, 0, 0)

    const picture = canvas.toDataURL('image/' + settings.format)

    // TODO: include page title in filename
    forceDownload(picture, `screenshot.${settings.format}`)
  }

  function clearUI () {
    log('clear ui')
    $('.stf-overlay').remove()
  }

  function doCapture (video) {
    clearUI()

    const wasPaused = video.paused

    if (!wasPaused) {
      video.pause()
    }

    log('load capture ui')

    const UI = $(overlay)
    $('body').append(UI)

    const getR = n => UI.find('input[name="' + n + '"]').val()

    const post = () => {
      if (!wasPaused) {
        video.play()
      }
      clearUI()
    }

    UI.find('.stf-close').on('click', () => post())

    UI.find('.the-button').on('click', () => {
      _doCapture(video, {
        format: getR('stf-format'),
        size: getR('stf-size')
      })

      post()
    })
  }

  function onChange () {

  }

  function onInjected () {
    if (window.location.host.endsWith('youtube.com')) { // TODO: sec matching
      let ytpMain

      function doYTP () {
        ytpMain.hide()
        doCapture($('.video-stream')[0])
      }

      log('ytp')

      const intv = setInterval(ytpAttach, 200)

      function ytpAttach () {
        log('ytp attach...')
        let YTP = collection2array(document.getElementsByClassName('ytp-panel-menu'))
        YTP = YTP.filter(el => el.children.length && el.style[0])[0]

        if (YTP) {
          log('ytp attach ok')
          const el = $(ytpitem)
          YTP = $(YTP)
          YTP.parent().parent().css('height', YTP.height() + 128)
          YTP.parent().css('height', YTP.height() + 128)
          YTP.css('height', YTP.height() + 128)
          YTP.append(el)
          el.on('click', doYTP)

          ytpMain = YTP.parent().parent()

          clearInterval(intv)
        }
      }
    }
  }

  onInjected()
})()
