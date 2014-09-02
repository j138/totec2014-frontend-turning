PASHALIST=window.PASHALIST=window.PASHALIST||{}

class Supports
	@isCanvasSupported_=do ()->
		elm=document.createElement('canvas')
		return !!(elm.getContext && elm.getContext('2d'))

class Vector2DUtil

	@cubicBezierToQuadraticBezier:(a1x,a1y,c1x,c1y,c2x,c2y,a2x,a2y,precision,result)->

		[p1x,p1y]=@getCubicBezierPoint(a1x,a1y,c1x,c1y,c2x,c2y,a2x,a2y,0.5)

		[p2x,p2y]=@getCorssPoint(a1x,a1y,c1x,c1y,c2x,c2y,a2x,a2y)

		[p3x,p3y]=@getQuadraticBezierPoint(a1x,a1y,p2x,p2y,a2x,a2y,0.5)

		distance=@getDistance(p1x,p1y,p3x,p3y)

		if distance<=precision
			result.push [a1x,a1y,p2x,p2y,a2x,a2y]
		else
			splited=@split(a1x,a1y,c1x,c1y,c2x,c2y,a2x,a2y,0.5)
			@cubicBezierToQuadraticBezier(splited[0],splited[1],splited[2],splited[3],splited[4],splited[5],splited[6],splited[7],precision,result)
			@cubicBezierToQuadraticBezier(splited[8],splited[9],splited[10],splited[11],splited[12],splited[13],splited[14],splited[15],precision,result)

	@getQuadraticBezierPoint:(a1x,a1y,cx,cy,a2x,a2y,t)->
		tp = 1 - t
		x = t*t*a2x + 2*t*tp*cx + tp*tp*a1x
		y = t*t*a2y + 2*t*tp*cy + tp*tp*a1y
		return [x,y]

	@interpolate:(p1x,p1y,p2x,p2y,t)->
		return [
			p1x+(p2x-p1x)*t,
			p1y+(p2y-p1y)*t
		]

	@getCubicBezierPoint:(a1x,a1y,c1x,c1y,c2x,c2y,a2x,a2y,t)->
		tp = 1.0 - t;
		return [
			a1x*tp*tp*tp + 3*c1x*t*tp*tp + 3*c2x*t*t*tp + a2x*t*t*t,
			a1y*tp*tp*tp + 3*c1y*t*tp*tp + 3*c2y*t*t*tp + a2y*t*t*t
		]

	@getCorssPoint:(x1,y1,x2,y2,x3,y3,x4,y4)->
		ksi = (y4 - y3) * (x4 - x1) - (x4 - x3) * (y4 - y1)
		delta = (x2 - x1) * (y4 - y3) - (y2 - y1) * (x4 - x3)

		ramda = ksi / delta

		x = x1 + ramda * (x2 - x1)
		y = y1 + ramda * (y2 - y1)
		return [x,y]

	@getDistance:(p1x,p1y,p2x,p2y)->
		dx=p1x-p2x
		dy=p1y-p2y
		Math.sqrt(dx*dx+dy*dy)

	@split:(a1x,a1y,c1x,c1y,c2x,c2y,a2x,a2y,t)->
		[tpx,tpy] = @getCubicBezierPoint(a1x,a1y,c1x,c1y,c2x,c2y,a2x,a2y,t);

		[mx,my] = @interpolate( c2x,c2y, c1x,c1y, t);

		[ac0x,ac0y] = @interpolate( c1x,c1y, a1x,a1y, t);
		[ac1x,ac1y] = @interpolate( mx,my, ac0x,ac0y, t);

		[bc1x,bc1y] = @interpolate( a2x,a2y, c2x,c2y, t);
		[bc0x,bc0y] = @interpolate( bc1x,bc1y, mx,my, t);

		return [
			a1x,a1y,ac0x,ac0y,ac1x,ac1y,tpx,tpy
			tpx,tpy,bc0x,bc0y,bc1x,bc1y,a2x,a2y
		]

