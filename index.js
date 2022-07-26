const axios = require('axios').default
const fs = require('fs')
const { resolve } = require('path')
const imgTemp = '<br/><img class="img-fluid" src="'

const url = (id) => {
return("https://xkcd.com/"+id+"/info.0.json")}

let data
let table = []
let pics = []

try {
    data = fs.readFileSync('./numbers.txt', 'utf8')
    table=data.split("\r\n")
    console.log(table)
} catch (error) {
    data = 'Error'
    console.log('Data error')
}

async function getPic(ur) {
  try {
    const response = await axios.get(ur);
    const dane = response.data.img
    pics.push(dane)
    fs.appendFile('pictures.html', imgTemp+dane+'">', function (err) {
      if (err)  throw err;
          console.log('Saved!');
    });
  } catch (error) {
    console.error(error);
  }
}

const getPictures = () => {
    table.forEach(async (el) => {
      const link = url(el)
      await getPic(link)
    })
}

const webBegin = () => {
    fs.writeFile('pictures.html', '<!DOCTYPE html>\n<html>\n<head>\n<link rel="stylesheet" href="styles.css">\n<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet">\n<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"></script>\n</head>\n<body>\n  <div class="container">\n<div class="row">', (err) => {
      if (err) throw err;
      console.log('Begin');
    });
}

// const webEnd  = () => {
//     fs.appendFile('pictures.html', "\n</div>\n</div>\n</body>\n</html>", (err) => {
//       if (err) throw err;
//       console.log('End');
//       resolve()
//     });
// }

async function doIt (){
  await webBegin()
  await getPictures()
  // await webEnd()

}

doIt()
