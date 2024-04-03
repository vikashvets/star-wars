// API response does not contain information about the current page, so we need to extract it from the URL
export default function getCurrentPageFromUrl(url?: string | null) {
    return url ? parseInt(url.split('=')[1]) || 1 : 1;
}