getPointsOfIntersectionWithLineAndCircle=(aX,aY,bX,bY,cX,cY,r)->

	a = bY - aY
	b = aX - bX
	c = -( a*aX + b*aY )

	l = Math.sqrt((bX-aX)*(bX-aX)+(bY-aY)*(bY-aY))

	eX = (bX - aX) / l
	eY = (bY - aY) / l

	vX = -eY
	vY = eX

	k = - (a*cX + b*cY + c)/(a*vX+b*vY)

	pX = cX + k*vX
	pY = cY + k*vY

	if r<k
		return false
	else
		S = Math.sqrt( r*r - k*k )

		x1 = pX + S*eX
		y1 = pY + S*eY
		x2 = pX - S*eX
		y2 = pY - S*eY

		return [x1,y1,x2,y2]

# ルーター。
class AppRouter extends Backbone.Router

	# routes でルーターのメソッドと URL パターンをマッピングする。
	# ルーターのメソッドがリクエストハンドラになる。
	routes:
		"entry/:id": "show"
		"entry/": "list"
		"": "list"

	list: ->
		window.App.render()
		return

	show: (id) ->
		window.App.showDetail id
		return

class EventDispatcher
	_.extend @::,Backbone.Events
	trigger:(type,data)->
		eventObj=
			target:@
			data:data
		super type,eventObj

class IndexPageView extends Backbone.View
	constructor:->

class AbstractListView extends Backbone.View
	constructor:->

class SponsorshipListView extends Backbone.View
	initialize:(options)->
		return
	tagName:'ul'
	className:'SponsorshipList'
	render:->
		return

class SponsorshipListItemView extends Backbone.View
	tagName:'li'
	className:'SponsorshipListItem'
	events:
		'click':'click'
		'click .name':'clickName'
		'click .category':'clickCategory'
	click:(event)->
		@$el.appendTo(event.target.name)
		return
	clickName:(event)->
		@$el.appendTo(event.target.name)
		return
	clickCategory:(event)->
		@$el.appendTo(event.target.name)
		return
	render:->
		return

class Sponsorsip extends Backbone.Model
	defaults:
		href:'#'
		fileName:'noimage.jpg'
		altText:'No Image.'
	initialize:(attrs,options)->
		return
	validate:(attrs)->
		return
	parse:(responase)->
		response.datetime = new Date response.datetime
		return response.data

class SponsorshipCollection extends Backbone.Collection
	model:Sponsorsip

class MainView extends createjs.Shape
	constructor:->
		return

class FadeOut
	constructor:(target,duration=null,delay=null,onComplete=null)->
		if !target then return
		if !onComplete then onComplete=()->

		if $.support.opacity
			$(target).stop().delay(delay).fadeOut(duration,onComplete)
		else
			$(target).hide()
			onComplete()

class FadeIn
	constructor:(target,duration=null,delay=null)->
		if !target then return

		if $.support.opacity
			$(target).stop().delay(delay).fadeIn(duration)
		else
			$(target).show()

