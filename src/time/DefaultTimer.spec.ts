import DefaultTimer from "./DefaultTimer";
import {expect} from "chai";
import {} from "mocha";
import * as sinon from "sinon";

describe('format', function () {
    const sandbox = sinon.createSandbox();
    let dateNowStub;

    beforeEach(function () {
        dateNowStub = sandbox.stub(Date, "now");
    });

    afterEach(function () {
        sandbox.restore();
    });

    it("should format time diff as a '[H]h [M]m [S]s'", function () {
        //GIVEN
        dateNowStub.onCall(0).returns(10000);
        dateNowStub.onCall(1).returns(20000000);

        const timer = new DefaultTimer();

        //WHEN
        const result = timer.format();

        //THEN
        expect(result).to.equal("5h 33m 10s");
    });
});