import { useState } from 'react'

export const useModal = () => {
  const [isVisible, setIsVisible] = useState(false)

  function toggleModal() {
    setIsVisible(!isVisible)
  }
  return {
    isVisible,
    toggleModal,
  }
}
