import fs from "node:fs"

const data = fs.readFileSync("2024/day2/d2_input.txt", "utf8")
//const data = fs.readFileSync("2024/day2/test_input.txt", "utf8")
const lines = data.split("\n")
console.log(lines.slice(0,10))
const reports = lines.filter(line => line.length > 0).map((line) => line.split(" ").map(n => +n))
console.log(reports.slice(0,10))
console.log(`... ${reports.length} ...`)
console.log(reports.slice(reports.length-10,reports.length))
interface LevelWithDistanceAndIndex {
    level: number,
    index: number,
    directDistance: number | undefined
}
const reportsConsecutiveLevelDistance = reports.map(report => processDistances(report))
function processDistances(report: number[]): LevelWithDistanceAndIndex[] {
    return report.map(
        (level, index) => {
            const directDistance = index > 0 ? level - report[index - 1] : undefined
    return ({
        level, 
        index, 
        directDistance
    })}
)

}

function isValidReport(report: LevelWithDistanceAndIndex[], index: number, oneFixSupport: boolean) {
    console.log(`test report ${index} with one fix support ${oneFixSupport}`, JSON.stringify(report))
    const numberOfPositiveDistances = report.filter(distance => distance.directDistance && distance.directDistance > 0).length
    const numberOfNegativeDistances = report.filter(distance => distance.directDistance && distance.directDistance < 0).length
    const reportSign = numberOfPositiveDistances > numberOfNegativeDistances ? 1 : -1
    const distanceWithValidity = report.map(distance => {
        const normalizedDistance = distance.directDistance != undefined ? reportSign*distance.directDistance : undefined
        return {
            index: distance.index,
            distance: normalizedDistance, 
            isValid: distance.directDistance == undefined || (normalizedDistance != undefined && (normalizedDistance <= 3 && normalizedDistance > 0)),
        }
    })
    const invalidDistances = distanceWithValidity.filter(distance => !distance.isValid)
    if (invalidDistances.length != 0) {
        console.log(JSON.stringify([index, report.map(distance => distance.directDistance), reports[index]]))
        if (invalidDistances.length == 1) {
            console.log("distances", JSON.stringify(report))
            console.log("invalidDistances", JSON.stringify(invalidDistances))
        }
    }
    const validDistanceAfterOneFix = oneFixSupport ? distanceWithValidity.find(distance => {
        console.log("try to fix distance", distance)
        const reportWithoutOneItem = processDistances(report.filter(item => item.index != distance.index).map(item => item.level))
        console.log("reportWithoutOneItem", JSON.stringify(reportWithoutOneItem))
        const isValidReportAfterOneFix = isValidReport(reportWithoutOneItem, index, false) 
        return isValidReportAfterOneFix //|| isValidReportAfterOneFixWithPrecedingItem
    }) : undefined
    console.log("validDistanceAfterOneFix", validDistanceAfterOneFix)
    console.log("invalidDistances.length", invalidDistances.length)
    const isValid = invalidDistances.length == 0 || validDistanceAfterOneFix
    console.log(`report ${index} is ${isValid ? "valid" : "invalid"}`)
    return isValid
}
const numberOfSafeReports = reportsConsecutiveLevelDistance.filter((report, index) => {
    return isValidReport(report, index, true)
}).length
console.log(`Number of safe reports: ${numberOfSafeReports}`)