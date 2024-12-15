import { Direction, findGuardPosition, guardIsInTheArea, Position, turnGuard90Right } from "./d6a_functions.ts";

export function solve(data: string):string {
    const mapLines = data.slice(0, -1).split("\n")
    const maxColumn = mapLines[0].length - 1
    const maxLine = mapLines.length - 1
    const obstaclePositions = mapLinesToObstaclePositions(mapLines)
    let guardPosition = findGuardPosition(mapLines)
    const guardDirection: Direction = { lineIncrement:-1, columnIncrement:0 }
    const existingObstaclePaths: Set<string> = new Set()
    let numberOfIteration = 0
    const loopGeneratorObstacles: Set<string> = new Set()
    while (guardIsInTheArea(guardPosition, maxLine, maxColumn)) {
        console.log(`Guard position before move: (${guardPosition.line}, ${guardPosition.column})`);
        console.log(`Guard direction : ${JSON.stringify(guardDirection)}`)
        guardPosition = moveGuard(guardPosition, mapLines, obstaclePositions, existingObstaclePaths, loopGeneratorObstacles, guardDirection, maxLine, maxColumn)
        numberOfIteration++
        console.info(`${new Date().toISOString()} - [${numberOfIteration}] - guard position: ${guardPosition.line} ${guardPosition.column}, number of existing paths: ${existingObstaclePaths.size}`)
    }
    return `${loopGeneratorObstacles.size}`
}
function mapLinesToObstaclePositions(mapLines: string[]): Position[] {
    return mapLines.flatMap((line, lineIndex): Position[] => line.split("").map((cell, columnIndex):Position|null => cell === "#" ? {line: lineIndex, column: columnIndex} : null).filter(cell => cell !== null))
}

function tryToDetectLoop(obstaclePositions: Position[], existingObstaclePaths: Set<string>, loopGeneratorObstacles: Set<string>, guardPosition: Position, guardDirection: Direction):boolean {
    console.info("try to detect loop")
    const nextGuardDirection = cloneDirection(guardDirection)
    const nextGuardPosition : Position = {line:guardPosition.line, column: guardPosition.column}
    const obstaclePaths = new Set(existingObstaclePaths)
    turnGuard90Right(nextGuardDirection)
    let closestObstacle: Position|undefined
    let detectedLoop: boolean = false
    const newObstaclePosition:Position = {
        line: guardPosition.line+guardDirection.lineIncrement, 
        column: guardPosition.column+guardDirection.columnIncrement
    }
    const obstaclePositionsPlusNewObstacle = [...obstaclePositions,newObstaclePosition]
    const newObstaclePath = obstaclePath(newObstaclePosition, guardDirection)
    obstaclePaths.add(newObstaclePath)
    console.info("loop while obstacle exists and is not in the obstaclePaths")
    let nbIter = 0
    do {
        closestObstacle = findClosestObstacle(obstaclePositionsPlusNewObstacle, nextGuardPosition, nextGuardDirection)
        if (closestObstacle) {
            const closestObstaclePath = obstaclePath(closestObstacle, nextGuardDirection)
            detectedLoop = obstaclePaths.has(closestObstaclePath)
            obstaclePaths.add(closestObstaclePath)
            nextGuardPosition.line = closestObstacle.line - nextGuardDirection.lineIncrement
            nextGuardPosition.column = closestObstacle.column - nextGuardDirection.columnIncrement
            turnGuard90Right(nextGuardDirection)
            nbIter++
            /*if (nbIter == 20000) {
                console.info(`too much iteration so we stop looking for loop and consider that there's a loop`)
                detectedLoop = true
            }*/
        } else {
            console.info("no obstacle so there will be no detectedLoop")
        }
    } while (closestObstacle && !detectedLoop /*&& nbIter < 20000*/)
    if (detectedLoop) {
        loopGeneratorObstacles.add(`${JSON.stringify(newObstaclePosition)}`)
        console.info(`******* loop with new obstacle (path: ${newObstaclePath}) has been detected after ${nbIter} iterations ********`)
    } else {
        console.info(`detect no loop after ${nbIter} iterations`)
    }
    return detectedLoop
}

function obstaclePath(position: Position, direction: Direction) {
    return `l:${position.line},c:${position.column},li:${direction.lineIncrement},ci:${direction.columnIncrement}`
}

