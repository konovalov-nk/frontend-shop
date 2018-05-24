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
                    <Step title="Finish"/>
                </Steps>
            </div>
            <div id="content-grid-simple">
                <slot name="content"/>
                <div id="buttons-bar">
                    <slot name="buttons"/>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import { Steps, Step } from 'element-ui';

export default {
  name: 'ContentGrid',
  props: {
    active: 0,
  },
  components: {
    Steps, Step,
  },
};
</script>
