/* Polaroidify is a jQuery plugin that rotates through divs
 * just like if they were a stack of polaroids.
 * 
 * For usage and examples view:
 * http://stylesuxx.github.com/polaroidify/
 * 
 * Licensed under the MIT:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright (C) 2012 by Chris Landa chris[-at-]1337[-dot-]af
 */

(function($, jQuery) {
  $.fn.polaroidify = function(options) {
    // Default settings
    var settings = $.extend( {
      'deg': 0,			// Base rotation
      'degOffset': 10,		// Rotation Offset (added randomly to deg)
      'wait': 5000,		// Wait time between slides aka how long a pic is shown
      'waitOffset': 0,		// Wait time offset (added randomly to wait)
      'trans': 1500,		// Transition time in one direction
      'transOffset': 0,		// Transition time offset (added randomly to trans)
      'slide': 500,		// The amount of which the polaroid slides
      'direction': 'right',	// The direction to slide the polaroid
      'navigation': false	// TODO: Add Navigation
    }, options);
    
    // Set the CSS animation map depending on the given direction
    // Defaults to right sliding
    switch(settings['direction']){
      case('left'):
	settings['animMap'] = {marginLeft: -settings['slide']}; break;
      case('up'): 
	settings['animMap'] = {marginTop: -settings['slide']}; break;
      case('down'): 
	settings['animMap'] = {marginTop: settings['slide']}; break;
      case('left down'): 
	settings['animMap'] = {marginLeft: -settings['slide'], marginTop: settings['slide']}; break;
      case('left up'): 
	settings['animMap'] = {marginLeft: -settings['slide'], marginTop: -settings['slide']}; break;
      case('right down'): 
	settings['animMap'] = {marginLeft: settings['slide'], marginTop: settings['slide']}; break;
      case('right up'): 
	settings['animMap'] = {marginLeft: settings['slide'], marginTop: -settings['slide']}; break;
      default: 
	settings['animMap'] = {marginLeft: settings['slide']}; break;           
    }
    
    // Rotate all children of all parentes
    // TODO: add rotation for old IE's ( < 8 )
    return this.each(function(){    
      $pics = $(this).children();
      prefixes = ['', '-moz-', '-o-', '-webkit-', '-ms-'];
    
      $pics.each(function(){
	var $pic = $(this);
	var rotate = settings['deg'] + Math.floor(Math.random()*(settings['degOffset']+1));
      
	$.each(prefixes, function(){
	  $pic.css(this + 'transform', 'rotate('+rotate+'deg)');
	});                
      });
    
      // Start the animation
      move($(this), settings['wait'], settings['waitOffset'], settings['trans'], settings['transOffset'], settings['animMap']);
    });
    
    // Get random number
    function getRandom(base, offset){
      return base + Math.floor(Math.random()*(offset+1));
    }
    
    // Slide the polaroids
    function move($div, wait, waitOffset, trans, transOffset, animMap){
      var $last = $div.children(':last').delay(getRandom(wait, waitOffset));
      var transTime = getRandom(trans, transOffset);
		
      $last.animate(animMap, transTime, function(){
	$save = $(this);
	$parent = $save.parent();
	$(this).remove();
	$parent.prepend($save);
	$save.animate({
	  marginTop: "0px",
	  marginLeft: "0px"
	}, transTime, function(){
	  move($div, wait, waitOffset, trans, transOffset, animMap);
	});
      });
    }
    
  };
})(jQuery, jQuery);