export const showErrorToast = (errorMessage: string) => {
    toast.show(errorMessage, {
        type: "danger",
        duration: 5000,
        placement: "top",
        animationType: "zoom-in",
    })
}

export const showWarningToast = (warningMessage: string) => {
    toast.show(warningMessage, {
        type: "warning",
        duration: 5000,
        placement: "top",
        animationType: "zoom-in",
    })
}
export const showNormalToast = (normalMessage: string) => {
    toast.show(normalMessage, {
        type: "normal",
        duration: 5000,
        placement: "top",
        animationType: "zoom-in",
    })
}