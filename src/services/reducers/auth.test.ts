import { authReducer } from './auth'
import { setUser } from '../actions/auth'

const testState = {
   name: '',
   email: '',
   isLoading: false,
   error: null,
   message: '',
   isAuth: false,
   isResponsedEmail: false,
}

describe('authReducer', () => {
   it('should return the initialState', () => {
      expect(authReducer(undefined, {} as any)).toEqual(testState)
   })
   it('should return newState', () => {
      const user: any = {
         name: "Ivan",
         email: 'Ivan@ru'
      }
      expect(authReducer(
         testState,
         setUser(user)
      )).toEqual(
         {
            ...testState,
            name: "Ivan",
            email: 'Ivan@ru',
            isAuth: true,
         }
      )
   })

})
