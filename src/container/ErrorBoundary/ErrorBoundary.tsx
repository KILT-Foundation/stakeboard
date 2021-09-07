import { Modal } from 'react-dialog-polyfill'
import styles from '../../styles/modal.module.css'
import React, { Dispatch, ReactNode } from 'react'

interface Props {
  children: ReactNode
}
interface State {
  error: boolean
  errorInfo: any
}

interface ErrorBoundaryState {
  error: boolean
  errorInfo: any
}

type ErrorBoundaryAction = {
  type: 'handleError'
  error: boolean
  errorInfo: any
}

export const ErrorBoundaryContext = React.createContext<{
  state: ErrorBoundaryState
  dispatch: Dispatch<ErrorBoundaryAction>
}>({
  state: {
    error: false,
    errorInfo: '',
  },
  dispatch: () => null,
})

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { error: false, errorInfo: '' }
  }

  static getDerivedStateFromError(error: any) {
    return { error }
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      error,
      errorInfo,
    })
  }
  triggerError = ({ error, errorInfo }: any) => {
    this.setState({ error, errorInfo })
  }

  render(): ReactNode {
    const { error, errorInfo } = this.state
    const { children } = this.props
    return (
      <ErrorBoundaryContext.Provider
        value={{ state: this.state, dispatch: this.triggerError }}
      >
        {error ? (
          <Modal open={error} className={styles.modal}>
            <>
              There was an Error:
              <p className={styles.errorText}>{errorInfo.toString()}</p>
              Please reload the page
            </>
            <>{error && errorInfo.componentStack}</>
            <br />
          </Modal>
        ) : (
          children
        )}
      </ErrorBoundaryContext.Provider>
    )
  }
}

export default ErrorBoundary
