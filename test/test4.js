import {assert} from "chai";
import EventEmitter from "events";
import * as commands from "../src/commands";
import Player from "../src/Player.js";
import Robot from "../src/Robot.js";
import Tabletop from "../src/Tabletop.js";

const eventBus=new EventEmitter();
const player=new Player(eventBus, Robot, Tabletop);

describe("Test Robot Command Sequence Three", function() {
    before(function() {
        player.startToPlay();
    });

    after(function() {
        player.stopToPlay();
    });

    describe("# Test `MOVE` Command without `PLACE`", function() {
        it("should ignore command without error", function(done) {
            commands.move(eventBus, function(err) {
                if (err) done(err);
                else done();
            }).send();
        });

        it("should NOT change robot's initial x position", function() {
            assert.equal(player.robot.x, null);
        });

        it("should NOT change robot's initial y position", function() {
            assert.equal(player.robot.y, null);
        });

        it("should NOT change robot's initial facing", function() {
            assert.equal(player.robot.facing, null);
        });
    });

    describe("# Test `LEFT` Command without `PLACE`", function() {
        it("should ignore command without error", function(done) {
            commands.move(eventBus, function(err) {
                if (err) done(err);
                else done();
            }).send();
        });

        it("should NOT change robot's initial x position", function() {
            assert.equal(player.robot.x, null);
        });

        it("should NOT change robot's initial y position", function() {
            assert.equal(player.robot.y, null);
        });

        it("should NOT change robot's initial facing", function() {
            assert.equal(player.robot.facing, null);
        });
    });

    describe("# Test `RIGHT` Command without `PLACE`", function() {
        it("should ignore command without error", function(done) {
            commands.move(eventBus, function(err) {
                if (err) done(err);
                else done();
            }).send();
        });

        it("should NOT change robot's initial x position", function() {
            assert.equal(player.robot.x, null);
        });

        it("should NOT change robot's initial y position", function() {
            assert.equal(player.robot.y, null);
        });

        it("should NOT change robot's initial facing", function() {
            assert.equal(player.robot.facing, null);
        });
    });

    describe("# Test `PLACE` Command with Invalid facing `SDSA`", function() {
        it("should throw an `Invalid facing parameter value: SDSA` error", function(done) {
            commands.place(eventBus, function(err) {
                assert.equal(err.message, "Invalid facing parameter value: SDSA");
                done();
            }).send({
                x: 1,
                y: 2,
                facing: "SDSA",
            });
        });

        it("should NOT change robot's initial x position", function() {
            assert.equal(player.robot.x, null);
        });

        it("should NOT change robot's initial y position", function() {
            assert.equal(player.robot.y, null);
        });

        it("should NOT change robot's initial facing", function() {
            assert.equal(player.robot.facing, null);
        });
    });
});
