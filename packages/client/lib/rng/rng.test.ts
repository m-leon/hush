import rewire from "rewire"
const rng = rewire("@/lib/rng/rng")
const _getSalt = rng.__get__("_getSalt")
// @ponicode
describe("rng.getBytes", () => {
    test("0", async () => {
        await rng.getBytes(1, "foo bar")
    })

    test("1", async () => {
        await rng.getBytes(3, "Hello, world!")
    })

    test("2", async () => {
        await rng.getBytes(2, "This is a Text")
    })

    test("3", async () => {
        await rng.getBytes(3, "foo bar")
    })

    test("4", async () => {
        await rng.getBytes(1, "Foo bar")
    })

    test("5", async () => {
        await rng.getBytes(Infinity, "")
    })
})

// @ponicode
describe("rng.getHash", () => {
    test("0", async () => {
        await rng.getHash("This is a Text")
    })

    test("1", async () => {
        await rng.getHash("foo bar")
    })

    test("2", async () => {
        await rng.getHash("Foo bar")
    })

    test("3", async () => {
        await rng.getHash("Hello, world!")
    })

    test("4", async () => {
        await rng.getHash("")
    })
})

// @ponicode
describe("_getSalt", () => {
    test("0", async () => {
        await _getSalt("Foo bar")
    })

    test("1", async () => {
        await _getSalt("foo bar")
    })

    test("2", async () => {
        await _getSalt("Hello, world!")
    })

    test("3", async () => {
        await _getSalt("This is a Text")
    })

    test("4", async () => {
        await _getSalt("")
    })
})
