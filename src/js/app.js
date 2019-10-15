App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',
    loading: false,
    trsrPrice: 1000000000000000,
    trsrSold: 0,
    tokensAvailable: 100000,

    init: function () {
        console.log("App initialized...")
        return App.initWeb3();
    },

    initWeb3: function() {
        if (typeof web3 !== 'undefined') {
            // If a web3 instance is already provided by meta mask
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } else {
            // Default instance if none provided
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
            web3 = new Web3(App.web3Provider);
        }
        console.log("Web3 initializing...")
        console.log(App.web3Provider)
        return App.initContracts();
    },

    initContracts: function() {
        $.getJSON("TrsrTokenCrowdsale.json", function(trsrTokenCrowdsale) {
            App.contracts.trsrTokenCrowdsale = TruffleContract(trsrTokenCrowdsale);
            App.contracts.trsrTokenCrowdsale.setProvider(App.web3Provider);
            App.contracts.trsrTokenCrowdsale.deployed().then(function(trsrTokenCrowdsale){
                console.log("Trsr Token Sale Address:", trsrTokenCrowdsale.address);
            });
        }).done(function(){
            $.getJSON("TrsrToken.json", function(trsrToken) {
                App.contracts.TrsrToken = TruffleContract(trsrToken);
                App.contracts.TrsrToken.setProvider(App.web3Provider);
                App.contracts.TrsrToken.deployed().then(function(trsrToken){
                    console.log("Trsr Token Address:", trsrToken.address);
                });

                //App.listenForEvents();
                return App.render();
            });
        })
    },

    // Listen for events emmitted from contract
    //listenForEvents: function() {
    //    App.contracts.trsrTokenCrowdsale.deployed().then(function(instance) {
    //        instance.TokenPurchased({}, {
    //            fromBlock: 0,
    //            toBlock: 'latest',
    //        }).watch(function(error, event){
    //            console.log("Event Triggered", event);
    //            App.render();
    //        })
    //    })
    //},

    render: function() {
        if (App.loading) {
            return;
        }
        App.loading = true;

        var loader = $('#loader');
        var content = $('#content');

        loader.show();
        content.hide();

        // Load Acc data
        web3.eth.getCoinbase(function(err, account){
            if(err == null) {
                App.account = account;
                $('#accountAddress').html("Your Account: " + account);
            }
        })

        // Load token sale contract
        App.contracts.trsrTokenCrowdsale.deployed().then(function(instance){
            trsrTokenCrowdsaleInstance = instance;
            return trsrTokenCrowdsaleInstance.trsrPrice();
        }).then(function(trsrPrice){
            App.trsrPrice = trsrPrice;
            $('.token-price').html(web3.fromWei(App.trsrPrice, "ether"));
            return trsrTokenCrowdsaleInstance.trsrSold();
        }).then(function(trsrSold){
            App.trsrSold = trsrSold.toNumber();
            $('.tokens-sold').html(App.trsrSold);
            $('.tokens-available').html(App.tokensAvailable);

            var progressPercent = (Math.ceil(App.trsrSold) / App.tokensAvailable) * 100;
            $('#progress').css('width', progressPercent + '%');

            // Load token contract
            App.contracts.TrsrToken.deployed().then(function(instance){
                trsrTokenInstance = instance;
                return trsrTokenInstance.balanceOf(App.account);
            }).then(function(balance){
                $('.dapp-balance').html(balance.toNumber());
                App.loading = false;
                loader.hide();
                content.show();
            })
            
            //let instance = await App.contracts.TrsrToken.deployed()
            //let balance_App_account = await instance.balanceOf(App.account);
            //$('.dapp-balance').html(balance.toNumber());
            //App.loading = false;
            //loader.hide();
            //content.show();
        });
    },

    purchaseTokens: function() {
        $('#content').hide();
        $('#loader').show();
        var numberOfTokens = $('#numberOfTokens').val();
        App.contracts.trsrTokenCrowdsale.deployed().then(function(instance) {
          return instance.purchaseTokens(numberOfTokens, {
            from: App.account,
            value: numberOfTokens * App.trsrPrice,
            gas: 500000 // Gas limit
          });
        }).then(function(result) {
          console.log("Tokens bought...")
          $('form').trigger('reset') // reset number of tokens in form
          // Wait for Sell event
        });
      }
    //purchaseTokens: async () => {
    //    $('#content').hide();
    //    $('#loader').show();
    //    var amountTokens = $('#amountTokens').val();
    //    let instance = await App.contracts.trsrTokenCrowdsale.deployed();
    //    let tokenPurchase = await instance.purchaseTokens(amountTokens, {
    //        from: App.account,
    //        value: amountTokens * App.trsrPrice,
    //        gas: 500000 // Gas limit
    //    });
    //    console.log("Tokens purchased...")
    //    $('form').trigger('reset') // reset amount of tokens in form
    //    // Wait for the Tokens Purchased event
    //}
}

$(function() {
    $(window).on(function() {
        App.init();
    });
});

window.onload = function() {
    App.init();
}