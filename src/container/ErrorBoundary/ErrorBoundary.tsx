import { Modal } from 'react-dialog-polyfill'
import styles from '../../styles/modal.module.css'
import React from 'react'

interface Props {
  error: any
  errorInfo: any
}

class ErrorBoundary extends React.Component<{}, Props> {
  constructor(props: {} | Readonly<{}>) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      error,
      errorInfo,
    })
  }

  render() {
    if (this.state.error)
      return (
        <Modal open={this.state.error} className={styles.modal}>
          <>You have an Error, please refresh the page</>
          <>{this.state.error && this.state.error.toString()}</>
          <br />
          {this.state.errorInfo.componentStack}
        </Modal>
      )
    return this.props.children
  }
}

export default ErrorBoundary
