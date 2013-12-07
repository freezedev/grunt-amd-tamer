do (window) ->
  window.a or= {}
  window.a.test = -> 'test'


define('a', ->  )
b = ->
  message: '''No IIFE, but that's ok, it's CoffeeScript'''
  b: 5
  c:
    d: null
    e: {}


define('b', ->  )