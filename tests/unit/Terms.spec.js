import { expect } from 'chai';
import { shallow } from '@vue/test-utils';
import Terms from '@/components/Terms.vue';

describe('Terms.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallow(Terms, {
      propsData: { msg },
    });
    expect(wrapper.text()).to.include(msg);
  });
});
