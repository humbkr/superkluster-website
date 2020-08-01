import toast, { toastConfig } from 'react-simple-toasts'

toastConfig({
  time: 1500,
  className: 'toast-message',
})

const show = (message: string, dismissAfter: number = 1500) => {
  toast(message, dismissAfter)
}

export default {
  show,
}
