import Component from "./Component";

describe('Component', () => {
  const didMountMock  = jest.fn();
  const didUpdateMock = jest.fn();

  class MockComponent extends Component<{ title: string }> {
    render() {
      const fragment = new DocumentFragment();
      const element = document.createElement('div');
      element.textContent = this.props?.title ?? ''
      fragment.append(element)
      return fragment;
    }

    protected componentDidMount() {
      didMountMock();
    }

    protected componentDidUpdate() {
      didUpdateMock();
    }
  }

  test('Компонент рендерит HTMLElement ', () => {
    const component = new MockComponent({ title: 'Пропсы' });
    const element = component.element;

    expect(element).toBeInstanceOf(HTMLElement);
    expect(element?.textContent).toBe('Пропсы');
  })

  test('Компонент обновляется пропсы', () => {
    const component = new MockComponent({ title: 'Старый' });
    component.props = { title: 'Новый' };

    expect(component.props?.title).toBe('Новый');
  });

  test('Вызывает componentDidMount', () => {
    const component = new MockComponent();
    component.dispatchComponentDidMount();

    expect(didMountMock).toHaveBeenCalled();
  })

  test('Вызывает componentDidUpdate', () => {
    const component = new MockComponent({ title: 'Пропсы'});
    component.props = { title: 'Новые пропсы' };

    expect(didUpdateMock).toHaveBeenCalled();
  })
})
