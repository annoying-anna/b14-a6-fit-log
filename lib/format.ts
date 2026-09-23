/** "full body" -> "Full Body" — used for the category tags. */
export function titleCase(value: string): string {
  return value
    .split(" ")
    .map((word) => (word.length > 0 ? word[0].toUpperCase() + word.slice(1).toLowerCase() : word))
    .join(" ");
}

/** 1 -> "1 lift", 5 -> "5 lifts" */
export function pluralize(count: number, singular: string): string {
  return `${count} ${count === 1 ? singular : `${singular}s`}`;
}
