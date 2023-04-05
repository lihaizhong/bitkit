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

beforeAll(() => {

})

describe('NOTIFY TEST', () => {})

describe('INVOKE TEST', () => {})
