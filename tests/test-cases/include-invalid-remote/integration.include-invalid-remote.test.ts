import {WriteStreamsMock} from "../../../src/write-streams-mock";
import {handler} from "../../../src/handler";
import {assert} from "../../../src/asserts";
import {initSpawnSpy} from "../../mocks/utils.mock";
import {WhenStatics} from "../../mocks/when-statics";
import AxiosMockAdapter from "axios-mock-adapter";
import axios from "axios";

beforeAll(() => {
    initSpawnSpy(WhenStatics.all);
});

test("include-invalid-remote", async () => {
    const mock = new AxiosMockAdapter(axios);
    mock.onGet("https://gitlab.com/firecow/gitlab-ci-local-includes/-/raw/master/.itlab-http.yml").reply(404);
    try {
        const writeStreams = new WriteStreamsMock();
        await handler({
            cwd: "tests/test-cases/include-invalid-remote",
        }, writeStreams);
        expect(true).toBe(false);
    } catch (e) {
        assert(e instanceof Error, "e is not instanceof Error");
        expect(e.message).toBe("Remote include could not be fetched https://gitlab.com/firecow/gitlab-ci-local-includes/-/raw/master/.itlab-http.yml Error: Request failed with status code 404");
    }
});
