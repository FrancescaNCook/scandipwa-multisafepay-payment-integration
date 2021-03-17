<p align="center">
  <img src="https://www.multisafepay.com/img/multisafepaylogo.svg" width="400px" position="center">
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/29531824/104035590-fc25fb00-51da-11eb-9171-d5f2e9211753.png" width="350px" position="center">
</p>



# MultiSafepay payments support extension for ScandiPWA theme

MultiSafepay Payments frontend integration for ScandiPWA 4.x theme with Magento 2 plugin as backend system.

## About MultiSafepay ##
MultiSafepay is a collecting payment service provider which means we take care of the agreements, technical details and payment collection required for each payment method. You can start selling online today and manage all your transactions from one place.

## Supported Payment Methods ##
The supported Payment Methods & Giftcards for this plugin can be found over here: [Payment Methods & Giftcards](https://docs.multisafepay.com/plugins/magento2/faq/#available-payment-methods-in-magento-2)

## Requirements
- To use the plugin you need a MultiSafepay account. You can create a test account on https://testmerchant.multisafepay.com/signup
- Installed <a href="https://github.com/MultiSafepay/magento2-graphql" target="_blank">MultiSafepay Magento 2 GraphQL</a> plugin for support GraphQL queries.
- Meet other requirements for the ScandiPWA and Magento on <a href="https://docs.scandipwa.com/getting-started/getting-started/magento-integration#prerequisites" target="_blank">official ScandiPWA docs</a>

## Installation Guide

1. First, the MultiSafepay plugin for supporting GraphQL queries needs to be installed. The installation guide can be found <a href="https://github.com/MultiSafepay/magento2-graphql" target="_blank">here</a>.    
   **Note:** By installing the MultiSafepay GraphQL plugin, the MultiSafepay Core, Frontend and Adminhtml plugins will also be installed.
2. Configure the MultiSafepay payment methods and API keys in the Magento admin panel.  
3. Configure cancel and success return redirect URL's
```text
Stores → Configuration → MultiSafepay → General Settings → Advanced Settings → Use custom return urls for PWA storefront integration
```
- For the 'custom redirect URL after canceling the payment' we suggest using the next link: *{{store.secure_base_url}}cart*  
- For the 'Custom "Success page" url' we suggest using the next link: *{{store.secure_base_url}}checkout/success?incrementId={{order.increment_id}}&paymentCode={{payment.code}}*
4. Install the ScandiPWA frontend plugin from this repository into your ScandiPWA theme according to this <a href="https://docs.scandipwa.com/stack/extensions/installing-an-extension" target="_blank">installation guide</a>.
5. Explore the checkout in your ScandiPWA application:  
<img width="1000" alt="Screenshot 2021-03-12 at 12 56 42" src="https://user-images.githubusercontent.com/78361324/110949265-b0124680-8342-11eb-8d99-55c926e76f3d.png">


## Support
You can create issues on our repository. If you need any additional help or support, please contact <a href="mailto:integration@multisafepay.com">integration@multisafepay.com</a>

We are also available on our Magento Slack channel [#multisafepay-payments](https://magentocommeng.slack.com/messages/multisafepay-payments/).
Feel free to start a conversation or provide suggestions as to how we can refine our plugin.

## A gift for your contribution
We look forward to receiving your input. Have you seen an opportunity to change things for better? We would like to invite you to create a pull request on GitHub.
Are you missing something and would like us to fix it? Suggest an improvement by sending us an [email](mailto:integration@multisafepay.com) or by creating an issue.

What will you get in return? A brand new designed MultiSafepay t-shirt which will make you part of the team!

## License
[Open Software License (OSL 3.0)](https://github.com/MultiSafepay/Magento2Msp/blob/master/LICENSE.md)

## Want to be part of the team?
Are you a developer interested in working at MultiSafepay? [View](https://www.multisafepay.com/careers/#jobopenings) our job openings and feel free to get in touch with us.
