import React, {
    createContext,
    ReactNode,
    useContext,
    useState,
    useEffect,
} from 'react';


import * as Google from 'expo-google-app-auth';
import * as AppleAuthentication from 'expo-apple-authentication';

import AsyncStorage from '@react-native-async-storage/async-storage';


interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface IAuthContextData {
    user: User;
    signInWithGoogle(): Promise<void>
    signInWithApple(): Promise<void>
    signOut(): Promise<void>
    userStorageLoading: Boolean;
}

const AuthContext = createContext({} as IAuthContextData);



function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<User>({} as User);
    const [userStorageLoading, setUserStorageLoading] = useState(true);

    const userCollectionKey = '@gofinances:user';

    async function signInWithGoogle() {
        try {
            const result = await Google.logInAsync({
                iosClientId: '1097052167683-1d9i8jedo3a84ap5ca32fomk51j7dvv6.apps.googleusercontent.com',
                androidClientId: '1097052167683-kmvpjsh84fcbfbdo6pqob2cqipc5867k.apps.googleusercontent.com',
                scopes: ['profile', 'email']
            })

            if (result.type === 'success') {
                const userLogged = {
                    id: String(result.user.id),
                    email: result.user.email!,
                    name: result.user.name!,
                    photo: result.user.photoUrl!
                }

                await setUser(userLogged);
                await AsyncStorage.setItem(userCollectionKey, JSON.stringify(userLogged));
            }
        } catch (error) {
            throw new Error(error)

        }
    }

    async function signInWithApple() {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL
                ]
            })

            if (credential) {
                const userLogged = {
                    id: String(credential.identityToken),
                    email: credential.email!,
                    name: `${credential.fullName!.givenName!} ${credential.fullName!.familyName!} `,
                    photo: undefined
                }

                setUser(userLogged);
                await AsyncStorage.setItem(userCollectionKey, JSON.stringify(userLogged));
                console.log(credential)
            }
        }
        catch (error) {
            throw new Error('')
        }
    }

    async function signOut() {
        setUser({} as User);
        await AsyncStorage.removeItem(userCollectionKey);
    }


    useEffect(() => {
        (async () => {
            try {
                const response = await AsyncStorage.getItem(userCollectionKey);

                response && setUser(JSON.parse(response) as User) 
               // setUserStorageLoading(false);
            } catch (error) {

            }
        }
        )()
    }, []);

    return (

        <AuthContext.Provider value={{
            user,
            userStorageLoading,
            signInWithGoogle,
            signInWithApple,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    return useContext(AuthContext)
}

export { AuthProvider, useAuth }