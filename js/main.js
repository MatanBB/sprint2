'use strict'
let gCtx
let gElCanvas
let gSavedMemes
var gKeywordSearchCountMap = categoryMaps()
let gSearch
let gSelectedPiece = null
let gStartPos


function onInit() {
  gElCanvas = document.querySelector('#my-canvas')
  gCtx = gElCanvas.getContext('2d')
  renderGallery()
  renderSearchBox()
  addMouseListeners()
  renderSearchWords()
}

function renderSearchWords() {
  let searchWords = document.querySelector('.searchWords')
  let Keywords = Object.entries(gKeywordSearchCountMap)
  let str = ''
  Keywords.forEach(keyword => {
    str += `<p onclick="OnEnlargeBtn('${keyword[0]}')" class="searchWord ${keyword[0]}" style=font-size:${10 + keyword[1] * 3}px>${keyword[0]}</p>`
  })
  searchWords.innerHTML = str
}

function OnEnlargeBtn(keyword) {
  OnSearch(keyword)
  let txt = document.querySelector(`.${keyword}`)
  let style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
  let currentSize = parseFloat(style);
  if (currentSize > 30) return
  txt.style.fontSize = (currentSize + 2) + 'px';
}

function addMouseListeners() {
  addMouseListeners()
  addTouchListeners()
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
  gSelectedPiece = getClickedText(ev)
  // gStartPos = gSelectedPiece.pos
  gStartPos = { x: ev.offsetX, y: ev.offsetY }
}

function onMove(ev) {
  if (gSelectedPiece === null) return
  for (let i = 0; i < gMeme.lines.length; i++) {
    let line = gMeme.lines[i]
    if (gSelectedPiece != null && line.id === gSelectedPiece.id) {
      line.pos.x = ev.offsetX
      line.pos.y = ev.offsetY
    }
  }
  renderMeme(gMeme.selectedImgId)
  /*fontBoundingBoxAscent(height),measureText(line.txt)*/
}

function onUp() {
  gSelectedPiece = null
}

function getClickedText(loc) {
  for (let i = 0; i < gMeme.lines.length; i++) {
    if (loc.offsetX > gMeme.lines[i].pos.x && loc.offsetX < (gMeme.lines[i].pos.x + gCtx.measureText(gMeme.lines[i].txt).width) &&
      loc.offsetY < gMeme.lines[i].pos.y && loc.offsetY > gMeme.lines[i].pos.y - gMeme.lines[i].size) {
      gCtx.beginPath()
      gCtx.rect(gMeme.lines[i].pos.x-3, gMeme.lines[i].pos.y+7, gCtx.measureText(gMeme.lines[i].txt).width+6, -gMeme.lines[i].size-10);
      gCtx.stroke();
      gMeme.selectedLineIdx = i
      document.querySelector('#textInput').placeholder = gMeme.lines[i].txt
      return gMeme.lines[i]
    }
  }
  return null
}

function getMemesToDisplay() {
  let imgs = gImgs
  if (gSearch) imgs = imgs.filter(img => img.keywords.find(keyword =>{
    if (keyword.toLowerCase().includes(gSearch.toLowerCase())) return keyword
  }))
  return imgs
}

function renderGallery() {
  let imgs = getMemesToDisplay()
  let strHtml = ``
  imgs.forEach(img => {
    strHtml +=
      `
    <img class="galleryImg" src='${img.url}' onclick="onSelectImg(${img.id},drawImgFromRemote)">
    `
  })
  document.querySelector('.galleryContainer').innerHTML = strHtml
}

function addSticker(val) {
  gMeme.lines.push({ id: getRandomId(), txt: val, size: 20, align: 'left', color: 'white', strokeColor: 'black', pos: { x: 100, y: (gElCanvas.height) / 2 } })
  renderMeme(gMeme.selectedImgId)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function OnSearch(val) {
  gSearch = val
  renderGallery()
}

function renderSearchBox() {
  let searchBoxEl = document.querySelector('.searchBox')
  let str = `  <label for="ice-cream-choice">Search category :</label>
  <input list="SearchMemes" id="ice-cream-choice" name="ice-cream-choice" oninput="OnSearch(this.value)">
  <datalist id="SearchMemes">`
  for (const property in gKeywordSearchCountMap) {
    str += `<option value= ${property}>`
  }
  str += `</datalist>
  <button class="flexibleBtn" onclick="onFlexible()">I'm Flexible</button>`
  searchBoxEl.innerHTML = str
}
function renderMeme(imgId) {
  gMeme.selectedImgId = imgId /**updates selected img for reUse in inputText render */
  drawImgFromRemote(imgId)
}

function drawImgFromRemote(imgId) {
  let selectedImg = getMemeById(imgId)
  const img = new Image()
  img.src = selectedImg.url
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    drawText()
  }
}


function drawText(text, x = 100, y = 100) { ///made the function more dynamic
  gMeme.lines.forEach(line => {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = line.strokeColor
    gCtx.fillStyle = line.color
    gCtx.font = `bold ${line.size}px impact-normal`
    gCtx.fillText(line.txt, line.pos.x, line.pos.y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y) // Draws (strokes) a given text at the given (x, y) position.
  });
}

