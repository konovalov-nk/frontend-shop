<template>
    <div>
        <header>
            <h1>Fortnite Boosted</h1>
        </header>
        <main>
            <div id="steps-bar">
                <Steps :active="active" finish-status="success">
                    <Step title="Choose your package"/>
                    <Step title="Checkout"/>
                    <Step title="Confirm order"/>
                    <Step title="Payment"/>
                    <Step title="Finish"/>
                </Steps>
            </div>
            <div id="content-grid-simple">
                <LoginBar />
                <slot name="content"/>
                <div id="buttons-bar">
                    <slot name="buttons"/>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import { Button, ButtonGroup, Steps, Step } from 'element-ui';
import LoginBar from '@/components/LoginBar.vue';

export default {
  name: 'ContentGrid',
  props: {
    active: 0,
  },
  components: {
    Button, ButtonGroup, LoginBar, Steps, Step,
  },
};
</script>
