import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("HelloWorld", () => {

  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const helloWorld = await HelloWorld.deploy();

    return { helloWorld, owner, otherAccount };
  }

  it("Should Hello the world", async () => {
    const { helloWorld } = await loadFixture(deployFixture);

    expect(await helloWorld.helloWorld()).equal("Hello World!");
  });
});
