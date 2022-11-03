export function classNameJoiner(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}
