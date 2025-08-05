import { HTTPTransport } from "./HTTPTransport";

describe('HTTPTransport', () => {
  test('get возвращает Promise<XMLHttpRequest>', () => {
    expect(HTTPTransport.get('/test')).toBeInstanceOf(Promise<XMLHttpRequest>);
  })

  test('post возвращает Promise<XMLHttpRequest>', () => {
    expect(HTTPTransport.post('/test')).toBeInstanceOf(Promise<XMLHttpRequest>);
  })

  test('put возвращает Promise<XMLHttpRequest>', () => {
    expect(HTTPTransport.put('/test')).toBeInstanceOf(Promise<XMLHttpRequest>);
  })

  test('delete возвращает Promise<XMLHttpRequest>', () => {
    expect(HTTPTransport.delete('/test')).toBeInstanceOf(Promise<XMLHttpRequest>);
  })
})
