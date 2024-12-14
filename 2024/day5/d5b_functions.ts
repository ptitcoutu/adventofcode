export function solve(data: string):string {
    const allParts =  data.split("\n\n")
    console.info("allParts", allParts)
    const orderingRulesData: string = allParts[0]
    console.info("orderingRulesData", orderingRulesData)
    const updatesData: string = allParts[1]
    console.info("updatesData", updatesData)
    const orderingRules: Map<string, Set<string>> = orderingRulesData.split('\n').map(coupleTxt => {
        const couple = coupleTxt.split("|")
        return [couple[0], couple[1]]
    }).reduce((cumul, curr) => { 
        if (cumul.has(curr[0])) { 
            cumul.get(curr[0])!.add(curr[1]) 
        } else { 
            const nextValidPages: Set<string> = new Set()
            nextValidPages.add(curr[1])
            cumul.set(curr[0], nextValidPages) 
        } 
        return cumul 
    }, new Map<string, Set<string>>())
    console.info("orderingRules", orderingRules)
    const updates = updatesData.split("\n").map(it=>it.split(','))
    const fixedUpdates: string[][] = updates.map(update => {
        const invalidUpdatePages = update.filter(
            (page, index) => index != 0 && update.slice(0, index).some(prevPage => (orderingRules.get(page)?.has(prevPage)))
            )
        console.info("invalidUpdatePages",invalidUpdatePages)
        return invalidUpdatePages.length > 0 ? fixPages(update, orderingRules):null
    }).filter(it=>it) as string[][]
    console.info("fixedUpdates", fixedUpdates)
    const validUpdatesMidNumber = fixedUpdates.map(update => update.length % 2 === 0 ? +update[update.length / 2] : +update[(update.length-1) / 2])
    console.log("validUpdatesMidNumber",validUpdatesMidNumber)
    return validUpdatesMidNumber.reduce((acc, it) => acc + (+it), 0).toString()
}
function fixPages(update: string[], orderingRules: Map<string, Set<string>>): string[] {
    const fixedUpdate = [...update]
    let hasChanged = true
    while (hasChanged) {
        hasChanged = false
        for (let i = 0; i < fixedUpdate.length - 1; i++) {
            let currentPage = fixedUpdate[i]
            for (let j = i + 1; j < fixedUpdate.length; j++) {
                const nextPage = fixedUpdate[j]
                if (orderingRules.get(nextPage)?.has(currentPage)) {
                    // Si la page suivante doit être avant la page courante, on les échange
                    fixedUpdate[i] = nextPage
                    fixedUpdate[j] = currentPage
                    currentPage = nextPage
                    hasChanged = true
                }
            }
        }
    }
    return fixedUpdate

}