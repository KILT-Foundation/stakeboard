import { Modal } from 'react-dialog-polyfill'
import styles from '../../styles/modal.module.css'
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}
interface State {
  error: any
  errorInfo: any
}

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

  render(): ReactNode {
    const { error, errorInfo } = this.state
    const { children } = this.props
    return error ? (
      <Modal open={error} className={styles.modal}>
        <>
          You have an {error.toString()} <br />
          Please refresh the page
        </>
        <>{error && errorInfo.componentStack}</>
        <br />
      </Modal>
    ) : (
      children
    )
  }
}

export default ErrorBoundary
