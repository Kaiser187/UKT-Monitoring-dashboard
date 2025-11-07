export default async function GetApi() {
    const apiUrl = new URL("/api");
    return (await fetch(apiUrl));
}
