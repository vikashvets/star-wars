// API response does not contain resource ID, so we need to extract it from the URL
export default function getEntityId(url: string) {
    const parts =  url.split('/');
    return parseInt(parts[parts.length - 2]);
}