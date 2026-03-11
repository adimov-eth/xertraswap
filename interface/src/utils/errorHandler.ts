import { toast } from 'react-toastify'

const handleError = (error: unknown): void => {
  let message = 'Something went wrong'

  if (error instanceof Error) {
    const { message: errorMessage } = error
    message = errorMessage
  }

  // Handle API-style errors (Axios, fetch wrappers, etc.)
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const {
      response: { data } = {},
    } = error as {
      response?: {
        data?: {
          message?: string
        }
      }
    }
    message = data?.message ?? message
  }

  toast.error(message, {
    position: 'top-right',
    autoClose: 5000,
  })

  console.error('Global Error:', error)
}

export default handleError