function setLineText(val) {
  /*removed val.line = gMeme.setlineidx*/
  gMeme.lines[gMeme.selectedLineIdx].txt = val.txt
  renderMeme(gMeme.selectedImgId)
}

function setLineColor(val) {
  gMeme.lines[gMeme.selectedLineIdx].color = val
  renderMeme(gMeme.selectedImgId)
}

function onRemoveLine() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)
  renderMeme(gMeme.selectedImgId)
}

function onAddLine() {
  gMeme.lines.push({ id: getRandomId(), txt: 'New Line', size: 30, align: 'left', color: 'white', strokeColor: 'black', pos: { x: 100, y: (gElCanvas.height) / 2 } })
  renderMeme(gMeme.selectedImgId)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function onEnlargeSize() {
  gMeme.lines[gMeme.selectedLineIdx].size += 4
  renderMeme(gMeme.selectedImgId)
}

function onDecreaseSize() {
  gMeme.lines[gMeme.selectedLineIdx].size -= 4
  renderMeme(gMeme.selectedImgId)
}

function onSwitchLine() {
  var firstLinePos = gMeme.lines[0].pos
  var secondLinePos = gMeme.lines[1].pos
  gMeme.lines[0].pos = secondLinePos
  gMeme.lines[1].pos = firstLinePos
  renderMeme(gMeme.selectedImgId)
}
/***********************************FLEXBILE BUTTON FUNCTIONS**************************/

function onFlexible() {
  const randomId = Math.floor(Math.random() * gImgs.length + 1)
  onSelectImg(randomId, 'RandomMeme')
}

function renderRandomMeme(randomId) {
  gMeme.selectedImgId = randomId
  let selectedImg = getMemeById(randomId)
  const img = new Image()
  img.src = selectedImg.url
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    const line1 = getRandomSentence()
    const line2 = getRandomSentence()
    gMeme = {
      selectedImgId: randomId,
      selectedLineIdx: 0,
      lines: [{ id: getRandomId(), txt: line1, size: 20, align: 'left', color: 'white', pos: { x: 20, y: 50 } },
      { id: getRandomId(), txt: line2, size: 20, align: 'left', color: 'red', pos: { x: 20, y: 450 } }]
    }
    drawRanText(line1, 20, 50)
    drawRanText(line2, 20, 450)
  }
}
function drawRanText(text, x, y) {
  gCtx.lineWidth = 1
  gCtx.strokeStyle = getRandomColor()
  gCtx.fillStyle = 'black'
  gCtx.font = `bold 20px impact-normal`
  gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
  gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
  gMeme.lines[0].color[0] === '#' ? gMeme.lines[1].color = gCtx.strokeStyle : gMeme.lines[0].color = gCtx.strokeStyle
}

/*****************************  SAVED MEME GALLERY  *****************************/

function onSaveMeme() {
  let SavedMemes = loadFromStorage('SavedMemes')
  if (!SavedMemes || !SavedMemes.length) {
    SavedMemes = [gMeme]
    saveToStorage('SavedMemes', SavedMemes)
    console.log('was empty')
  } else {
    SavedMemes.push(gMeme)
    saveToStorage('SavedMemes', SavedMemes)
    console.log('pushed something')
  }
}

function renderSavedMemes() {
  let savedMemeEl = document.querySelector('.savedMemesContainer')
  let SavedMemes = loadFromStorage('SavedMemes')
  let str = ''
  for (let i = 0; i < SavedMemes.length; i++) {
    str += `<div>
    <img src="${SavedMemes[i].url}" width=200 height=200  onclick="onRenderSaved(${i})">
    <button onclick="onDeleteSaved(${i})" class="xBtn">X</button>
    </div>`
  }
  savedMemeEl.innerHTML = str
}

function onDeleteSaved(id){
  let SavedMemes = loadFromStorage('SavedMemes')
  SavedMemes.splice(id,1)
  saveToStorage('SavedMemes',SavedMemes)
  OnOpenMemes()
}

function onRenderSaved(id) {
  let SavedMemes = loadFromStorage('SavedMemes')
  let SpecificMeme = SavedMemes[id]
  document.querySelector('.galleryContainer').classList.add('hidden')
  document.querySelector('.editorContainer').classList.remove('hidden')
  document.querySelector('.savedMemesContainer').classList.add('hidden')
  document.querySelector('.searchHeader').classList.add('hidden')
  gMeme = SpecificMeme
  renderMeme(gMeme.selectedImgId)
}

function drawImgFromlocal(canvasId) {
  let CurrCanvas = document.querySelector(`#${canvasId}`)
  let CurrCtx = CurrCanvas.getContext('2d')
  const img = new Image()
  img.src = src
  img.onload = () => {
    CurrCtx.drawImage(img, 0, 0, CurrCanvas.width, CurrCanvas.height) //img,x,y,xEnd,yEnd
  }
}

function OnOpenMemes() {
  document.querySelector('.galleryContainer').classList.add('hidden')
  document.querySelector('.editorContainer').classList.add('hidden')
  document.querySelector('.savedMemesContainer').classList.remove('hidden')
  document.querySelector('.searchHeader').classList.add('hidden')
  renderSavedMemes()
}

