import getCurrentPageFromUrl from "@/utils/getCurrentPageFromUrl";
describe("getCurrentPageFromUrl", () => {
    it("should return correct value for null and undefined url", () => {
        expect(getCurrentPageFromUrl(null)).toBe(1);
        expect(getCurrentPageFromUrl(undefined)).toBe(1);
    });

    it("should return correct value for url without page", () => {
        expect(getCurrentPageFromUrl('https://sw-api.starnavi.io/people/')).toBe(1);
        expect(getCurrentPageFromUrl('https://sw-api.starnavi.io/people')).toBe(1);
    });

    it("should return correct value for url with page", () => {
        expect(getCurrentPageFromUrl('https://sw-api.starnavi.io/people/?page=3')).toBe(3);
    });
});