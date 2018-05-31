<template>
    <div id="faq-none">
        <h2>FAQ:</h2>
        <div id="faq-answers">
            <el-collapse v-model="active_name">
                <el-collapse-item title="How long will it take you to finish my boost?" name="1">
                    <p>Once your order & payment is received, our team members will contact you by your preferred method
                        within
                        10 minutes and will assign the work to one of our highly skilled players, who's sole goal is to
                        complete
                        the order as quickly as possible. Unlike most of our competitors, we have a large network of
                        top-tier
                        players, allowing us to finish most of our orders within several hours, not days. <br><br>

                        Completion of your boosting will vary slightly based on the package you selected. Orders
                        requesting more
                        wins will subsequently take more time to complete. Our players excel in boosting quickly and
                        effectively, giving you the quickest turnaround times possible by any Fortnite boosting
                        services.
                    </p>
                </el-collapse-item>
                <el-collapse-item title="How does duo queue and squad work?" name="2">
                    <p>Our duo queue and squad boosting services are a premium option for players that are looking to
                        not only
                        advance their account, but receive real-time feedback on their game play by experts. These
                        services work
                        by allowing you to plan a game play time schedule that works best for you. You'll be playing on
                        your own
                        account and paired up with an expert (duo) or experts (squad) who will give you real time
                        feedback via
                        voice communication. Our skillful players will guide you during game play to allow you to score
                        wins,
                        while receiving professional Fortnite strategy coaching.
                    </p>
                </el-collapse-item>
                <el-collapse-item title="How does this service work?" name="3">
                    <p>Our boosting roster consists of top 100 players that are able to make wins happen, and make them
                        happen
                        quick! Our experts will login to your account and begin generating wins and quickly boost your
                        rank
                        without you having to do any more than purchase through our website.<br><br>

                        All methods of communication with our operations team and boosting experts (if applicable), will
                        be
                        discussed in detail with your order confirmation.
                    </p>
                </el-collapse-item>
                <el-collapse-item title="Can I get a refund?" name="4">
                    <p>If you are dis-satisfied in any way with the services you were provided, we will refund 100% of
                        the
                        purchase price. 100% Money Back Guarantee. We stand behind the quality, speed and
                        professionalism of our
                        work every time.
                    </p>
                </el-collapse-item>
                <el-collapse-item title="Is it possible for my account to be banned?" name="5">
                    <p>Our Fortnite rank boosting services aren't only a cost & time effective way to advance your
                        account, they
                        are also incredibly secure and private. Our boosting professionals will not attempt to
                        communicate with
                        your friends during game play. They have a strict & clear focus of completing your boost as
                        quickly as
                        possible, without interruption.<br><br>

                        We have several measures in place to ensure the safety of your account while we complete your
                        order. Our
                        boosters utilize VPN services that allow us to route through a network of IP addresses to avoid
                        throwing
                        up red flags. We pride ourselves on the fact that we have completed thousands of client orders
                        without
                        any accounts being banned.
                    </p>
                </el-collapse-item>
            </el-collapse>
        </div>

        <Terms/>
    </div>
</template>

<script>
import Terms from '@/components/Terms.vue';

export default {
  name: 'Faq',
  props: {},
  data: () => ({
    active_name: '1',
  }),
  components: {
    Terms,
  },
};
</script>

<style scoped lang="less">
</style>
