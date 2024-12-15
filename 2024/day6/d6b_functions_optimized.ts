import { Direction, findGuardPosition, guardIsInTheArea, Position, turnGuard90Right } from "./d6a_functions.ts";

export function solve(data: string): string {
    const mapLines = data.slice(0, -1).split("\n");
    const maxColumn = mapLines[0].length - 1;
    const maxLine = mapLines.length - 1;
    const obstaclePositions = mapLinesToObstaclePositions(mapLines);
    let guardPosition = findGuardPosition(mapLines);
    const guardDirection: Direction = { lineIncrement: -1, columnIncrement: 0 };
    let numberOfLoop = 0;

    while (guardIsInTheArea(guardPosition, maxLine, maxColumn)) {
        const theoreticalNextPosition = {
            line: guardPosition.line + guardDirection.lineIncrement,
            column: guardPosition.column + guardDirection.columnIncrement,
        };

        if (guardIsInTheArea(theoreticalNextPosition, maxLine, maxColumn)) {
            const isObstacle = obstaclePositions.some((obstacle) => obstacle.line === theoreticalNextPosition.line && obstacle.column === theoreticalNextPosition.column);
            if (isObstacle) {
                turnGuard90Right(guardDirection);
            } else {
                guardPosition = theoreticalNextPosition;
            }
        } else {
            break;
        }

        numberOfLoop += tryToDetectLoop(obstaclePositions, guardPosition, guardDirection, maxLine, maxColumn) ? 1 : 0;
    }

    return `${numberOfLoop}`;
}

function mapLinesToObstaclePositions(mapLines: string[]): Position[] {
    const obstaclePositions: Position[] = [];
    for (let line = 0; line < mapLines.length; line++) {
        for (let column = 0; column < mapLines[line].length; column++) {
            if (mapLines[line][column] === "#") {
                obstaclePositions.push({ line, column });
            }
        }
    }
    return obstaclePositions;
}

function tryToDetectLoop(obstaclePositions: Position[], guardPosition: Position, guardDirection: Direction, maxLine: number, maxColumn: number): boolean {
    const visitedPositions = new Set<string>();
    let currentPosition = { ...guardPosition };
    let currentDirection = { ...guardDirection };

    while (guardIsInTheArea(currentPosition, maxLine, maxColumn)) {
        const positionKey = `${currentPosition.line},${currentPosition.column}`;
        if (visitedPositions.has(positionKey)) {
            return true;
        }
        visitedPositions.add(positionKey);

        const theoreticalNextPosition = {
            line: currentPosition.line + currentDirection.lineIncrement,
            column: currentPosition.column + currentDirection.columnIncrement,
        };

        if (guardIsInTheArea(theoreticalNextPosition, maxLine, maxColumn)) {
            const isObstacle = obstaclePositions.some((obstacle) => obstacle.line === theoreticalNextPosition.line && obstacle.column === theoreticalNextPosition.column);
            if (isObstacle) {
                turnGuard90Right(currentDirection);
            } else {
                currentPosition = theoreticalNextPosition;
            }
        } else {
            break;
        }
    }

    return false;
}
