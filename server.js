'use strict'
const express = require('express')
const Slapp = require('slapp')
const BeepBoopConvoStore = require('slapp-convo-beepboop')
if (!process.env.PORT) throw Error('PORT missing but required')

var slapp = Slapp({
  debug: true,
  record: 'out.jsonl',
  convo_store: BeepBoopConvoStore({ debug: true }),
  error: (err) => { console.error('Error: ', err) }
})

require('./flows')(slapp)
var app = slapp.attachToExpress(express())

app.get('/', function (req, res) {
  res.send('Hello')
})

console.log('Listening on :' + process.env.PORT)
app.listen(process.env.PORT)
