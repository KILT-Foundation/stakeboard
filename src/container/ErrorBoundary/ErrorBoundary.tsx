import React, { ReactNode } from 'react'
import { Modal } from '../../components/Modal/Modal'
import styles from '../../components/Modal/Modal.module.css'

interface Props {
  children: ReactNode
}
interface State {
  error: any
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { error: false }
  }

  static getDerivedStateFromError(error: any) {
    return { error }
  }

  componentDidCatch(error: any, errorInfo: any) {
    // TODO: log error to error logging service
  }

  render(): ReactNode {
    const { error } = this.state
    const { children } = this.props
    return error ? (
      <Modal title="Error">
        <>
          There was an Error:
          <p className={styles.errorText}>{error.toString()}</p>
          Please reload the page
        </>
      </Modal>
    ) : (
      children
    )
  }
}

export default ErrorBoundary