function cloneDirection(direction: Direction) {
    return {
        lineIncrement: direction.lineIncrement,
        columnIncrement: direction.columnIncrement
    }
}
function findClosestObstacle(obstaclePositions: Position[], startPosition: Position, moveDirection: Direction): Position|undefined {
    let result: Position|undefined
    if (moveDirection.lineIncrement > 0) {
        const obstacleOfTheColumnBelowStartPosition = obstaclePositions.filter(obstacle => obstacle.column === startPosition.column && obstacle.line > startPosition.line)
        const minLine = Math.min(...obstacleOfTheColumnBelowStartPosition.map(obstaclePosition=>obstaclePosition.line))
        result = obstacleOfTheColumnBelowStartPosition.find(obstaclePosition=>obstaclePosition.line == minLine)
    } else if (moveDirection.lineIncrement < 0) {
        const obstacleOfTheColumnAboveStartPosition = obstaclePositions.filter(obstacle => obstacle.column === startPosition.column && obstacle.line < startPosition.line)
        const maxLine = Math.max(...obstacleOfTheColumnAboveStartPosition.map(obstaclePosition=>obstaclePosition.line))
        result = obstacleOfTheColumnAboveStartPosition.find(obstaclePosition=>obstaclePosition.line == maxLine)
    } else if (moveDirection.columnIncrement > 0) {
        const obstacleOfTheLineAtTheRightOfStartPosition = obstaclePositions.filter(obstacle => obstacle.line === startPosition.line && obstacle.column > startPosition.column)
        const minColumn = Math.min(...(obstacleOfTheLineAtTheRightOfStartPosition.map(obstaclePosition=>obstaclePosition.column)))
        result = obstacleOfTheLineAtTheRightOfStartPosition.find(obstaclePosition=>obstaclePosition.column == minColumn)
    } else if (moveDirection.columnIncrement < 0) {
        const obstacleOfTheLineAtTheLeftOfStartPosition = obstaclePositions.filter(obstacle => obstacle.line === startPosition.line && obstacle.column < startPosition.column)
        const maxColumn = Math.max(...(obstacleOfTheLineAtTheLeftOfStartPosition.map(obstaclePosition=>obstaclePosition.column)))
        result = obstacleOfTheLineAtTheLeftOfStartPosition.find(obstaclePosition=>obstaclePosition.column == maxColumn)
    }
    return result
}


function moveGuard(guardPosition: Position, mapLines: string[], obstaclePositions: Position[], existingObstaclePaths: Set<string>, loopGeneratorObstacles: Set<string>, guardDirection: Direction, maxLine: number, maxColumn: number): Position {
    const theoreticalNextPosition = {
        line: guardPosition.line + guardDirection.lineIncrement,
        column: guardPosition.column + guardDirection.columnIncrement
    }
    let nextPosition
    if (guardIsInTheArea(theoreticalNextPosition, maxLine, maxColumn)) {
        if (mapLines[theoreticalNextPosition.line][theoreticalNextPosition.column] === "#") {
            existingObstaclePaths.add(obstaclePath(theoreticalNextPosition, guardDirection))
            turnGuard90Right(guardDirection);
            nextPosition = {
                line: guardPosition.line + guardDirection.lineIncrement,
                column: guardPosition.column + guardDirection.columnIncrement
            }
        } else {
            tryToDetectLoop(obstaclePositions, existingObstaclePaths, loopGeneratorObstacles, guardPosition, guardDirection)
            nextPosition = theoreticalNextPosition
        }
    } else {
        nextPosition = theoreticalNextPosition
        console.info("Guard is out of the area")
    }
    return nextPosition
}


/**
il y a un graphe orienté de rebond qu'on peut calculer avec les différentes positions 

  P1 -> P2 -> P3 -> ... -> Pn -> Sortie

  Pour que le gardien soit bloqué dans ce graphe il faut introduire un cycle

  P1 -> P2 -> P3 -> ... O -> Pk ou k < n et k >= 1 par exemple P1 -> P2 -> P3 -> O -> P1
  Donc le nombre de cycles est au maximum le nombre de rebonds. 
  
  ...#.....  3 rebonds : P1 -> P2 -> P3 -> 1 cycle possible P1 -> P2 -> P3 -> O -> P1
  ...+--+#.  est-ce qu'il en existe un autre ?
  ..O^--+..  Pour avoir un cycle il faut que le gardien soit bloqué soir en sortant de P1, P2 ou P3
  ......#..  pour qu'il soit bloqué en sortant de P1 il faut que l'obstacle soit sur une colonne où existe un autre obstacle sinon le gardien sortira
             comme il n'y a pas d'obstacle sur les colonnes avant P2 il n'y a pas de cycle possible
             En sortant de P2 on peut appliquer le même raisonnement et en déduire qu'il faut un obstacle sur une ligne des colonnes avant P3
             Comme il n'y a pas d'obstables sur ces lignes on ne peut pas introduire de cycle.
             En sortant de P3 comme il y a un obstable en P1 on sait qu'on peut introduire un cycle en mettant un obstacle juste avant la colonne P1 pour changer de sens et introduire par conséquant un cycle vers P1

Donc c'est bien le seul cycle possible.
Autre point important un cycle implique forcément 4 changements de direction donc forcément 4 rebonds et donc forcément 4 obstacles.
Donc pour compter le nombre de cycles possible en ajoutant un obstable unique O en plus il faut parcourir le chemin et vérifier sur ce chemin
les obstacles orthogonaux à droite de la position du gardien si l'obstacle est un des obstacle du parcours du gardien on peut introduire un cycle
si ce n'est pas un des obstacles du parcours initial il faut regarder sur la direction orthogonale à droite si il y a un obstacle faisant partie du parcours modifiéset ainsi de suite jusqu'à ce qu'il n'y ait plus d'obstacle
si on a un obstacle du parcours modifié alors on peut introduire un cycle
et on reprend le cheminement du gardien pour vérifier les autres positions permettant d'introduire un cycle.

*/
