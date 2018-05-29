import DefaultTimer from "./DefaultTimer";
import {expect} from "chai";
import {describe, it} from "mocha";
import * as sinon from "sinon";

describe('DefaultTimer', function () {
    const sandbox = sinon.createSandbox();
    let dateNowStub;

    beforeEach(function () {
        dateNowStub = sandbox.stub(Date, "now");
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('format', function () {
        it("should format time diff as a '[H]h [M]m [S]s'", function () {
            //GIVEN
            dateNowStub.onCall(0).returns(0);
            dateNowStub.onCall(1).returns(3661000);

            const timer = new DefaultTimer();

            //WHEN
            const result = timer.format();

            //THEN
            expect(result).to.equal("1h 1m 1s");
        });

        it("should format time diff as a '[M]m [S]s'", function () {
            //GIVEN
            dateNowStub.onCall(0).returns(0);
            dateNowStub.onCall(1).returns(3050000);

            const timer = new DefaultTimer();

            //WHEN
            const result = timer.format();

            //THEN
            expect(result).to.equal("50m 50s");
        });

        it("should format time diff as a '[S]s'", function () {
            //GIVEN
            dateNowStub.onCall(0).returns(0);
            dateNowStub.onCall(1).returns(59000);

            const timer = new DefaultTimer();

            //WHEN
            const result = timer.format();

            //THEN
            expect(result).to.equal("59s");
        });

        it("should format time diff as a '[S]s'", function () {
            //GIVEN
            dateNowStub.onCall(0).returns(0);
            dateNowStub.onCall(1).returns(0);

            const timer = new DefaultTimer();

            //WHEN
            const result = timer.format();

            //THEN
            expect(result).to.equal("0s");
        });
    });
});