var assert = require("assert");
var core = require("../test/mock-core.js")();
var validator = require("./validator.js")(core);
var guid = require("../lib/guid.js");
var names = require("../lib/names.js");

/*****************************************************************************

This file perform tests on the validator plugin based on the new schema.
Validator plugin will test all actions. throw errors if critical properties are missing and fill the properties if it can.


for text|back|away|join|part|admit|expel|room|user|edit|init actions:

	critical properties:
		type
		from
		to
		session


	properties that the plugin can fill
		time
		id


for text
	critical properties:
		text
	
	properties that the plugin can fill
		mentions  -> if not present then set it to empty array [].
		labels  -> if not present then set it to empty object {}.
		editInverse  -> if not present then set it to empty array [].


for join
	properties that the plugin can fill
		role  -> if not present then set it to followers.

for join
	properties that the plugin can fill
		role  -> if not present then set it to none.


for admit
	critical properties:
		ref
	properties that the plugin can fill
		role  -> followers

for expel
	critical properties:
		ref
	properties that the plugin can fill
		role  -> banned

for init
	?????????????????
*****************************************************************************/

describe.only('validator', function() {
	it('Should throw and error if TYPE is undefined', function(done) {
		core.emit("text",{id:guid()}, function(err, data) {
			assert(err, "Error not thrown");
			assert.equal(err.message, "TYPE_NOT_SPECIFIED", "Error message is incorrect");
			done();
		});
	});
	it('Should throw and error if FROM is undefined', function(done) {
		core.emit("text",{id:guid(),type:"text", from: names(6)}, function(err, data) {
			assert(err, "Error not thrown");
			assert.equal(err.message, "FROM_NOT_SPECIFIED", "Error message is incorrect");
			done();
		});
	});
	it('Should throw and error if TO is undefined', function(done) {
		core.emit("text",{id:guid(),type:"text",from: names(6)}, function(err, data) {
			assert(err, "Error not thrown");
			assert.equal(err.message, "TO_NOT_SPECIFIED", "Error message is incorrect");
			done();
		});
	});

	it('Should throw and error if SESSION is undefined', function(done) {
		core.emit("text",{id:guid(),type:"text",from: names(6), to:names(6)}, function(err, data) {
			assert(err, "Error not thrown");
			assert.equal(err.message, "SESSION_NOT_SPECIFIED", "Error message is incorrect");
			done();
		});
	});
	it('Should throw and error if set id if it is undefined', function(done) {
		core.emit("text",{type:"text",from: names(6), 
			to: names(6), session:"web:127.0.0.1:ajsdbhciahnasjdnfn"}, function(err, data) {
				assert(!err,"ERROR thrown when it shouldnt.");
				assert(data.id, "ID not set by validator")
		});
	});
});