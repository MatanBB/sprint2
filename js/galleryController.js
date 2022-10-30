'use strict'
function renderGallery() {
  imgs = getMemesToDisplay()
  let strHtml = ``
  imgs.forEach(img => {
    strHtml += `
    <img class="galleryImg" src='${img.url}' onclick="onSelectImg(${img.id},drawImgFromRemote)">
    `
  })
  document.querySelector('.galleryContainer').innerHTML = strHtml
}

function onSelectImg(id, con) {
  document.querySelector('.galleryContainer').classList.add('hidden')
  document.querySelector('.editorContainer').classList.remove('hidden')
  document.querySelector('.savedMemesContainer').classList.add('hidden')
  document.querySelector('.searchHeader').classList.add('hidden')
  renderMemeText(id)
  con === 'RandomMeme' ? renderRandomMeme(id) : renderMeme(id)
}

function renderMemeText(id) {
  let selectedImg = getMemeById(id)
  gMeme = {
    selectedImgId: id,
    selectedLineIdx: 0,
    url:gImgs[id-1].url,
    lines: [{ id:getRandomId(), txt: selectedImg.lines.one, size: 30, align: 'left', color: 'white', strokeColor: 'black', pos: { x: 100, y: 50 } },
    { id:getRandomId(), txt: selectedImg.lines.two, size: 30, align: 'left', color: 'white', strokeColor: 'black', pos: { x: 100, y: 450 } }]
  }
}

function OnOpenGallery() {
  document.querySelector('.galleryContainer').classList.remove('hidden')
  document.querySelector('.editorContainer').classList.add('hidden')
  document.querySelector('.savedMemesContainer').classList.add('hidden')
  document.querySelector('.searchHeader').classList.remove('hidden')
  renderGallery()
}

