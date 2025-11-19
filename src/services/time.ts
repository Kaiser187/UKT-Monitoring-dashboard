export function prettyprintDate(date: Date, seconds = false): string {
    return new Intl.DateTimeFormat("de-DE", {
        hour: 'numeric',
        minute: '2-digit',
        second: seconds ? '2-digit' : void null
    })
        .format(date)
}