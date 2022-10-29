import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("BookDatabse", () => {

  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const BookDatabase = await ethers.getContractFactory("BookDatabase");
    const bookDatabase = await BookDatabase.deploy();

    return { bookDatabase, owner, otherAccount };
  }

  it("Should add book", async () => {
    const { bookDatabase } = await loadFixture(deployFixture);

    await bookDatabase.addBook({
      title: "Criando apps para empresas com Android",
      year: 2015
    });

    expect(await bookDatabase.count()).to.equal(1);
  });

  it('Get Book', async () => {
    const { bookDatabase } = await loadFixture(deployFixture);

    await bookDatabase.addBook({
      title: "Criando apps para empresas com Android",
      year: 2015
    });

    const book = await bookDatabase.getBook(1);
    expect(book.title).to.equal("Criando apps para empresas com Android");
  })

  it('Edit Book', async () => {
    const { bookDatabase } = await loadFixture(deployFixture);

    await bookDatabase.addBook({
      title: "Criando apps para empresas com Android",
      year: 2015
    });

    await bookDatabase.editBook(1, { title: "Criando apps com Android", year: 0 });

    const book = await bookDatabase.getBook(1);
    expect(book.title).to.equal("Criando apps com Android");
    expect(book.year).to.equal(2015);
  })

  it('Remove Book', async () => {
    const { bookDatabase, owner } = await loadFixture(deployFixture);

    await bookDatabase.addBook({
      title: "Criando apps para empresas com Android",
      year: 2015
    });

    await bookDatabase.removeBook(1, { from: owner.address });
    expect(await bookDatabase.count()).to.equal(0);
  })
});
