import { ClerkProvider, useClerk } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Slot } from 'expo-router'
import { useEffect } from 'react'
import { AppState, AppStateStatus } from 'react-native'

function AppStateHandler() {
  const { signOut } = useClerk()

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        // Sign out when app goes to background or becomes inactive
        signOut()
      }
    }

    const subscription = AppState.addEventListener('change', handleAppStateChange)

    return () => {
      subscription?.remove()
    }
  }, [signOut])

  return null
}

export default function RootLayout() {
  return (
    <ClerkProvider 
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <AppStateHandler />
      <Slot />
    </ClerkProvider>
  )
}