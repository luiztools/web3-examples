import { ethers } from "hardhat";

async function main() {

  const BookDatabase = await ethers.getContractFactory("BookDatabase");
  const bookDatabase = await BookDatabase.deploy();

  await bookDatabase.deployed();
  console.log(`Contract deployed to ${bookDatabase.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
