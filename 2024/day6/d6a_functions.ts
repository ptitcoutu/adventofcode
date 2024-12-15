export function solve(data: string):string {
    const mapLines = data.slice(0, -1).split("\n")
    const maxColumn = mapLines[0].length - 1
    const maxLine = mapLines.length - 1
    const guardArea = mapLines.map(line => line.split("").map(_ => 0))
    let guardPosition = findGuardPosition(mapLines)
    const guardDirection: Direction = {lineIncrement:-1, columnIncrement:0}
    let numberOfIteration = 0
    while (guardIsInTheArea(guardPosition, maxLine, maxColumn)) {
        guardPosition = moveGuard(guardPosition, mapLines, guardArea, guardDirection, maxLine, maxColumn)
        numberOfIteration++
        console.info(`${new Date().toISOString()} - [${numberOfIteration}] - guard position: ${guardPosition.line} ${guardPosition.column}`)
    }
    console.info(guardArea.map(line => line.join("")).join("\n"))
    return guardArea.reduce((acc, line) => acc + line.reduce((acc, cell) => acc + cell, 0), 0).toString()
}

export function findGuardPosition(mapLines: string[]): Position {
    const position = mapLines.findIndex(line => line.includes("^")  )
    return {
        line: position,
        column: mapLines[position].indexOf("^")
    }
}

export function guardIsInTheArea(guardPosition: Position, maxLine: number, maxColumn: number): boolean {
    return guardPosition.line <= maxLine && guardPosition.column <= maxColumn && guardPosition.line >= 0 && guardPosition.column >= 0
}

function moveGuard(guardPosition: Position, mapLines: string[], guardArea: number[][], guardDirection: Direction, maxLine: number, maxColumn: number): Position {
    markGuardPosition(guardArea, guardPosition);
    const theoreticalNextPosition = {
        line: guardPosition.line + guardDirection.lineIncrement,
        column: guardPosition.column + guardDirection.columnIncrement
    }
    let nextPosition
    if (guardIsInTheArea(theoreticalNextPosition, maxLine, maxColumn)) {
        if (mapLines[theoreticalNextPosition.line][theoreticalNextPosition.column] === "#") {
            turnGuard90Right(guardDirection);
            nextPosition = {
                line: guardPosition.line + guardDirection.lineIncrement,
                column: guardPosition.column + guardDirection.columnIncrement
            }
        } else {
            nextPosition = theoreticalNextPosition
        }
    } else {
        nextPosition = theoreticalNextPosition
        console.info("Guard is out of the area")
    }
    return nextPosition
}

export interface Position {
    line: number
    column: number
}
export interface Direction {
    lineIncrement: number
    columnIncrement: number
}

function markGuardPosition(guardArea: number[][], guardPosition: Position) {
  guardArea[guardPosition.line][guardPosition.column] = 1;
}

export function turnGuard90Right(guardDirection: Direction) {
    const initialLineDirection = guardDirection.lineIncrement;
    guardDirection.lineIncrement = Math.abs(Math.abs(guardDirection.lineIncrement)-1)*guardDirection.columnIncrement
    guardDirection.columnIncrement = -Math.abs(Math.abs(guardDirection.columnIncrement)-1)*initialLineDirection
}
