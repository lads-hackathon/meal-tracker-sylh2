export async function apiCall(path: string) {
    return await (await fetch(`http://localhost:8000${path}`)).json();
}