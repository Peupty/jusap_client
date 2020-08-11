import userModule from '@/services/http/user'

const mockHttpClient = jest.fn()
const user = userModule(mockHttpClient)

describe('auth module', () => {
  test('should be defined', () => {
    expect(user).toBeDefined()
  })

  describe('logIn method', () => {
    test('should be defined', () => {
      expect(user.logIn).toBeDefined()
    })

    test('should get called with correct arguments', () => {
      user.logIn({ email: 'test@test.com', password: 'testpassword' })

      expect(mockHttpClient).toHaveBeenCalledWith({
        method: 'post',
        url: '/api/login',
        data: {
          email: 'test@test.com',
          password: 'testpassword'
        }
      })
    })
  })
})
