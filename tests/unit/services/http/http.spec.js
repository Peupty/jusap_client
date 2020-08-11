import { httpService } from '@/services/http/index'

const http = httpService({})

describe('http service', () => {
  test('should be defined', () => {
    expect(http).toBeDefined()
  })

  test('should have auth module', () => {
    expect(http.auth).toBeDefined()
  })
})
