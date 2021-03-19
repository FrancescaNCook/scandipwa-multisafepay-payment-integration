/**
 * Copyright © 2021 MultiSafepay, Inc. All rights reserved.
 * See DISCLAIMER.md for disclaimer details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa-multisafepay-payment-integration
 * @link https://github.com/MultiSafepay/scandipwa-multisafepay-payment-integration
 *
 */
import AfterpayIn3 from '../component/AfterpayIn3';
import Ideal from '../component/Ideal';
import PayafterEinvoicing from '../component/PayafterEinvoicing';
import DirectBankTransfer from '../component/DirectBankTransfer';
import DirectDebit from '../component/DirectDebit';
import { isMultisafepayPayment, isMultisafepayRecurringPayment } from '../util/Payment';
import BaseComponent from '../component/BaseComponent';

export const MULTISAFEPAY_IDEAL_CODE = 'multisafepay_ideal';
export const MULTISAFEPAY_AFTERPAY_CODE = 'multisafepay_afterpay';
export const MULTISAFEPAY_DIRECTBANKTRANSFER_CODE = 'multisafepay_directbanktransfer';
export const MULTISAFEPAY_DIRECTDEBIT_CODE = 'multisafepay_directdebit';
export const MULTISAFEPAY_EINVOICING_CODE = 'multisafepay_einvoicing';
export const MULTISAFEPAY_IN3_CODE = 'multisafepay_in3';
export const MULTISAFEPAY_PAYAFTER_CODE = 'multisafepay_payafter';

export class CheckoutPaymentsPlugin {
    aroundPaymentRenderMap = (originalMember, instance) => ({
        ...originalMember,
        [MULTISAFEPAY_AFTERPAY_CODE]: this.renderMultisafepayPaymentComponent.bind(instance),
        [MULTISAFEPAY_IN3_CODE]: this.renderMultisafepayPaymentComponent.bind(instance),
        [MULTISAFEPAY_IDEAL_CODE]: this.renderMultisafepayPaymentComponent.bind(instance),
        [MULTISAFEPAY_PAYAFTER_CODE]: this.renderMultisafepayPaymentComponent.bind(instance),
        [MULTISAFEPAY_EINVOICING_CODE]: this.renderMultisafepayPaymentComponent.bind(instance),
        [MULTISAFEPAY_DIRECTBANKTRANSFER_CODE]: this.renderMultisafepayPaymentComponent.bind(instance),
        [MULTISAFEPAY_DIRECTDEBIT_CODE]: this.renderMultisafepayPaymentComponent.bind(instance)
    });

    /**
     *
     * @param props
     * @returns {JSX.Element}
     */
    renderMultisafepayPaymentComponent(props) {
        const {
            selectedPaymentCode,
            paymentMethods,
            onPaymentMethodSelect,
            selectPaymentMethod
        } = props;
        const paymentData =  paymentMethods.find(o => o.code === selectedPaymentCode);

        switch (selectedPaymentCode) {
            case MULTISAFEPAY_IDEAL_CODE:
                return (
                    <Ideal
                        paymentMethods = { paymentMethods }
                        paymentData = { paymentData }
                        onPaymentMethodSelect = { onPaymentMethodSelect }
                        selectPaymentMethod = { selectPaymentMethod }
                    />
                );

            case MULTISAFEPAY_AFTERPAY_CODE:
            case MULTISAFEPAY_IN3_CODE:
                return (
                    <AfterpayIn3
                        paymentMethods = { paymentMethods }
                        onPaymentMethodSelect = { onPaymentMethodSelect }
                        selectedPaymentCode = { selectedPaymentCode }
                    />
                );

            case MULTISAFEPAY_PAYAFTER_CODE:
            case MULTISAFEPAY_EINVOICING_CODE:
                return (
                    <PayafterEinvoicing
                        paymentMethods = { paymentMethods }
                        onPaymentMethodSelect = { onPaymentMethodSelect }
                        selectedPaymentCode = { selectedPaymentCode }
                    />
                );

            case MULTISAFEPAY_DIRECTBANKTRANSFER_CODE:
                return (
                    <DirectBankTransfer
                        paymentMethods = { paymentMethods }
                        onPaymentMethodSelect = { onPaymentMethodSelect }
                        selectedPaymentCode = { selectedPaymentCode }
                    />
                );

            case MULTISAFEPAY_DIRECTDEBIT_CODE:
                return (
                    <DirectDebit
                        paymentMethods = { paymentMethods }
                        onPaymentMethodSelect = { onPaymentMethodSelect }
                        selectedPaymentCode = { selectedPaymentCode }
                    />
                );
        }
    }

    // eslint-disable-next-line no-unused-vars
    aroundRenderSelectedPayment = (args, callback = () => {}, instance) => {
        const { selectedPaymentCode } = instance.props;
        const render = instance.paymentRenderMap[selectedPaymentCode];

        if (!render) {
            return null;
        }

        return render(instance.props);
    };

    /**
     *
     * @param args
     * @param callback
     * @param instance
     * @returns {JSX.Element|*}
     */
    aroundRenderPayment = (args, callback = () => {}, instance) => {
        const method = args[0];
        const { code } = method;

        if (isMultisafepayRecurringPayment(code)) {
            return;
        }

        if (isMultisafepayPayment(code)) {
            const { multisafepay_additional_data: {
                image: src,
                is_preselected: isPreselected
            } } = method;
            const { selectPaymentMethod, selectedPaymentCode } = instance.props;
            const isSelected = selectedPaymentCode === code;

            if (isPreselected) {
                const isSelected = true;
            } else {
                const isSelected = selectedPaymentCode === code;
            }

            return (
                <BaseComponent
                    key={ code }
                    isSelected={ isSelected }
                    method={ method }
                    onClick={ selectPaymentMethod }
                    srcImage={ src }
                />
            );
        }

        return callback.apply(instance, args);
    };

    /**
     *
     * @param args
     * @param callback
     * @param instance
     * @returns {*}
     */
    aroundComponentDidMount = (args, callback = () => {}, instance) => {
        const { paymentMethods, selectPaymentMethod } = instance.props;
        const result = callback.apply(instance, args);

        paymentMethods.map((method, i) => {
            const { code, multisafepay_additional_data} = method;
            const {is_preselected: isPreselected } = multisafepay_additional_data;

            if (isMultisafepayPayment(code) && isPreselected) {
                selectPaymentMethod(method);
            }
        });

        return result;
    };
}

const {
    aroundPaymentRenderMap,
    aroundRenderPayment,
    aroundRenderSelectedPayment,
    aroundComponentDidMount
} = new CheckoutPaymentsPlugin();

export const config = {
    'Component/CheckoutPayments/Component': {
        'member-property': {
            paymentRenderMap: aroundPaymentRenderMap
        },
        'member-function': {
            renderSelectedPayment: aroundRenderSelectedPayment,
            renderPayment: aroundRenderPayment,
            componentDidMount: aroundComponentDidMount
        }
    }
};

export default config;