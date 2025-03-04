import apiClient from "../apiClient";

type Admin = {
  nick: string
  password: string
}

export const signIn = async ({ nick, password }: Admin) => {
  const body = { nick, password }

  try {
    if (!nick || !password) {
      throw new Error('Nick and password are required');
    }

    const response = await apiClient.post('login', body)

    const HTTP_STATUS_OK = 200
    if (response.status != HTTP_STATUS_OK) {
      throw new Error('Login failed: Invalid response status');
    }

    return true

  } catch (error) {
    console.error('Error during login:', error instanceof Error ? error.message : 'Unknown error');
    return false
  }
}