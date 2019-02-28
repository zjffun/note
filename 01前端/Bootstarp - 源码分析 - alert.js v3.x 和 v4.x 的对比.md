# 一些概念

## 1. 使用 data-api 调用

就是给所有带有`data-dismiss="alert"`的元素绑定点击事件

    v3.x：
    $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

    v4.x：
    $(document).on(
      Event.CLICK_DATA_API,
      Selector.DISMISS,
      Alert._handleDismiss(new Alert())
    )

## 2. 去冲突

调用`$.fn.alert.noConflict()`，将`$.fn.alert`还原为 “旧”`$.fn.alert`，并返回 “新”`$.fn.alert`（类似：[$.noConflict()](https://www.jquery123.com/jQuery.noConflict/)）

## 3. function 模拟类

[JS-prototype](https://www.cnblogs.com/jffun-blog/p/9110269.html)

## 4. jQuery 事件命名空间

> <https://www.jquery123.com/on/>
>
> 事件名称可以添加指定的 event namespaces（命名空间） 来简化删除或触发事件。例如，"click.myPlugin.simple" 为 click 事件同时定义了两个命名空间 myPlugin 和 simple。通过上述方法绑定的 click 事件处理，可以用. off("click.myPlugin") 或 .off("click.simple") 删除绑定到相应元素的 Click 事件处理程序，而不会干扰其他绑定在该元素上的 “click（点击）” 事件。命名空间类似 CSS 类，因为它们是不分层次的; 只需要有一个名字相匹配即可。以下划线开头的名字空间是供 jQuery 使用的。

# 对比

| 比较项      | v3.x         | v4.x       |
| -------- | ------------ | ---------- |
| 总体结构     | 闭包           | ES6 Module |
| Alert“类” | function 模拟类 | ES6 Class  |

# v4.x

    import $ from 'jquery'
    import Util from './util'

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.1.3): alert.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    const NAME                = 'alert'
    const VERSION             = '4.1.3'
    const DATA_KEY            = 'bs.alert'
    const EVENT_KEY           = `.${DATA_KEY}`
    const DATA_API_KEY        = '.data-api'
    const JQUERY_NO_CONFLICT  = $.fn[NAME]

    const Selector = {
      DISMISS : '[data-dismiss="alert"]'
    }

    const Event = {
      CLOSE          : `close${EVENT_KEY}`,
      CLOSED         : `closed${EVENT_KEY}`,
      CLICK_DATA_API : `click${EVENT_KEY}${DATA_API_KEY}`
    }

    const ClassName = {
      ALERT : 'alert',
      FADE  : 'fade',
      SHOW  : 'show'
    }

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    class Alert {
      constructor(element) {
        this._element = element
      }

      // Getters

      static get VERSION() {
        return VERSION
      }

      // Public

      close(element) {
        let rootElement = this._element
        if (element) {
          rootElement = this._getRootElement(element)
        }

        const customEvent = this._triggerCloseEvent(rootElement)

        if (customEvent.isDefaultPrevented()) {
          return
        }

        this._removeElement(rootElement)
      }

      dispose() {
        $.removeData(this._element, DATA_KEY)
        this._element = null
      }

      // Private

      _getRootElement(element) {
        const selector = Util.getSelectorFromElement(element)
        let parent     = false

        if (selector) {
          parent = document.querySelector(selector)
        }

        if (!parent) {
          parent = $(element).closest(`.${ClassName.ALERT}`)[0]
        }

        return parent
      }

      _triggerCloseEvent(element) {
        const closeEvent = $.Event(Event.CLOSE)

        $(element).trigger(closeEvent)
        return closeEvent
      }

      _removeElement(element) {
        $(element).removeClass(ClassName.SHOW)

        if (!$(element).hasClass(ClassName.FADE)) {
          this._destroyElement(element)
          return
        }

        const transitionDuration = Util.getTransitionDurationFromElement(element)

        $(element)
          .one(Util.TRANSITION_END, (event) => this._destroyElement(element, event))
          .emulateTransitionEnd(transitionDuration)
      }

      _destroyElement(element) {
        $(element)
          .detach()
          .trigger(Event.CLOSED)
          .remove()
      }

      // Static

      static _jQueryInterface(config) {
        return this.each(function () {
          const $element = $(this)
          let data       = $element.data(DATA_KEY)

          if (!data) {
            data = new Alert(this)
            $element.data(DATA_KEY, data)
          }

          if (config === 'close') {
            data[config](this)
          }
        })
      }

      static _handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault()
          }

          alertInstance.close(this)
        }
      }
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on(
      Event.CLICK_DATA_API,
      Selector.DISMISS,
      Alert._handleDismiss(new Alert())
    )

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME]             = Alert._jQueryInterface
    $.fn[NAME].Constructor = Alert
    $.fn[NAME].noConflict  = () => {
      $.fn[NAME] = JQUERY_NO_CONFLICT
      return Alert._jQueryInterface
    }

    export default Alert

# v3.x

    /* ========================================================================
     * Bootstrap: alert.js v3.3.7
     * http://getbootstrap.com/javascript/#alerts
     * ========================================================================
     * Copyright 2011-2016 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * ======================================================================== */


    +function ($) {
      'use strict';

      // ALERT CLASS DEFINITION
      // ======================

      var dismiss = '[data-dismiss="alert"]'
      var Alert   = function (el) {
        $(el).on('click', dismiss, this.close)
      }

      Alert.VERSION = '3.3.7'

      Alert.TRANSITION_DURATION = 150

      Alert.prototype.close = function (e) {
        var $this    = $(this)
        var selector = $this.attr('data-target')

        if (!selector) {
          selector = $this.attr('href')
          selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
        }

        var $parent = $(selector === '#' ? [] : selector)

        if (e) e.preventDefault()

        if (!$parent.length) {
          $parent = $this.closest('.alert')
        }

        $parent.trigger(e = $.Event('close.bs.alert'))

        if (e.isDefaultPrevented()) return

        $parent.removeClass('in')

        function removeElement() {
          // detach from parent, fire event then clean up data
          $parent.detach().trigger('closed.bs.alert').remove()
        }

        $.support.transition && $parent.hasClass('fade') ?
          $parent
            .one('bsTransitionEnd', removeElement)
            .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
          removeElement()
      }


      // ALERT PLUGIN DEFINITION
      // =======================

      function Plugin(option) {
        return this.each(function () {
          var $this = $(this)
          var data  = $this.data('bs.alert')

          if (!data) $this.data('bs.alert', (data = new Alert(this)))
          if (typeof option == 'string') data[option].call($this)
        })
      }

      var old = $.fn.alert

      $.fn.alert             = Plugin
      $.fn.alert.Constructor = Alert


      // ALERT NO CONFLICT
      // =================

      $.fn.alert.noConflict = function () {
        $.fn.alert = old
        return this
      }


      // ALERT DATA-API
      // ==============

      $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

    }(jQuery);
