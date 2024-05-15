import React from 'react'
import { shallow } from 'enzyme/build'
import LeadCapture from './LeadCapture'
import renderer from 'react-test-renderer';

  
  describe('LeadCapture', () => {
    it('mounts LeadCapture without crashing', () => {
      const wrapper = shallow(<LeadCapture/>)
      wrapper.unmount()
    })
    test('snapshots', () => {
    const component = renderer.create(
    <LeadCapture />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    });
    });