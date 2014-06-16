/* jshint browser: true */
/* global $, libsb, lace, currentState */

$(function () {
	$(document).on("click", ".popover-body a", function () {
		lace.popover.hide();
	});

	$(".user-area, .user-menu-button").on("click", function () {
		if ($("body").hasClass("role-guest")) {
			lace.popover.show({
				body: $("#login-menu").html(),
				origin: $(this)
			});
		} else {
			lace.popover.show({
				body: $("#user-menu").html(),
				origin: $(this)
			});
		}
	});

	$(document).on("click", ".button.facebook", function () {
		window.open(location.protocol + "//" + location.host + "/r/facebook/login", '_blank', 'toolbar=0,location=0,menubar=0');
	});

	$(document).on("click", ".userpref", function () {
		libsb.emit("navigate", {
			mode: "pref",
			view: "meta"
		});
	});

	$(document).on("click", ".logout", function () {
		libsb.logout();
	});

	libsb.on("logout", function (p, n) {
		libsb.emit('navigate', {
			view: 'loggedout',
		});

		lace.modal.show({
			body: $("#loggedout-dialog").html(),
			dismiss: false
		});

		n();
	}, 1000);

	$(document).on("click", ".reload-page", function () {
		location.reload();
	});

	libsb.on('navigate', function (state, next) {
		if (state && (!state.old || state.room != state.old.room)) {
			var room = state.room;
			$("#room-title").text(room);
		}

		next();
	});

	function setOwnerClass() {
		function check() {
			libsb.getRooms({hasMember: libsb.user.id}, function(err, data) {
				var i, l;

				for(i=0,l=data.results.length;i<l;i++) {
					if(data.results[i].id == currentState.room) {
						if (data.results[i].role === "owner") {
							$("body").addClass("role-owner");
							return;
						}
					}
				}

				$("body").removeClass("role-owner");
			});
		}


		if(libsb.isInited) {check();}
		else {
			libsb.on('inited', function(d, next){
				check();
				next();
			});
		}
	}

	libsb.on('init-dn', function(init, next){
		setOwnerClass();
		next();
	});

	libsb.on('back-dn', function(init, next){
		setOwnerClass();
		next();
	});

	libsb.on('navigate', function(state, next) {
            if(state.mode == 'normal' && state.room){
                setOwnerClass();
            }
            next();
	});

	libsb.on('back-dn', function (init, next) {
		setOwnerClass();
		next();
	});

	libsb.on('navigate', function (state, next) {
		if (state.mode === 'normal') {
			setOwnerClass();
		}
		next();
	});

	libsb.on("init-dn", function (init, next) {
		if (init.auth && !init.user.id) return next();

		if (/^guest-/.test(init.user.id)) {
			$("body").removeClass("role-user").addClass("role-guest");
		} else {
			$("body").removeClass("role-guest").addClass("role-user");
		}

		$("#sb-user").text = init.user.id.replace(/^guest-/, '');
		$("#sb-avatar").attr("src", init.user.picture);
		$("#sb-user").text(init.user.id.replace(/^guest-/, ''));

		next();
	}, 1000);
});