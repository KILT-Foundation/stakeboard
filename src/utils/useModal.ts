import { useState } from 'react'

export const useModal = () => {
  const [isVisible, setIsVisible] = useState(false)

  function toggleModal() {
    setIsVisible(!isVisible)
  }
  function showModal() {
    setIsVisible(true)
  }
  function hideModal() {
    setIsVisible(false)
  }
  return {
    isVisible,
    toggleModal,
    showModal,
    hideModal,
  }
}
