import AsyncStorage from '@react-native-async-storage/async-storage';

export class ConsentService {
  private static CONSENT_KEY = 'privacyPolicyConsented';

  // Check if user has agreed to privacy policies
  static async hasConsented(): Promise<boolean> {
    try {
      const hasConsented = await AsyncStorage.getItem(this.CONSENT_KEY);
      return hasConsented === 'true';
    } catch (error) {
      console.error('Error checking consent status:', error);
      return false;
    }
  }

  // Save consent status
  static async saveConsent(): Promise<void> {
    try {
      await AsyncStorage.setItem(this.CONSENT_KEY, 'true');
      await AsyncStorage.setItem(`${this.CONSENT_KEY}_timestamp`, new Date().toISOString());
    } catch (error) {
      console.error('Error saving consent:', error);
      throw error;
    }
  }

  // Reset consent status (for testing or user preference)
  static async resetConsent(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.CONSENT_KEY);
      await AsyncStorage.removeItem(`${this.CONSENT_KEY}_timestamp`);
    } catch (error) {
      console.error('Error resetting consent:', error);
      throw error;
    }
  }

  // Get consent status with timestamp
  static async getConsentDetails(): Promise<{ hasConsented: boolean; timestamp?: string }> {
    try {
      const hasConsented = await AsyncStorage.getItem(this.CONSENT_KEY);
      const timestamp = await AsyncStorage.getItem(`${this.CONSENT_KEY}_timestamp`);
      return {
        hasConsented: hasConsented === 'true',
        timestamp: timestamp || undefined
      };
    } catch (error) {
      console.error('Error getting consent details:', error);
      return { hasConsented: false };
    }
  }
} 