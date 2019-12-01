---
to: "tests/views/<%= h.changeCase.kebab(name) %>.spec.ts"
---
<%
  let fileName = h.changeCase.pascal(name)
  const importName = h.changeCase.pascal(fileName)
%>import { mount, Wrapper } from '@vue/test-utils';
import <%= importName %> from '@/views/<%= fileName %>.vue';

describe('@views/<%= fileName %>', () => {
  let wrapper: Wrapper<<%= fileName %>>;

  it('exports a valid component', () => {
    wrapper = mount(<%= importName %>);
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
