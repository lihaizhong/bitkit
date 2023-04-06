import { MainPoint } from '../src'

beforeAll(() => {
  console.info('global beforeAll invoked!')
})

beforeEach(() => {
  console.info('global beforeEach invoked!')
})

afterEach(() => {
  console.info('global afterEach invoked!')
})

afterAll(() => {
  console.info('global afterAll invoked!')
})

describe('TEST LIFECYCLE', () => {
  beforeAll(() => {
    console.info('local beforeAll invoked!')
  })

  beforeEach(() => {
    console.info('local beforeEach invoked!')
  })

  afterEach(() => {
    console.info('local afterEach invoked!')
  })

  afterAll(() => {
    console.info('local afterAll invoked!')
  })

  test('test lifecycle', () => {
    console.info('test invoked!')
  })
})

describe('MAIN POINT TEST', () => {
  let ifr: HTMLIFrameElement
  let pointer: MainPoint

  beforeEach(() => {
    const fn = jest.fn()

    ifr = document.createElement('iframe')
    ifr.src = './fixtures/frame-receive.html'

    pointer = new MainPoint(ifr)

    document.body.appendChild(ifr)

    return new Promise((resolve) => {
      ifr.onload = resolve
    })
  })

  afterEach(() => {
    ifr.remove()
  })

  test('', async () => {

  })
})

describe('NODE POINT TEST', () => { })
