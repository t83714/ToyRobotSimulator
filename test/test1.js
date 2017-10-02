import {assert} from "chai";
import EventEmitter from "events";
import * as commands from "../src/commands";
import Player from "../src/Player.js";
import Robot from "../src/Robot.js";
import Tabletop from "../src/Tabletop.js";

const eventBus=new EventEmitter();
const player=new Player(eventBus, Robot, Tabletop);

describe("Test Robot Command Sequence One", function() {
    before(function() {
        player.startToPlay();
    });

    after(function() {
        player.stopToPlay();
    });

    describe("# Test Command: PLACE 0,0,NORTH", function() {
        it("should execute command without error", function(done) {
            commands.place(eventBus, function(err) {
                if (err) done(err);
                else done();
            }).send({
                x: 0,
                y: 0,
                facing: "NORTH",
            });
        });

        it("should set robot x position to 0", function() {
            assert.equal(player.robot.x, 0);
        });

        it("should set robot y position to 0", function() {
            assert.equal(player.robot.y, 0);
        });

        it("should set robot facing to NORTH", function() {
            assert.equal(player.robot.facing, "NORTH");
        });
    });

    describe("# Test Command: Move", function() {
        it("should execute command without error", function(done) {
            commands.move(eventBus, function(err) {
                if (err) done(err);
                else done();
            }).send();
        });

        it("should set robot x position to 0", function() {
            assert.equal(player.robot.x, 0);
        });

        it("should set robot y position to 1", function() {
            assert.equal(player.robot.y, 1);
        });

        it("should set robot facing to NORTH", function() {
            assert.equal(player.robot.facing, "NORTH");
        });
    });

    describe("# Test Command: Right", function() {
        it("should execute command without error", function(done) {
            commands.right(eventBus, function(err) {
                if (err) done(err);
                else done();
            }).send();
        });

        it("should set robot x position to 0", function() {
            assert.equal(player.robot.x, 0);
        });

        it("should set robot y position to 1", function() {
            assert.equal(player.robot.y, 1);
        });

        it("should set robot facing to EAST", function() {
            assert.equal(player.robot.facing, "EAST");
        });
    });

    describe("# Test Command: Report", function() {
        let lastOutput;
        let callBack=function(output) {
            lastOutput=output;
            eventBus.removeListener("output", callBack);
        };
        eventBus.on("output", callBack);

        it("should execute command without error", function(done) {
            commands.report(eventBus, function(err) {
                if (err) done(err);
                else done();
            }).send();
        });

        it("should output : 0,1,EAST", function() {
            assert.equal(lastOutput, "0,1,EAST");
        });
    });
});
