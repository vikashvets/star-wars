export default function getEntityId(url: string) {
    const parts =  url.split('/');
    return parseInt(parts[parts.length - 2]);
}