const assert = require('assert').strict;

var _name = 'Treasure';
var _symbol = 'TRSR';
var _decimals = 18;
var _totalSupply = 1000000;

const TrsrToken = artifacts.require('TrsrToken');

contract('TrsrToken', accounts => {
    

    it('Mints total supply upon deployment and gives it to administrator.', async () => {
        let instance = await TrsrToken.deployed();
        let balance = await instance.totalSupply();
        let adminBalance = await instance.balanceOf(accounts[0]);
        assert.strictEqual(balance.toNumber(), _totalSupply, 'Must = 1,000,000.');
        assert.strictEqual(adminBalance.toNumber(), _totalSupply, 'Admin balance must equal supply balance on initialization');
    });


    it('Initializes contract with correct values.', async () => {
        let instance = await TrsrToken.deployed();
        let name = await instance.name();
        let symbol = await instance.symbol();
        let decimals = await instance.decimals();
        assert.strictEqual(name, _name, 'Should be the same name');
        assert.strictEqual(symbol, _symbol, 'Should be same symbol');
        assert.strictEqual(decimals.toNumber(), _decimals, 'Should be same decimals');
    });


    it('Transfers value from admin to -> user using transfer() function.', async () => {
        // Get instance of deployed contract
        let instance = await TrsrToken.deployed();
        let trsr = instance;
        let value = 100;
        let high_value = 55555555;
        // Name the users
        let admin_account = accounts[0];
        let user_account = accounts[1];
        // Get starting balances
        let balance = await trsr.balanceOf(admin_account);
        let admin_balance_start = balance.toNumber();
        balance = await trsr.balanceOf(user_account);
        let user_balance_start = balance.toNumber();
        // Transfer value
        await trsr.transfer(user_account, value);
        // Get ending balances
        balance = await trsr.balanceOf(admin_account);
        let admin_balance_end = balance.toNumber();
        balance = await trsr.balanceOf(user_account);
        let user_balance_end = balance.toNumber();        
        // Assert starting balances +/- value transfer = ending balances
        assert.strictEqual(admin_balance_start, admin_balance_end + value, 'Not subtracting the correct value form starting balance.');
        assert.strictEqual(user_balance_start, user_balance_end - value, 'Not adding correct value to starting balance.');
        // Transfer value higher than balance
        try {
            let error = await trsr.transfer(user_account, value);
        } catch (err) {
            assert(err.message.indexOf('revert') >= 0, 'Transferring more value than in balance.');
        }
    });
})


//const TrsrToken = artifacts.require("./TrsrToken.sol");
//
//contract('TrsrToken', function(accounts){
//    it('initializes contract with correct initial values', function(){
//        return TrsrToken.deployed().then(function(instance){
//            tokenInstance = instance;
//            return tokenInstance.name();
//        }).then(function(name){
//            assert.strictEqual(name, 'Treasure', 'has correct name.');
//            return tokenInstance.symbol();
//        }).then(function(symbol){
//            assert.strictEqual(symbol, 'TRSR', 'has correct symbol.');
//            return tokenInstance.decimals();
//        }).then(function(decimals){
//            assert.strictEqual(decimals.toNumber(), 18, 'has the same decimals');
//        });
//    })
//   
//    it('mints total supply upon deployment and gives it to administrator', () =>
//    TrsrToken.deployed()
//    .then( instance => instance.totalSupply())
//    .then( balance => {
//                assert.strictEqual(balance.toNumber(), _totalSupply, 'Must equal 1,000,000 total supply.');
//            }));
//    
//    
//    it('mints total supply upon deployment and gives it to administrator', function(){
//        return TrsrToken.deployed().then(function(instance){
//            tokenInstance = instance;
//            return tokenInstance.totalSupply();
//        }).then(function(totalSupply){
//            assert.strictEqual(totalSupply.toNumber(),1000000, 'Sets the total supply to 1,000,000.');
//            return tokenInstance.balanceOf(accounts[0]);
//        }).then(function(adminBalance){
//            assert.strictEqual(adminBalance.toNumber(), 1000000, 'Allocates initial supply to administrative account.');
//        });
//    });
//})