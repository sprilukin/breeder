import {add} from "./test";
import {expect} from "chai";
import {} from "mocha";

describe('add', function () {
    it("should add two numbers", function () {
        //GIVEN

        //WHEN
        const result = add(1, 2);

        //THEN
        expect(result).to.equal(3, "should equal to 3");
    });
});