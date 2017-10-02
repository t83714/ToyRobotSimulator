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

    describe("# Test Command: PLACE 1,2,EAST", function() {
        it("should execute command without error", function(done) {
            commands.place(eventBus, function(err) {
                if (err) done(err);
                else done();
            }).send({
                x: 1,
                y: 2,
                facing: "EAST",
            });
        });

        it("should set robot x position to 1", function() {
            assert.equal(player.robot.x, 1);
        });

        it("should set robot y position to 2", function() {
            assert.equal(player.robot.y, 2);
        });

        it("should set robot facing to EAST", function() {
            assert.equal(player.robot.facing, "EAST");
        });
    });

    describe("# Test Command: Move", function() {
        it("should execute command without error", function(done) {
            commands.move(eventBus, function(err) {
                if (err) done(err);
                else done();
            }).send();
        });

        it("should set robot x position to 2", function() {
            assert.equal(player.robot.x, 2);
        });

        it("should set robot y position to 2", function() {
            assert.equal(player.robot.y, 2);
        });

        it("should set robot facing to EAST", function() {
            assert.equal(player.robot.facing, "EAST");
        });
    });

    describe("# Test Command: Move", function() {
        it("should execute command without error", function(done) {
            commands.move(eventBus, function(err) {
                if (err) done(err);
                else done();
            }).send();
        });

        it("should set robot x position to 3", function() {
            assert.equal(player.robot.x, 3);
        });

        it("should set robot y position to 2", function() {
            assert.equal(player.robot.y, 2);
        });

        it("should set robot facing to EAST", function() {
            assert.equal(player.robot.facing, "EAST");
        });
    });


    describe("# Test Command: Left", function() {
        it("should execute command without error", function(done) {
            commands.left(eventBus, function(err) {
                if (err) done(err);
                else done();
            }).send();
        });

        it("should set robot x position to 3", function() {
            assert.equal(player.robot.x, 3);
        });

        it("should set robot y position to 2", function() {
            assert.equal(player.robot.y, 2);
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

        it("should set robot x position to 3", function() {
            assert.equal(player.robot.x, 3);
        });

        it("should set robot y position to 3", function() {
            assert.equal(player.robot.y, 3);
        });

        it("should set robot facing to NORTH", function() {
            assert.equal(player.robot.facing, "NORTH");
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

        it("should output : 3,3,NORTH", function() {
            assert.equal(lastOutput, "3,3,NORTH");
        });
    });
});
