import { MainPoint } from '../src'

// beforeAll(() => {
//   console.info('global beforeAll invoked!')
// })

// beforeEach(() => {
//   console.info('global beforeEach invoked!')
// })

// afterEach(() => {
//   console.info('global afterEach invoked!')
// })

// afterAll(() => {
//   console.info('global afterAll invoked!')
// })

// describe('TEST LIFECYCLE', () => {
//   beforeAll(() => {
//     console.info('local beforeAll invoked!')
//   })

//   beforeEach(() => {
//     console.info('local beforeEach invoked!')
//   })

//   afterEach(() => {
//     console.info('local afterEach invoked!')
//   })

//   afterAll(() => {
//     console.info('local afterAll invoked!')
//   })

//   test('test lifecycle', () => {
//     console.info('test invoked!')
//   })
// })

describe('MAIN POINT TEST', () => {
  let ifr: HTMLIFrameElement
  let pointer: MainPoint

  beforeEach(() => {
    ifr = document.createElement('iframe')
    ifr.src = './fixtures/frame-send.html'
    pointer = new MainPoint(ifr)
    document.body.appendChild(ifr)
  })

  afterEach(() => {
    ifr.remove()
  })

  test('iframe send', async () => {
    return Promise.all([
      new Promise((resolve) => {
        const moveCallback = jest.fn(() => {
          resolve(moveCallback)
        })
      }),
      new Promise((resolve) => {
        const deleteCallback = jest.fn(() => {
          resolve(deleteCallback)
        })
      })
    ])
      .then(([moveCallback, deleteCallback]) => {
        expect(moveCallback).toBeCalled()
        expect(moveCallback).toBeCalledTimes(1)
        expect(deleteCallback).toBeCalled()
        expect(deleteCallback).toBeCalledTimes(1)
      })
  })
})

// describe('NODE POINT TEST', () => {
//   let ifr: HTMLIFrameElement
//   let pointer: MainPoint

//   beforeEach(() => {
//     ifr = document.createElement('iframe')
//     ifr.src = './fixtures/frame-receive.html'
//     pointer = new MainPoint(ifr)
//     document.body.appendChild(ifr)

//     return new Promise((resolve) => {
//       ifr.onload = resolve
//     })
//   })

//   afterEach(() => {
//     ifr.remove()
//   })

//   // test('main invoke', async () => {
//   //   jest.mock('../src')
//   //   jest.mocked(MainPoint).mockImplementation((target: HTMLIFrameElement | Window) => ({
//   //     notify() {},
//   //     invoke() {}
//   //   }))
//   // })

//   test('iframe receive', async () => {
//     const data = await pointer.invoke('update')

//     expect(data).toBeTruthy()
//   })
// })
