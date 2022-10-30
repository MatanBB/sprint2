'use strict'
var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [{ txt: 'I sometimes eat Falafel', size: 20, align: 'left', color: 'white', strokeColor: 'black', pos: { x: 100, y: 50 } },
  { txt: 'I want to go out swimming', size: 20, align: 'left', color: 'white', strokeColor: 'black', pos: { x: 100, y: 450 } }],
}
var gImgs = [{
  id: 1, url: "Instructions/meme-imgs (square)/1.jpg", keywords: ['funny', 'trump', 'crazy'], lines: { one: 'take my finger', two: 'and vote it for me' }
},
{ id: 2, url: "Instructions/meme-imgs (square)/2.jpg", keywords: ['dogs', 'cute'], lines: { one: 'We are just two cute', two: 'Little puppy dogs' } },
{ id: 3, url: "Instructions/meme-imgs (square)/3.jpg", keywords: ['dogs', 'cute', 'baby'], lines: { one: 'Am i the baby', two: 'Or the dog' } },
{ id: 4, url: "Instructions/meme-imgs (square)/4.jpg", keywords: ['dogs', 'cute', 'cats'], lines: { one: 'I like to sleep', two: 'and when i do, i wake up' } },
{ id: 5, url: "Instructions/meme-imgs (square)/5.jpg", keywords: ['cute', 'baby'], lines: { one: 'I always win', two: 'All i need is my milk bottle' } },
{ id: 6, url: "Instructions/meme-imgs (square)/6.jpg", keywords: ['crazy', 'akward'], lines: { one: 'one does not always', two: 'look for aliens' } },
{ id: 7, url: "Instructions/meme-imgs (square)/7.jpg", keywords: ['cute', 'baby'], lines: { one: 'Im not suprised', two: 'I am stunned' } },
{ id: 8, url: "Instructions/meme-imgs (square)/8.jpg", keywords: ['crazy', 'man', 'actors  '], lines: { one: 'You like debugging?', two: 'Please tell me more' } },
{ id: 9, url: "Instructions/meme-imgs (square)/9.jpg", keywords: ['baby', 'cute'], lines: { one: 'So my laugh is evil', two: 'And i like henry cavil' } },
{ id: 10, url: "Instructions/meme-imgs (square)/10.jpg", keywords: ['laugh', 'cute'], lines: { one: 'Let me be clear', two: 'Coding is good and nothing to hear' } },
{ id: 11, url: "Instructions/meme-imgs (square)/11.jpg", keywords: ['man'], lines: { one: 'This pic does not', two: 'Deserve a description' } },
{ id: 12, url: "Instructions/meme-imgs (square)/12.jpg", keywords: ['tv', 'actors'], lines: { one: 'What would you do if', two: 'You were given weekend project' } },
{ id: 13, url: "Instructions/meme-imgs (square)/13.jpg", keywords: ['tv', 'actors'], lines: { one: 'Raise a toast', two: 'To this hoax' } },
{ id: 14, url: "Instructions/meme-imgs (square)/14.jpg", keywords: ['tv', 'actors'], lines: { one: 'My worst fear is', two: 'Recursion' } },
{ id: 15, url: "Instructions/meme-imgs (square)/15.jpg", keywords: ['tv', 'man'], lines: { one: 'One does not simply', two: 'Write in jQuery' } },];

function getMemeById(id) {
  let varMeme = gImgs.find(img => {
    if (img.id === id) return img
  })
  return varMeme
}

function categoryMaps() {
  const result = gImgs.reduce((acc, { keywords }) =>
    keywords.reduce((acc, name) => {
      acc[name] = (acc[name] ?? 0) + 1
      return acc
    }, acc)
    , {})

  return result
}
