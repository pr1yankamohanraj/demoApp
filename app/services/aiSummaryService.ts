// AI Summary Service for communicating with backend
const API_BASE_URL = 'http://10.0.0.44:3001'; // Using local IP for device/simulator access

export interface SummaryRequest {
  text: string;
  context?: 'emergency' | 'community' | 'resources' | 'general';
  type?: 'bullet' | 'actionable' | 'standard';
}

export interface EmergencySummaryRequest {
  emergencyType: string;
  details: string;
  location?: string;
}

export interface SummaryResponse {
  success: boolean;
  summary: string;
  usage?: any;
  emergencyType?: string;
  timestamp?: string;
}

export interface ErrorResponse {
  error: string;
}

class AISummaryService {
  private async makeRequest<T>(
    endpoint: string, 
    method: 'GET' | 'POST' = 'POST', 
    body?: any
  ): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('AI Summary Service Error:', error);
      throw error;
    }
  }

  // Generate general summary
  async generateSummary(request: SummaryRequest): Promise<SummaryResponse> {
    return this.makeRequest<SummaryResponse>('/api/summarize', 'POST', request);
  }

  // Generate emergency-specific summary
  async generateEmergencySummary(request: EmergencySummaryRequest): Promise<SummaryResponse> {
    return this.makeRequest<SummaryResponse>('/api/emergency-summary', 'POST', request);
  }

  // New comprehensive assistant method
  async getAssistance(text: string): Promise<SummaryResponse> {
    return this.makeRequest<SummaryResponse>('/api/assist', 'POST', { text });
  }

  // Health check
  async healthCheck(): Promise<{ status: string; message: string }> {
    return this.makeRequest<{ status: string; message: string }>('/health', 'GET');
  }

  // Test connection
  async testConnection(): Promise<boolean> {
    try {
      await this.healthCheck();
      return true;
    } catch (error) {
      console.error('Backend connection failed:', error);
      return false;
    }
  }
}

export const aiSummaryService = new AISummaryService(); 