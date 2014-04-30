/* jshint browser: true */
/* global $ */

$(function() {
	$(".has-popover").on("click", function() {
		$(".popover-body").removeClass().addClass("popover-body").empty();
	});

	$(".guest").on("click", function() {
		$(".popover-body").addClass("user-menu").append('Sign in to scrollback with<a class="button facebook">Facebook</a><a class="button persona">Persona</a>');
	});

	$(".avatar").on("click", function() {
		$(".popover-body").addClass("user-menu").append('<ul><li><a href="">Report an issue</a></li><li><a href="">Logout</a></li></ul>');
	});
});


libsb.on("init-dn", function(init, next) {
	if(/^guest-/.test(init.user.id)) {
		$("body").addClass("guest-user");
	}else {
		$("body").removeClass("guest-user");
	}
	$(".sb-user")[0].innerText = init.user.id.replace(/^guest-/,'');
	next();
});


$(document).on("click", ".button.facebook", function(){
	window.open(location.protocol+"//"+location.host+"/r/facebook/login", '_blank', 'toolbar=0,location=0,menubar=0');
});