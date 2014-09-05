// Generated by CoffeeScript 1.8.0
(function() {
  var AbstractListView, AppRouter, EventDispatcher, FadeIn, FadeOut, GlobalNavi, IndexPageView, Main, MainView, NullView, OpacityAnimator, OpacityCSSer, OpacityMapper, PASHALIST, RolloverFadeButton, RolloverFadeButtonCollection, SponsorshipCollection, SponsorshipListItemView, SponsorshipListView, Sponsorsip, Supports, Vector2DUtil, getPointsOfIntersectionWithLineAndCircle, onload,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  PASHALIST = window.PASHALIST = window.PASHALIST || {};

  Supports = (function() {
    function Supports() {}

    Supports.isCanvasSupported_ = (function() {
      var elm;
      elm = document.createElement('canvas');
      return !!(elm.getContext && elm.getContext('2d'));
    })();

    return Supports;

  })();

  Vector2DUtil = (function() {
    function Vector2DUtil() {}

    Vector2DUtil.cubicBezierToQuadraticBezier = function(a1x, a1y, c1x, c1y, c2x, c2y, a2x, a2y, precision, result) {
      var distance, p1x, p1y, p2x, p2y, p3x, p3y, splited, _ref, _ref1, _ref2;
      _ref = this.getCubicBezierPoint(a1x, a1y, c1x, c1y, c2x, c2y, a2x, a2y, 0.5), p1x = _ref[0], p1y = _ref[1];
      _ref1 = this.getCorssPoint(a1x, a1y, c1x, c1y, c2x, c2y, a2x, a2y), p2x = _ref1[0], p2y = _ref1[1];
      _ref2 = this.getQuadraticBezierPoint(a1x, a1y, p2x, p2y, a2x, a2y, 0.5), p3x = _ref2[0], p3y = _ref2[1];
      distance = this.getDistance(p1x, p1y, p3x, p3y);
      if (distance <= precision) {
        return result.push([a1x, a1y, p2x, p2y, a2x, a2y]);
      } else {
        splited = this.split(a1x, a1y, c1x, c1y, c2x, c2y, a2x, a2y, 0.5);
        this.cubicBezierToQuadraticBezier(splited[0], splited[1], splited[2], splited[3], splited[4], splited[5], splited[6], splited[7], precision, result);
        return this.cubicBezierToQuadraticBezier(splited[8], splited[9], splited[10], splited[11], splited[12], splited[13], splited[14], splited[15], precision, result);
      }
    };

    Vector2DUtil.getQuadraticBezierPoint = function(a1x, a1y, cx, cy, a2x, a2y, t) {
      var tp, x, y;
      tp = 1 - t;
      x = t * t * a2x + 2 * t * tp * cx + tp * tp * a1x;
      y = t * t * a2y + 2 * t * tp * cy + tp * tp * a1y;
      return [x, y];
    };

    Vector2DUtil.interpolate = function(p1x, p1y, p2x, p2y, t) {
      return [p1x + (p2x - p1x) * t, p1y + (p2y - p1y) * t];
    };

    Vector2DUtil.getCubicBezierPoint = function(a1x, a1y, c1x, c1y, c2x, c2y, a2x, a2y, t) {
      var tp;
      tp = 1.0 - t;
      return [a1x * tp * tp * tp + 3 * c1x * t * tp * tp + 3 * c2x * t * t * tp + a2x * t * t * t, a1y * tp * tp * tp + 3 * c1y * t * tp * tp + 3 * c2y * t * t * tp + a2y * t * t * t];
    };

    Vector2DUtil.getCorssPoint = function(x1, y1, x2, y2, x3, y3, x4, y4) {
      var delta, ksi, ramda, x, y;
      ksi = (y4 - y3) * (x4 - x1) - (x4 - x3) * (y4 - y1);
      delta = (x2 - x1) * (y4 - y3) - (y2 - y1) * (x4 - x3);
      ramda = ksi / delta;
      x = x1 + ramda * (x2 - x1);
      y = y1 + ramda * (y2 - y1);
      return [x, y];
    };

    Vector2DUtil.getDistance = function(p1x, p1y, p2x, p2y) {
      var dx, dy;
      dx = p1x - p2x;
      dy = p1y - p2y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    Vector2DUtil.split = function(a1x, a1y, c1x, c1y, c2x, c2y, a2x, a2y, t) {
      var ac0x, ac0y, ac1x, ac1y, bc0x, bc0y, bc1x, bc1y, mx, my, tpx, tpy, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
      _ref = this.getCubicBezierPoint(a1x, a1y, c1x, c1y, c2x, c2y, a2x, a2y, t), tpx = _ref[0], tpy = _ref[1];
      _ref1 = this.interpolate(c2x, c2y, c1x, c1y, t), mx = _ref1[0], my = _ref1[1];
      _ref2 = this.interpolate(c1x, c1y, a1x, a1y, t), ac0x = _ref2[0], ac0y = _ref2[1];
      _ref3 = this.interpolate(mx, my, ac0x, ac0y, t), ac1x = _ref3[0], ac1y = _ref3[1];
      _ref4 = this.interpolate(a2x, a2y, c2x, c2y, t), bc1x = _ref4[0], bc1y = _ref4[1];
      _ref5 = this.interpolate(bc1x, bc1y, mx, my, t), bc0x = _ref5[0], bc0y = _ref5[1];
      return [a1x, a1y, ac0x, ac0y, ac1x, ac1y, tpx, tpy, tpx, tpy, bc0x, bc0y, bc1x, bc1y, a2x, a2y];
    };

    return Vector2DUtil;

  })();

  getPointsOfIntersectionWithLineAndCircle = function(aX, aY, bX, bY, cX, cY, r) {
    var S, a, b, c, eX, eY, k, l, pX, pY, vX, vY, x1, x2, y1, y2;
    a = bY - aY;
    b = aX - bX;
    c = -(a * aX + b * aY);
    l = Math.sqrt((bX - aX) * (bX - aX) + (bY - aY) * (bY - aY));
    eX = (bX - aX) / l;
    eY = (bY - aY) / l;
    vX = -eY;
    vY = eX;
    k = -(a * cX + b * cY + c) / (a * vX + b * vY);
    pX = cX + k * vX;
    pY = cY + k * vY;
    if (r < k) {
      return false;
    } else {
      S = Math.sqrt(r * r - k * k);
      x1 = pX + S * eX;
      y1 = pY + S * eY;
      x2 = pX - S * eX;
      y2 = pY - S * eY;
      return [x1, y1, x2, y2];
    }
  };

  AppRouter = (function(_super) {
    __extends(AppRouter, _super);

    function AppRouter() {
      return AppRouter.__super__.constructor.apply(this, arguments);
    }

    AppRouter.prototype.routes = {
      "entry/:id": "show",
      "entry/": "list",
      "": "list"
    };

    AppRouter.prototype.list = function() {
      window.App.render();
    };

    AppRouter.prototype.show = function(id) {
      window.App.showDetail(id);
    };

    return AppRouter;

  })(Backbone.Router);

  EventDispatcher = (function() {
    function EventDispatcher() {}

    _.extend(EventDispatcher.prototype, Backbone.Events);

    EventDispatcher.prototype.trigger = function(type, data) {
      var eventObj;
      eventObj = {
        target: this,
        data: data
      };
      return EventDispatcher.__super__.trigger.call(this, type, eventObj);
    };

    return EventDispatcher;

  })();

  IndexPageView = (function(_super) {
    __extends(IndexPageView, _super);

    function IndexPageView() {}

    return IndexPageView;

  })(Backbone.View);

  AbstractListView = (function(_super) {
    __extends(AbstractListView, _super);

    function AbstractListView() {}

    return AbstractListView;

  })(Backbone.View);

  SponsorshipListView = (function(_super) {
    __extends(SponsorshipListView, _super);

    function SponsorshipListView() {
      return SponsorshipListView.__super__.constructor.apply(this, arguments);
    }

    SponsorshipListView.prototype.initialize = function(options) {};

    SponsorshipListView.prototype.tagName = 'ul';

    SponsorshipListView.prototype.className = 'SponsorshipList';

    SponsorshipListView.prototype.render = function() {};

    return SponsorshipListView;

  })(Backbone.View);

  SponsorshipListItemView = (function(_super) {
    __extends(SponsorshipListItemView, _super);

    function SponsorshipListItemView() {
      return SponsorshipListItemView.__super__.constructor.apply(this, arguments);
    }

    SponsorshipListItemView.prototype.tagName = 'li';

    SponsorshipListItemView.prototype.className = 'SponsorshipListItem';

    SponsorshipListItemView.prototype.events = {
      'click': 'click',
      'click .name': 'clickName',
      'click .category': 'clickCategory'
    };

    SponsorshipListItemView.prototype.click = function(event) {
      this.$el.appendTo(event.target.name);
    };

    SponsorshipListItemView.prototype.clickName = function(event) {
      this.$el.appendTo(event.target.name);
    };

    SponsorshipListItemView.prototype.clickCategory = function(event) {
      this.$el.appendTo(event.target.name);
    };

    SponsorshipListItemView.prototype.render = function() {};

    return SponsorshipListItemView;

  })(Backbone.View);

  Sponsorsip = (function(_super) {
    __extends(Sponsorsip, _super);

    function Sponsorsip() {
      return Sponsorsip.__super__.constructor.apply(this, arguments);
    }

    Sponsorsip.prototype.defaults = {
      href: '#',
      fileName: 'noimage.jpg',
      altText: 'No Image.'
    };

    Sponsorsip.prototype.initialize = function(attrs, options) {};

    Sponsorsip.prototype.validate = function(attrs) {};

    Sponsorsip.prototype.parse = function(responase) {
      response.datetime = new Date(response.datetime);
      return response.data;
    };

    return Sponsorsip;

  })(Backbone.Model);

  SponsorshipCollection = (function(_super) {
    __extends(SponsorshipCollection, _super);

    function SponsorshipCollection() {
      return SponsorshipCollection.__super__.constructor.apply(this, arguments);
    }

    SponsorshipCollection.prototype.model = Sponsorsip;

    return SponsorshipCollection;

  })(Backbone.Collection);

  MainView = (function(_super) {
    __extends(MainView, _super);

    function MainView() {
      return;
    }

    return MainView;

  })(createjs.Shape);

  FadeOut = (function() {
    function FadeOut(target, duration, delay, onComplete) {
      if (duration == null) {
        duration = null;
      }
      if (delay == null) {
        delay = null;
      }
      if (onComplete == null) {
        onComplete = null;
      }
      if (!target) {
        return;
      }
      if (!onComplete) {
        onComplete = function() {};
      }
      if ($.support.opacity) {
        $(target).stop().delay(delay).fadeOut(duration, onComplete);
      } else {
        $(target).hide();
        onComplete();
      }
    }

    return FadeOut;

  })();

  FadeIn = (function() {
    function FadeIn(target, duration, delay) {
      if (duration == null) {
        duration = null;
      }
      if (delay == null) {
        delay = null;
      }
      if (!target) {
        return;
      }
      if ($.support.opacity) {
        $(target).stop().delay(delay).fadeIn(duration);
      } else {
        $(target).show();
      }
    }

    return FadeIn;

  })();

  GlobalNavi = (function() {
    GlobalNavi.WIDTH = 722;

    GlobalNavi.HEIGHT = 43;

    GlobalNavi.MARGIN_TOP = 24;

    GlobalNavi.SPRING = 0.3;

    GlobalNavi.instance = null;

    function GlobalNavi() {
      this._onClick = __bind(this._onClick, this);
      this._onMouseMove = __bind(this._onMouseMove, this);
      this._onResize = __bind(this._onResize, this);
      this._out = __bind(this._out, this);
      this._over = __bind(this._over, this);
      GlobalNavi.instance = this;
      this._$dom = $('#GlobalNavi').hide().css({
        position: 'fixed',
        zIndex: ZINDEX_FRONT
      });
      $('#GlobalNavi').hover(this._over, this._out);
      this.buttons = new RolloverFadeButtonCollection([new RolloverFadeButton('#GlobalNavi .information'), new RolloverFadeButton('#GlobalNavi .collection'), new RolloverFadeButton('#GlobalNavi .works'), new RolloverFadeButton('#GlobalNavi .about'), new RolloverFadeButton('#GlobalNavi .map')]);
      new RolloverFadeButton('#GlobalNavi .logo');
      new FadeOut(this._$dom, 0);
      $('#GlobalNavi a').click(this._onClick);
      $(window).on('resize', this._onResize);
      this._onResize();
    }

    GlobalNavi.prototype._over = function() {
      return this._isOver = true;
    };

    GlobalNavi.prototype._out = function() {
      return this._isOver = false;
    };

    GlobalNavi.prototype._onResize = function() {
      var r;
      r = SikakuLargeUtil.rect;
      return this._$dom.css({
        left: r.left + r.width / 2 - GlobalNavi.WIDTH / 2,
        top: r.bottom + 26
      });
    };

    GlobalNavi.prototype._onMouseMove = function() {
      if (this._timeoutId) {
        clearTimeout(this._timeoutId);
      }
      if (this._isOver) {
        return;
      }
      $('#GlobalNavi a:not(.logo):not(:animated)').stop(true, false).animate({
        opacity: 1
      }, DURATION);
      return this._timeoutId = setTimeout(function() {
        return $('#GlobalNavi a:not(.logo)').stop(true, false).animate({
          opacity: 0
        }, DURATION);
      }, NAVIGATION_HIDE_TIME);
    };

    GlobalNavi.prototype.show = function() {
      var that;
      that = this;
      if (UAManager.career === UAManager.IE7) {
        new FadeIn(that._$dom, 300);
        return;
      }
      this._queue = new createjs.LoadQueue();
      this._queue.setMaxConnections(5);
      this._$dom.find('img').each(function() {
        return that._queue.loadFile($(this).attr('src'));
      });
      this._queue.load();
      return this._queue.addEventListener('complete', function() {
        that._queue.close();
        that._queue.removeAllEventListeners();
        that._queue.removeAll();
        new FadeIn(that._$dom, 300);
        if (UAManager.type !== UAManager.TABLET && UAManager.type !== UAManager.MOBILE && $.support.opacity) {
          $win.mousemove(that._onMouseMove);
          return that._onMouseMove();
        }
      });
    };

    GlobalNavi.prototype._onClick = function(event) {
      event.preventDefault();
      return StateManager.getInstance().change($(event.currentTarget).attr('href'));
    };

    GlobalNavi.prototype.close = function() {
      var targets;
      clearTimeout(this._timeoutId);
      $win.off('mousemove', this._onMouseMove);
      $doc.off('touchstart', this._onMouseMove);
      targets = $('#GlobalNavi a:not(.logo),#GlobalNavi a:not(.logo) img');
      targets.css({
        pointerEvents: 'none'
      }).stop();
      new OpacityAnimator(targets, 0, DURATION);
      return this.buttons.off();
    };

    GlobalNavi.prototype.open = function() {
      var targets;
      targets = $('#GlobalNavi a:not(.logo), #GlobalNavi a:not(.logo) img');
      targets.css({
        pointerEvents: 'auto'
      }).stop();
      new OpacityAnimator(targets, 0.5, DURATION);
      if (UAManager.type !== UAManager.TABLET && UAManager.type !== UAManager.MOBILE && $.support.opacity) {
        $win.mousemove(this._onMouseMove);
      }
      return this.buttons.on();
    };

    return GlobalNavi;

  })();

  NullView = (function() {
    function NullView() {}

    NullView.prototype.show = function(callback) {
      if (callback == null) {
        callback = function() {};
      }
      return callback();
    };

    NullView.prototype.hide = function(callback) {
      if (callback == null) {
        callback = function() {};
      }
      return callback();
    };

    return NullView;

  })();

  OpacityAnimator = (function() {
    function OpacityAnimator(target, value, duration) {
      this._$target = $(target);
      this._value = value;
      this._duration = duration;
      this._render();
    }

    OpacityAnimator.prototype._render = function() {
      if ($.support.opacity) {
        return this._$target.stop().animate({
          opacity: this._value
        }, this._duration);
      } else {
        return new OpacityMapper(this._$target, this._value);
      }
    };

    return OpacityAnimator;

  })();

  OpacityCSSer = (function() {
    function OpacityCSSer(target, value) {
      this._$target = $(target);
      this._value = value;
      this._render();
    }

    OpacityCSSer.prototype._render = function() {
      if ($.support.opacity) {
        return this._$target.css({
          opacity: this._value
        });
      } else {
        return new OpacityMapper(this._$target, this._value);
      }
    };

    return OpacityCSSer;

  })();

  OpacityMapper = (function() {
    function OpacityMapper(target, value) {
      this._$target = $(target);
      this._value = value;
      this._render();
    }

    OpacityMapper.prototype._render = function() {
      if (this._value === 0) {
        return this._$target.css('visibility', 'hidden');
      } else {
        return this._$target.css('visibility', 'visible');
      }
    };

    return OpacityMapper;

  })();

  RolloverFadeButton = (function() {
    function RolloverFadeButton(_elm) {
      this._elm = _elm;
      this._out = __bind(this._out, this);
      this._in = __bind(this._in, this);
      this._$elm = $(this._elm);
      this._$img = this._$elm.find('img');
      new OpacityCSSer(this._$img, 0.5);
      this._href = this._$elm.attr('href');
      this.on();
    }

    RolloverFadeButton.prototype.on = function() {
      this._$elm.hover(this._in, this._out);
      return this._$elm.attr('href', this._href);
    };

    RolloverFadeButton.prototype.off = function() {
      this._$elm.off('mouseenter', this._in);
      this._$elm.off('mouseleave', this._out);
      return this._$elm.removeAttr('href');
    };

    RolloverFadeButton.prototype._in = function() {
      return new OpacityAnimator(this._$img, 1, DURATION);
    };

    RolloverFadeButton.prototype._out = function() {
      return new OpacityAnimator(this._$img, 0.5, DURATION);
    };

    RolloverFadeButton.prototype.dispose = function() {
      return this.off();
    };

    return RolloverFadeButton;

  })();

  RolloverFadeButtonCollection = (function() {
    function RolloverFadeButtonCollection(_elements) {
      this._elements = _elements;
    }

    RolloverFadeButtonCollection.prototype.on = function() {
      var i, _i, _len, _ref, _results;
      _ref = this._elements;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        _results.push(i.on());
      }
      return _results;
    };

    RolloverFadeButtonCollection.prototype.off = function() {
      var i, _i, _len, _ref, _results;
      _ref = this._elements;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        _results.push(i.off());
      }
      return _results;
    };

    return RolloverFadeButtonCollection;

  })();

  paper.install(window);

  onload = function() {
    var c, canvas, i, num, path, path2, text, text2;
    canvas = document.getElementById("canvas");
    paper.setup("canvas");
    path = new Path.Rectangle([100, 100, 120, 80]);
    path.fillColor = "blue";
    path.smooth();
    num = [];
    i = 0;
    while (i < path.segments.length * 2) {
      num[i] = Math.random() * 3 + 3;
      i++;
    }
    path2 = path.clone();
    path2.position.x += 200;
    text = new PointText({
      point: path.position,
      fillColor: "white",
      content: "リンク",
      justification: "center",
      fontSize: 30
    });
    text.position.y += 10;
    text2 = text.clone();
    text2.position.x += 200;
    text2.content = "ボタン";
    view.onResize = function(event) {
      path.position = view.center;
    };
    c = project.activeLayer.children;
    view.onFrame = function(event) {
      var b;
      b = path.segments.length;
      i = 0;
      while (i < b) {
        path.segments[i].point.y += Math.cos(event.count / num[i]);
        i++;
      }
    };
    tool.onMouseMove = function(event) {
      project.activeLayer.children[0].fillColor = "blue";
      project.activeLayer.children[1].fillColor = "blue";
      if (event.item.type === "path") {
        event.item.fillColor = "red";
      }
    };
    tool.onMouseUp = function(event) {
      if (event.item.index % 2 === 0) {
        location.href = "http://google.com";
      } else {
        location.href = "http://yohawing.com";
      }
    };
  };

  Main = (function(_super) {
    __extends(Main, _super);

    function Main() {
      var JSONs, Templates;
      $("#modal").modal();
      $("#modal").modal({
        keyboard: false
      });
      $("#modal").modal("show");
      Templates = PASHALIST.Templates;
      JSONs = PASHALIST.JSONs;
      (function() {
        return $.getJSON(JSONs.sponsorship).done(function(res) {
          var tmpl;
          tmpl = _.template(Templates.sponsorship);
          _.each(res, function(data) {
            var html;
            html = tmpl(data);
            $('section.Sponsorship ul').append(html);
          });
        });
      })();
      (function() {
        return $.getJSON(JSONs.onlineshopitem).done(function(res) {
          var tmpl;
          tmpl = _.template(Templates.onlineshopitem);
          _.each(res, function(data) {
            var html;
            data.price = _.string.numberFormat(Number(data.price), 2);
            html = tmpl(data);
            $('section.Onlineshop ul').append(html);
          });
          $('section.Onlineshop ul li').heightLine();
        });
      })();
      (function() {
        return $.getJSON(JSONs.pashalist).done(function(res) {
          var tmpl;
          tmpl = _.template(Templates.pashalist);
          _.each(res, function(data) {
            var html;
            data.favorites = _.string.numberFormat(Number(data.favorites));
            html = tmpl(data);
            $('section.Pashalist .others ul').append(html);
          });
          $('section.Pashalist .others ul li .summary').ellipsis({
            lines: 2
          });
        });
      })();
      (function() {
        return $.getJSON(JSONs.top5pashalist).done(function(res) {
          var tmpl;
          tmpl = _.template(Templates.top5pashalist);
          _.each(res, function(data) {
            var html;
            data.favorites = _.string.numberFormat(Number(data.favorites));
            data.photos = _.string.numberFormat(Number(data.photos));
            html = tmpl(data);
            $('section.Pashalist .top5 ul').append(html);
          });
          $('section.Pashalist .top5 ul li .summary').ellipsis({
            lines: 2
          });
          $("#maximage").maximage({
            isBackground: true,
            overflow: "auto",
            verticalAlign: "top"
          });
        });
      })();
      (function() {
        return $.getJSON(JSONs.freePhoto).done(function(res) {
          var $imgs, cnt, len, tmpl;
          tmpl = _.template(Templates.freePhoto);
          _.each(res, function(data) {
            var html;
            html = tmpl(data);
            $('section.Photos .grid').append(html);
          });
          $imgs = $('section.Photos .grid img');
          len = $imgs.length;
          cnt = 0;
          $imgs.on('load', function() {
            cnt++;
            if (cnt === len) {
              $('section.Photos .grid').masonry({
                itemSelector: '.gridItem'
              });
            }
          });
          $(".div1077").imgLiquid({
            fill: false
          });
        });
      })();
      (function() {
        return $.getJSON(JSONs.featured).done(function(res) {
          var tmpl;
          tmpl = _.template(Templates.featured);
          _.each(res, function(data) {
            var html;
            html = tmpl(data);
            $('section.Featured ul').append(html);
          });
          $('section.Featured .slides ul').bxSlider();
        });
      })();
      $('.PageTop a').SmoothScroll({
        duration: 'miedum',
        easing: 'linear'
      });
      return;
    }

    $.localScroll.defaults.axis = "xy";

    $.localScroll({
      target: "#myContent",
      queue: true,
      duration: 1000,
      hash: true,
      onBefore: function(e, anchor, $target) {},
      onAfter: function(anchor, settings) {}
    });

    (function() {
      $('#picture li a').stop().scrollTo({
        top: "-=100px",
        left: "+=100"
      }, 500);
      return $('#picture li a').stop().scrollTo({
        top: "110px",
        left: "290px"
      }, 800);
    })();

    return Main;

  })(EventDispatcher);

  $(function() {
    return new Main();
  });

}).call(this);
