export async function apiCall(path: string) {
    return await (await fetch(`http://127.0.0.1:8000${path}`)).json();
}