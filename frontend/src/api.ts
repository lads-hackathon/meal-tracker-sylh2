export async function apiCall(path: string) {
    return await (await fetch(`http://129.153.148.242:8000${path}`)).json();
}