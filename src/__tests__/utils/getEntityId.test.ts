import getEntityId from "@/utils/getEntityId";

describe("getEntityId", () => {

    it("should return correct entity id from url", () => {
        expect(getEntityId('https://sw-api.starnavi.io/people/5/')).toEqual(5);
    });
});