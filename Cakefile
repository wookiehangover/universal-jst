###
  Here's the example Cakefile for jquery-tmpl-jst.
  Feel free to use it anywhere!
###
fs     = require 'fs'
util   = require 'util'
tmpl   = require './lib/index.js'

templatesDir = 'example/templates'
targetDir    = 'example'

task 'watch', 'Watch prod source files and build changes', ->
  invoke 'build'
  util.log "Watching for changes in #{templatesDir}"
  templates = fs.readdirSync(templatesDir)

  for file in templates then do (file) ->
    fs.watchFile "#{templatesDir}/#{file}", (curr, prev) ->
      if +curr.mtime isnt +prev.mtime
        util.log "Saw change in #{templatesDir}/#{file}"
        invoke 'build'

task 'build', 'Pre compile jQuery Templates', ->
  tmpl.build templatesDir, ( data ) ->
    tmpl.process( data, targetDir )

handleError = (error) -> 
    util.log error
    displayNotification error
###
  End Sample Cakefile
###







###
  This is used to concat a custom build of the jquery-tmpl submodule,
  and its output is committed
###
task 'build:dev', 'adds common js module support to jquery-tmpl', ->
  files = ["lib/head.js", "vendor/jquery-tmpl/jquery.tmpl.js"]
  data = []

  for file, index in files then do (file, index)->

    fs.readFile file, 'utf8', (err, fileContents) ->
      handleError(err) if err
      data[index] = fileContents

      process( data.join('') ) if index is files.length - 1

  process = ( data ) ->
    fs.writeFile "lib/jquery.tmpl.js", data, 'utf8', (err) ->
      handleError(err) if err
      util.log "lib/jquery.tmpl.js written"