class GlobalNavi
	@WIDTH:722
	@HEIGHT:43
	@MARGIN_TOP:24
	@SPRING= 0.3
	@instance:null
	constructor:()->
		GlobalNavi.instance=@

		@_$dom=$('#GlobalNavi')
		.hide()
		.css({
					position:'fixed'
					zIndex:ZINDEX_FRONT
				})

		$('#GlobalNavi').hover(@_over,@_out)

		@buttons=new RolloverFadeButtonCollection([
			new RolloverFadeButton('#GlobalNavi .information')
			new RolloverFadeButton('#GlobalNavi .collection')
			new RolloverFadeButton('#GlobalNavi .works')
			new RolloverFadeButton('#GlobalNavi .about')
			new RolloverFadeButton('#GlobalNavi .map')
		])
		new RolloverFadeButton('#GlobalNavi .logo')

		new FadeOut(@_$dom,0)

		$('#GlobalNavi a').click(@_onClick)
		$(window).on('resize',@_onResize)
		@_onResize()
	_over:()=>
		@_isOver=true

	_out:()=>
		@_isOver=false
	_onResize:()=>
		r=SikakuLargeUtil.rect
		@_$dom.css({
			left:r.left+r.width/2-GlobalNavi.WIDTH/2
			top: r.bottom+26
		})
	_onMouseMove:()=>
		if @_timeoutId then clearTimeout(@_timeoutId)
		if @_isOver then return
		$('#GlobalNavi a:not(.logo):not(:animated)').stop(true,false).animate({opacity:1},DURATION)
		@_timeoutId=setTimeout(()->
			$('#GlobalNavi a:not(.logo)').stop(true,false).animate({opacity:0},DURATION)
		,NAVIGATION_HIDE_TIME)
	show:()->
		that=@
		if UAManager.career==UAManager.IE7
			new FadeIn(that._$dom,300)
			return
		@_queue=new createjs.LoadQueue()
		@_queue.setMaxConnections(5)
		@_$dom.find('img').each(()->
			that._queue.loadFile($(this).attr('src'))
		)
		@_queue.load()
		@_queue.addEventListener('complete',()->
			that._queue.close()
			that._queue.removeAllEventListeners()
			that._queue.removeAll()
			new FadeIn(that._$dom,300)
			if UAManager.type!=UAManager.TABLET && UAManager.type!=UAManager.MOBILE && $.support.opacity
				$win.mousemove(that._onMouseMove)
				that._onMouseMove()
		)
	_onClick:(event)=>
		event.preventDefault()
		StateManager.getInstance().change($(event.currentTarget).attr('href'))
	close:()->
		clearTimeout(@_timeoutId)
		$win.off('mousemove',@_onMouseMove)
		$doc.off('touchstart',@_onMouseMove)
		targets=$('#GlobalNavi a:not(.logo),#GlobalNavi a:not(.logo) img')
		targets.css({pointerEvents:'none'}).stop()

		new OpacityAnimator(targets,0,DURATION)

		@buttons.off()

	open:()->
		targets=$('#GlobalNavi a:not(.logo), #GlobalNavi a:not(.logo) img')
		targets.css({pointerEvents:'auto'}).stop()

		new OpacityAnimator(targets,0.5,DURATION)

		if UAManager.type!=UAManager.TABLET && UAManager.type!=UAManager.MOBILE && $.support.opacity
			$win.mousemove(@_onMouseMove)

		@buttons.on()

class NullView
	show:(callback=()->)->
		callback()
	hide:(callback=()->)->
		callback()

class OpacityAnimator
	constructor:(target,value,duration)->
		@_$target=$(target)
		@_value=value
		@_duration=duration
		@_render()
	_render:()->
		if $.support.opacity
			@_$target.stop().animate({opacity:@_value},@_duration)
		else
			new OpacityMapper(@_$target,@_value)

class OpacityCSSer
	constructor:(target,value)->
		@_$target=$(target)
		@_value=value
		@_render()
	_render:()->
		if $.support.opacity
			@_$target.css({opacity:@_value})
		else
			new OpacityMapper(@_$target,@_value)

class OpacityMapper
	constructor:(target,value)->
		@_$target=$(target)
		@_value=value
		@_render()
	_render:->
		if @_value==0
			@_$target.css('visibility','hidden')
		else
			@_$target.css('visibility','visible')

class RolloverFadeButton
	constructor:(@_elm)->
		@_$elm=$(@_elm)
		@_$img=@_$elm.find('img')

		new OpacityCSSer(@_$img,0.5)

		@_href=@_$elm.attr('href')

		@on()
	on:()->
		@_$elm.hover(@_in,@_out)
		@_$elm.attr('href',@_href)
	off:()->
		@_$elm.off('mouseenter',@_in)
		@_$elm.off('mouseleave',@_out)
		@_$elm.removeAttr('href')
	_in:()=>
		new OpacityAnimator(@_$img,1,DURATION)
	_out:()=>
		new OpacityAnimator(@_$img,0.5,DURATION)
	dispose:()->
		@off()

class RolloverFadeButtonCollection
	constructor:(@_elements)->
	on:()->
		for i in @_elements
			i.on()

	off:()->
		for i in @_elements
			i.off()

