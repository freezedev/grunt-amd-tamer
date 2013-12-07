do (window) ->
  window.a or= {}
  window.a.test = -> 'test'


do (root) ->
	define('a', -> root.a.test )
b = ->
  message: '''No IIFE, but that's ok, it's CoffeeScript'''
  b: 5
  c:
    d: null
    e: {}


do (root) ->
	define('b', ['a'], -> root.b )