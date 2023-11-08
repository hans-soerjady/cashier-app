import React from "react"
const useToggle = () => {
    const [isOpenModal, setIsOpenModal] = React.useState(false)

    const onToggleOpen = () => { setIsOpenModal(true) }
    const onToggleClose = () => { setIsOpenModal(false) }

    return {isOpenModal, onToggleOpen, onToggleClose}
}

export default useToggle;