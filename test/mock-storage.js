

var core;
var rooms = {
	"scrollback": {
		id:"scrollback",
		description:"this is room",
		type:"room",
		identities:["irc://harry.scrollback.io/#scrollback"],
		timezone: 330,
		params:{}
	}
};

var users = {
	"harish":{
		id: "harish",
		description: "this is user",
		type: "user",
		identities: ["mailto:harish@scrollback.io"],
		timezone: 330,
		params: {}
	}
};

module.export = function(c) {
	core = c;
	core.on("getRooms",function(payload, callback) {		
		if(payload.id) {
			payload.results = [];
			if(rooms[payload.id]) {
				payload.results.push(rooms[payload.id]);
			}
		}
		callback();
	});
	core.on("getUsers",function(payload, callback) {
		if(payload.id) {
			payload.results = [];
			if(users[payload.id]) {
				payload.results.push(rooms[payload.id]);
			}
		}
		callback();
	});
}