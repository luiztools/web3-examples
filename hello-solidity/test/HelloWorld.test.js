const HelloWorld = artifacts.require("HelloWorld");

contract('HelloWorld', function (accounts) {
  beforeEach(async () => {
    contract = await HelloWorld.new();
  })

  it('Hello World',  async () => {
    const result = await contract.helloWorld();
    assert(result === "Hello World!");
  })
});
