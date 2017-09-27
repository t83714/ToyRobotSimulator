# ToyRobotSimulator

A Cli application simulates toy robot moving on a square tabletop.

## ENVIRONMENTS

This application was developed on macOS Sierra 10.12.6

## SYSTEM DEPENDENCIES & CONFIGURATION

This application requires node >= 8.4.0 and npm >= 5.3.0
To check your version run:

```
node -v
```

To make sure correct node version has been install, Node version management tool `n` is recommand.

To install n:

```
$ npm install -g n
```

On macOS, you may want to use:
```
$ sudo npm install -g n
```
to install n to the path requires root permission.

To get latest stable node:
```
$ n stable
```
On macOS, you may want to use:
```
$ sudo n stable
```

## APPLICATION INSTALLATION INSTRUCTIONS

To install the application, clone the repository, `cd` to the repository directory and invoke `npm install`.

```
git clone https://github.com/t83714/ToyRobotSimulator.git
cd ToyRobotSimulator
npm install
```

## USAGE INSTRUCTIONS

To run the application in interactive mode, `cd` to the repository directory and invoke `./bin/trs.js`.

```
cd ToyRobotSimulator
./bin/trs.js
```
Under interactive mode, enter help will show help information:
```
RobotSimulation~$ help

  Commands:

    help [command...]   Provides help for a given command.
    exit                Exits application.
    PLACE <x,y,facing>  Place robot on x,y position of tabletop with <facing>
    MOVE                Move robot one step further
    LEFT                Make robot turn left
    RIGHT               Make robot turn RIGHT
    REPORT              Ask robot to report current position

RobotSimulation~$
```

example:
```
RobotSimulation~$ PLACE 1,2,EAST
RobotSimulation~$ MOVE
RobotSimulation~$ MOVE
RobotSimulation~$ LEFT
RobotSimulation~$ MOVE
RobotSimulation~$ REPORT
Output:3,3,NORTH
RobotSimulation~$
```

## TESTING INSTRUCTIONS

To run test cases, `cd` to the repository directory and invoke `npm test`:
```
cd ToyRobotSimulator
npm test
```

## OVERVIEW

The application is a simula8on of a toy robot moving on a square tabletop, of dimensions 5 units x 5 units. There are no other obstructons on the table surface. The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still
be allowed.

This application can read in commands of the following form:
PLACE X,Y,F
MOVE
LEFT
RIGHT
REPORT

PLACE will put the toy robot on the table in position X,Y and facing NORTH,SOUTH, EAST or WEST. The origin (0,0) can be considered to be the SOUTH WEST most corner.

The first valid command to the robot is a PLACE command, after that, any
sequence of commands may be issued, in any order, including another PLACE
command. The application should discard all commands in the sequence until a
valid PLACE command has been executed.

MOVE will move the toy robot one unit forward in the direction it is currently
facing.

LEFT and RIGHT will rotate the robot 90 degrees in the specified direction
without changing the position of the robot.

REPORT will announce the X,Y and F of the robot.

## LICENSE

MIT