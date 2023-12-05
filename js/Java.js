
var CLIENT_ID = 'AVl-_TXkDffc4WjgvKwp6aJjLy4-iIsxwp3IGkZUFxRwc3hDOqetRYBz0b6d5dPmk8fi4VqpHwM5FZoW';
var SECRET_KEY = 'EMsF2_NeAWlKLeMciMvPOd9VH8kG0sb1wQXZ4LRnAk8QQJLHJHe3B0qfcYqH1FXFKeOQqhFjjoz_Z-Lr';

// Load the PayPal SDK script
var script = document.createElement('script');
script.src = 'https://www.paypal.com/sdk/js?client-id=' + CLIENT_ID;
script.async = true;

// Add the script tag to the head
document.head.appendChild(script);

// Render the PayPal button into #paypal-button-container
script.onload = function () {
    paypal.Buttons({
        createOrder: function(data, actions) {
            // Set up the transaction
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        currency: 'MXN',
                        value: '100.00'
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            // Capture the funds from the transaction
            return actions.order.capture().then(function(details) {
                // Show a success message to the buyer
                alert('Transaccion completada ' + details.payer.name.given_name);
            });
        }
    }).render('#paypal-button-container');
};
