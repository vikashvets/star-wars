import {fireEvent, render, screen} from "@testing-library/react";
import Pagination from "@/app/_components/Pagination";
describe("Pagination", () => {
    const paginationData = {
        totalItems: 82,
        nextPageUrl: 'https://sw-api.starnavi.io/people/?page=7',
        previousPageUrl: 'https://sw-api.starnavi.io/people/?page=5',
        currentPage: 5
    };
    const onPaginationClick = jest.fn();

    it("renders pages count", () => {
        render(<Pagination pagination={paginationData} onPaginationClick={onPaginationClick}/>);
        const pagesInfo = screen.getByText("Page 5 of 9");
        expect(pagesInfo).toBeTruthy();
    });

    it("should call onPaginationClick on next page click", () => {
        render(<Pagination pagination={paginationData} onPaginationClick={onPaginationClick}/>);
        const nextPageButton = screen.getByLabelText("Next page");
        expect(nextPageButton).toBeTruthy();
        nextPageButton.click();
        expect(onPaginationClick).toHaveBeenCalledWith(paginationData.nextPageUrl);
    });

    it("should call onPaginationClick on previous page click", () => {
        render(<Pagination pagination={paginationData} onPaginationClick={onPaginationClick}/>);
        const previousPageButton = screen.getByLabelText("Previous page");
        expect(previousPageButton).toBeTruthy();
        previousPageButton.click();
        expect(onPaginationClick).toHaveBeenCalledWith(paginationData.previousPageUrl);
    });

    it("should show validation message when entered invalid page number and disable go to button", () => {
        render(<Pagination pagination={paginationData} onPaginationClick={onPaginationClick}/>);
        const input = screen.getByRole("spinbutton", {name: "pageInput"});
        expect(input).toBeTruthy();
        fireEvent.change(input, {target: {value: '-3'}});
        const validationText = screen.getByText("Type a number from 1 to 9");
        const goToButton = screen.getByRole("button", {name: "Go to page"});
        expect(validationText).toBeTruthy();
        expect(goToButton).toBeDisabled();
    });

    it("should call onPaginationClick on form submit", () => {
        render(<Pagination pagination={paginationData} onPaginationClick={onPaginationClick}/>);
        const input = screen.getByRole("spinbutton", {name: "pageInput"});
        fireEvent.change(input, {target: {value: '3'}});
        screen.getByRole("button", {name: "Go to page"}).click();
        expect(onPaginationClick).toHaveBeenCalledWith('/people/?page=3');
    });
});