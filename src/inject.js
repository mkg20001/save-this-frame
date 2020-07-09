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

const overlay = '<div class="stf-overlay"><div class="main"><div class="header"><h1>Save This Frame!</h1></div><div class="settings"><h1>Size</h1><input type="radio" id="hd" name="size" value="hd" checked>\n<label for="hd">High Quality / HD</label><br>\n<input type="radio" id="as-is" name="size" value="as-is">\n<label for="as-is">As Visible</label><br>\n<input type="radio" id="screen" name="size" value="screen">\n<label for="screen">Screen Size</label><br>\n<input type="radio" id="custom" name="size" value="custom">\n<label for="custom">Custom (WIP)</label><h1>Format</h1><input type="radio" id="png" name="format" value="png" checked>\n<label for="png">PNG</label><br>\n<input type="radio" id="jpg" name="format" value="jpg">\n<label for="jpg">JPG</label><p class="the-button">Save Screenshot</p></div></div></div>';

(async () => {
  const log = (...a) => console.log('[stf] ' + a.shift(), ...a)

  log('loading')

  const $ = require('jquery')

  function collection2array (col) {
    const out = []

    for (let i = 0; i < col.length; i++) {
      out.push(col[i])
    }

    return out
  }

  const a = document.createElement('a')
  document.body.appendChild(a)
  a.style = 'display: none'

  async function forceDownload (_url, fileName) {
    const res = await window.fetch(_url)
    // const blob = new Blob((await res.arrayBuffer()), { type: 'octet/stream' })
    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)
    a.href = url
    a.download = fileName
    a.click()
    window.URL.revokeObjectURL(url)
  }

  function _doCapture (video, settings) {
    const canvas = document.createElement('canvas')

    // TODO: use size from settings
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const canvasContext = canvas.getContext('2d')
    canvasContext.drawImage(video, 0, 0)

    // TODO: use format from settings
    const picture = canvas.toDataURL('image/' + settings.format)

    // TODO: make download (blob?) out of picture
    forceDownload(picture, `screenshot.${settings.format}`)
  }

  function clearUI () {
    log('clear ui')
    $('.stf-overlay').remove()
  }

  function doCapture (video) {
    clearUI()

    // TODO: check if paused and only restore
    video.pause()

    log('load capture ui')

    const UI = $(overlay)
    $('body').append(UI)

    const getR = n => UI.find('input[name="' + n + '"]').val()

    UI.find('.the-button').on('click', () => {
      _doCapture(video, {
        format: getR('format'),
        size: getR('size')
      })

      video.play()
      clearUI()
    })
  }

  function onChange () {

  }

  function onInjected () {
    if (window.location.host.endsWith('youtube.com')) { // TODO: sec matching
      function doYTP () {
        doCapture($('.video-stream')[0])
      }

      log('ytp')

      const intv = setInterval(ytpAttach, 200)

      function ytpAttach () {
        log('at')
        let YTP = collection2array(document.getElementsByClassName('ytp-panel-menu'))
        YTP = YTP.filter(el => el.children.length && el.style[0])[0]

        if (YTP) {
          log('at ok')
          const el = $('<div class="ytp-menuitem" aria-haspopup="false" role="menuitem" tabindex="0"><div class="ytp-menuitem-icon">DA</div><div class="ytp-menuitem-label">Save this frame!</div><div class="ytp-menuitem-content"></div></div>')
          YTP = $(YTP)
          YTP.parent().parent().css('height', YTP.height() + 128)
          YTP.parent().css('height', YTP.height() + 128)
          YTP.css('height', YTP.height() + 128)
          YTP.append(el)
          el.on('click', doYTP)

          clearInterval(intv)
        }
      }
    }
  }

  onInjected()
})()
