const LuizCoin = artifacts.require("LuizCoin");
const BN = require("bn.js");

contract('LuizCoin', function (accounts) {

  const DECIMALS = new BN(18);

  beforeEach(async () => {
    contract = await LuizCoin.new();
  })

  it("Should put total supply LuizCoin in the admin account", async () => {
    const balance = await contract.balanceOf(accounts[0]);
    const totalSupply = new BN(1000).mul(new BN(10).pow(DECIMALS));
    assert(balance.eq(totalSupply), "Total supply wasn't in the first account");
  });

  it("Should has the correct name", async () => {
    const name = await contract.name();
    assert(name === "LuizCoin", "The name is wrong");
  });

  it("Should has the correct symbol", async () => {
    const symbol = await contract.symbol();
    assert(symbol === "LUC", "The symbol is wrong");
  });

  it("Should has the correct decimals", async () => {
    const decimals = await contract.decimals();
    assert(decimals.eq(DECIMALS), "The decimals are wrong");
  });

  it("Should transfer", async () => {
    const qty = new BN(1).mul(new BN(10).pow(DECIMALS));

    const balanceAdminBefore = await contract.balanceOf(accounts[0]);
    const balanceToBefore = await contract.balanceOf(accounts[1]);

    await contract.transfer(accounts[1], qty);

    const balanceAdminNow = await contract.balanceOf(accounts[0]);
    const balanceToNow = await contract.balanceOf(accounts[1]);

    assert(balanceAdminNow.eq(balanceAdminBefore.sub(qty)), "The admin balance is wrong");
    assert(balanceToNow.eq(balanceToBefore.add(qty)), "The to balance is wrong");
  });

  it("Should NOT transfer", async () => {
    const aboveSupply = new BN(1001).mul(new BN(10).pow(DECIMALS));

    try {
      await contract.transfer(accounts[1], aboveSupply);
      assert.fail("The transfer should have thrown an error");
    }
    catch (err) {
      assert.include(err.message, "revert", "The error message should contain 'revert'");
    }
  });

  it("Should approve", async () => {
    const qty = new BN(1).mul(new BN(10).pow(DECIMALS));

    await contract.approve(accounts[1], qty);
    const allowedAmount = await contract.allowance(accounts[0], accounts[1]);

    assert(qty.eq(allowedAmount), "The allowed amount is wrong");``
  });

  it("Should transfer from", async () => {
    const qty = new BN(1).mul(new BN(10).pow(DECIMALS));

    const allowanceBefore = await contract.allowance(accounts[0], accounts[1]);
    const balanceAdminBefore = await contract.balanceOf(accounts[0]);
    const balanceToBefore = await contract.balanceOf(accounts[1]);

    await contract.approve(accounts[1], qty);
    await contract.transferFrom(accounts[0], accounts[1], qty, { from: accounts[1] });

    const allowanceNow = await contract.allowance(accounts[0], accounts[1]);
    const balanceAdminNow = await contract.balanceOf(accounts[0]);
    const balanceToNow = await contract.balanceOf(accounts[1]);

    assert(allowanceBefore.eq(allowanceNow), "The allowance is wrong");
    assert(balanceAdminNow.eq(balanceAdminBefore.sub(qty)), "The admin balance is wrong");
    assert(balanceToNow.eq(balanceToBefore.add(qty)), "The to balance is wrong");
  });

  it("Should NOT transfer from", async () => {
    const qty = new BN(1).mul(new BN(10).pow(DECIMALS));

    try {
      await contract.transferFrom(accounts[0], accounts[1], qty);
      assert.fail("The transferFrom should have thrown an error");
    }
    catch (err) {
      assert.include(err.message, "revert", "The error message should contain 'revert'");
    }
  });

});
