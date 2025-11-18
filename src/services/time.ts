export function prettyprintDate(date: Date): string {
    return new Intl.DateTimeFormat("de-DE", {
        hour: 'numeric',
        minute: '2-digit',
    })
        .format(date)
}