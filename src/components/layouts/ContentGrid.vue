<template>
    <div>
        <header>
            <h1>Fortnite Boosted</h1>
        </header>
        <main>
            <div id="steps-bar">
                <Steps :active="active" finish-status="success">
                    <Step title="Choose your package"></Step>
                    <Step title="Checkout"></Step>
                    <Step title="Confirm order"></Step>
                    <Step title="Finish"></Step>
                </Steps>
            </div>
            <div id="content-grid">
                <slot name="content"></slot>
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
