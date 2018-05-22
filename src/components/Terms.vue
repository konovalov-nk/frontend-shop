<template>
    <div>
        <p>
            By accessing this web site, you are agreeing to be bound by these web site Terms and Conditions of Use, all
            applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
            If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials
            contained in this web site are protected by applicable copyright and trade mark law.<br>
            <br>
        </p>

        <a id="modal-link" @click="toggleModal">Terms & Conditions of Use</a>

        <div v-if="this.modal_visible" id="terms-modal" :class="{modal: true, visible: this.modal_visible}" @click="toggleModal">
            <div class="modal-content">
                Terms & Conditions of Use: <br>
                1. General Property T& C: Fortniteboosted.com sells time in the form of the services we provide. We do not
                claim to be owners, representatives or endorsers of any brands, copyrights, or intellectual properties
                displayed on our website – they remain property of their respective owners.<br>
                <br>
                2. Purchase Delivery: All services purchased through our website will be completed in a timely fashion by
                highly qualified individuals. All products and services available for purchase on this website will be
                delivered via electronic means or in-game services. We do not offer any physical goods or property of any
                kind. Although we have many practices in place to ensure quick responses and turnaround times for services,
                we cannot guarantee that no act of nature, catastrophic disaster, power failure, or related act of
                uncertainty will delay any piece of the process of utilizing our services. We take every precaution possible
                to prevent delays, and stand by our 100% Money Back Guarantee, in which we will refund 100% of your order
                price via the payment method used, if you are not completely satisfied with our services.<br>
                <br>
                3. Payments: All payments may be made by the methods offered on our website. You shall be solely responsible
                to complete payment for services through our 3rd party payment processor, and subsequently agree to the
                terms of use of their service, and any associated websites or services used during the payment process. We
                reserve the right to cancel payment request at any time, for any reason. You are responsible for any taxes,
                fees, or any other additional costs listed and associated with the purchase and delivery of your services
                from us or our payment provider. You are responsible for the security of your web browser and computer at
                all times, and release Forniteboosted.com from any possible damages incurred by unauthorized use of your
                payment account/details by yourself or any other individual.<br>
                <br>
                4. Use of your Account: By purchasing our services, you agree to have your account accessed temporarily to
                complete the Fortnite boosting services . Your character will not be used for any other means than the
                actions necessary to complete your order. We will not use your account to steal, harass, contact others, or
                otherwise carry out any act of malicious intent during our use. You agree to allow our boosters change
                account settings in order to optimize completion of your project.<br>
                <br>
                5. Money Back Guarantee: If you are dis-satisfied in any way with the services you were provided, we will
                refund 100% of your purchase price, minus any additional fees, taxes or other costs associated with payment
                and service processing. We do reserve the right to deny your claim for a refund, at our discretion, for
                suspected abuse or otherwise malicious intent.<br>
                6. Customer Duties & Responsibilities: You, as the customer, are solely responsible for maintaining the
                security and confidentiality of your character account and details, as well as preventing unauthorized
                access or use of your computer, electronic devices, means of electronic communications or otherwise delicate
                information that could result in monetary loss, or loss of any other means. You agree to accept sole
                responsibility for all activities that occur on your account and with your login details, and waive any
                right to pursue legal or any other alternative means of action towards Fortniteboosted.com. If you are under
                the age of 18, you agree to use our services and issue payment only with the explicit permission of your
                legal guardian.<br>
                <br>
                You agree to cooperate with any possible investigation or questioning regarding misuse, abuse, fraud,
                false-claims or otherwise malicious activity involving our website or associated services. Buy purchasing
                our services, you agree that you fully understand what services you are paying for, and you agree to provide
                accurate information regarding your demographics, payment details, account details, and any other
                information requested of you. <br>
                <br>
                You explicitly agree to indemnify and hold Forniteboosted.com and its partners & employees harmless from any
                demands, claims, monetary or physical loss incurred by using our website and associated services. You agree
                to accept explicit responsibility to personally ensuring that use of our website or services is not illegal,
                a crime, or considered otherwise criminal in your city, state, country, territory or other jurisdiction.<br>
                <br>
                7. Changes & Updates: We reserve the right to change or update our terms and conditions at any time, without
                any prior written, electronic, verbal, or other form of notice. You agree that any terms or conditions not
                explicitly explained by this document are to be applied, interpreted, and otherwise generated at the sole
                discretion of the owner of Fortniteboosted.com.<br>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Terms',
  data() {
    return {
      modal_visible: false,
    };
  },
  methods: {
    toggleModal() {
      this.modal_visible = !this.modal_visible;
    },
  },
};
</script>

<style scoped lang="less">
    #modal-link {
        color: #f26722;
        cursor: pointer;
    }
    .modal.visible {
        display: block;
    }
</style>
