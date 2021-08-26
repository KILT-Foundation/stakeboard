import { Modal } from 'react-dialog-polyfill'
import styles from '../../styles/modal.module.css'
import React from 'react'

interface Props {
  hasError: boolean
  errorInfo: string | null
}

class ErrorBoundary extends React.Component<{}, Props> {
  constructor(props: {} | Readonly<{}>) {
    super(props)
    this.state = { hasError: false, errorInfo: null }
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      hasError: error,
      errorInfo,
    })
  }

  render() {
    if (this.state.hasError)
      return (
        <Modal open={this.state.hasError} className={styles.modal}>
          <>You have an Error, please refresh the page</>
          <>{this.state.errorInfo}</>
        </Modal>
      )
    return this.props.children
  }
}

export default ErrorBoundary