paper.install window
onload = ->
	canvas = document.getElementById("canvas")
	paper.setup "canvas"
	path = new Path.Rectangle([
		100
		100
		120
		80
	])
	path.fillColor = "blue"
	path.smooth()
	num = []
	i = 0
	while i < path.segments.length * 2
		num[i] = Math.random() * 3 + 3
		i++
	path2 = path.clone()
	path2.position.x += 200
	text = new PointText(
		point: path.position
		fillColor: "white"
		content: "リンク"
		justification: "center"
		fontSize: 30
	)
	text.position.y += 10
	text2 = text.clone()
	text2.position.x += 200
	text2.content = "ボタン"
	view.onResize = (event) ->
		path.position = view.center
		return

	c = project.activeLayer.children
	view.onFrame = (event) ->
		b = path.segments.length
		i = 0
		while i < b
			path.segments[i].point.y += Math.cos(event.count / num[i])
			i++
		return

	tool.onMouseMove = (event) ->
		project.activeLayer.children[0].fillColor = "blue"
		project.activeLayer.children[1].fillColor = "blue"
		event.item.fillColor = "red"  if event.item.type is "path"
		return

	tool.onMouseUp = (event) ->
		if event.item.index % 2 is 0
			location.href = "http://google.com"
		else
			location.href = "http://yohawing.com"
		return

	return

class Main extends EventDispatcher
	constructor:->

		#
		$("#modal").modal()
		$("#modal").modal keyboard: false
		$("#modal").modal "show"

		Templates = PASHALIST.Templates
		JSONs = PASHALIST.JSONs

		do ->
			$.getJSON JSONs.sponsorship
			.done (res)->
				tmpl = _.template(Templates.sponsorship)
				_.each res, (data)->
					html = tmpl(data)
					$('section.Sponsorship ul').append html
					return
				return

		do ->
			$.getJSON JSONs.onlineshopitem
			.done (res)->
				tmpl = _.template(Templates.onlineshopitem)
				_.each res, (data)->
					data.price = _.string.numberFormat Number(data.price),2
					html = tmpl(data)
					$('section.Onlineshop ul').append html
					return
				$ 'section.Onlineshop ul li'
				.heightLine()
				return

		do ->
			$.getJSON JSONs.pashalist
			.done (res)->
				tmpl = _.template(Templates.pashalist)
				_.each res, (data)->
					data.favorites = _.string.numberFormat Number(data.favorites)
					html = tmpl(data)
					$('section.Pashalist .others ul').append html
					return
				$ 'section.Pashalist .others ul li .summary'
				.ellipsis {
						lines: 2
					}
				return

		do ->
			$.getJSON JSONs.top5pashalist
			.done (res)->
				tmpl = _.template(Templates.top5pashalist)
				_.each res, (data)->
					data.favorites = _.string.numberFormat Number(data.favorites)
					data.photos = _.string.numberFormat Number(data.photos)
					html = tmpl(data)
					$('section.Pashalist .top5 ul').append html
					return
				$ 'section.Pashalist .top5 ul li .summary'
				.ellipsis {
					lines: 2
				}

				$("#maximage").maximage
					isBackground: true
					overflow: "auto"
					verticalAlign: "top"
				return

		do ->
			$.getJSON JSONs.freePhoto
			.done (res)->
				tmpl = _.template(Templates.freePhoto)
				_.each res, (data)->
					html = tmpl(data)
					$('section.Photos .grid').append html
					return
				$imgs = $('section.Photos .grid img')
				len = $imgs.length
				cnt = 0
				$imgs.on 'load', ->
					cnt++
					if cnt == len
						$ 'section.Photos .grid'
						.masonry {
								itemSelector: '.gridItem'
							}
					return

				#
				$(".div1077").imgLiquid fill: false
				return

		do ->
			$.getJSON JSONs.featured
			.done (res)->
					tmpl = _.template(Templates.featured)
					_.each res, (data)->
						html = tmpl(data)
						$ 'section.Featured ul'
						.append html
						return
					$ 'section.Featured .slides ul'
					.bxSlider()
					return

		$ '.PageTop a'
		.SmoothScroll({
				duration : 'miedum'
				easing : 'linear'
			})

		return

	#
	$.localScroll.defaults.axis = "xy"
	$.localScroll
		target: "#myContent" # could be a selector or a jQuery object too.
		queue: true
		duration: 1000
		hash: true
		onBefore: (e, anchor, $target) ->
		onAfter: (anchor, settings) ->

	do ->
		$('#picture li a').stop().scrollTo
			top: "-=100px"
			left: "+=100"
		, 500
		$('#picture li a').stop().scrollTo
			top: "110px"
			left: "290px"
		, 800


$ ->
	new Main()