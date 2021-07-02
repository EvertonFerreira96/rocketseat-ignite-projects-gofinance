import { renderHook, act} from '@testing-library/react-hooks';
import { mocked } from 'ts-jest/utils'

import { logInAsync } from 'expo-google-app-auth';

import { useAuth, AuthProvider } from './auth';

jest.mock('expo-google-app-auth');
/*
jest.mock('expo-google-app-auth', () => {
    return {
        logInAsync: () => {
            return {
                type: 'success',
                user: {
                    id: '0',
                    email: 'john.doe@mail.com',
                    name: 'John',
                    photo: 'photo.png'
                }
            }
        }
    }
});
*/

describe('Auth Hook', () => {
    it('Should be able to sign with a Google account existing', async () => {

        const googleSignInMocked = mocked(logInAsync as any);
        googleSignInMocked.mockReturnValueOnce({
            type: 'success',
            user: {
                id: '0',
                email: 'john.doe@mail.com',
                name: 'John',
                photo: 'photo.png'
            }
        });

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider 
        });
        await act(() => result.current.signInWithGoogle());

        expect(result.current.user).toHaveProperty("id");

    });
    it('Should be not connect with a Google account if the process be canceled by user', async () => {

        const googleSignInMocked = mocked(logInAsync as any);
        googleSignInMocked.mockReturnValueOnce({
            type: 'cancel'
        });

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider 
        });
        await act(() => result.current.signInWithGoogle());

        expect(result.current.user).not.toHaveProperty("id");

    });

    it('Should be not error with incorrect Google parameters', async () => {

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider 
        });
        try{

            await act(() => result.current.signInWithGoogle());
        }
        catch(e){
            expect(result.current.user).toEqual({});
        }

    });
});