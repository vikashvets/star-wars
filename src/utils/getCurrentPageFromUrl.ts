export default function getCurrentPageFromUrl(url?: string | null) {
    return url ? parseInt(url.split('=')[1]) || 1 : 1;
}