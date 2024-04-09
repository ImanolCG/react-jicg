import { Spinner } from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const MySwal = withReactContent(Swal)

export const SwalReact = MySwal.mixin({
    customClass: {
        confirmButton: 'btn btn-swa text-white text-bold ms-3',
        cancelButton: 'btn btn-swa text-white text-bold me-3'
    },
    buttonsStyling: false,
    allowEnterKey: false,
    allowOutsideClick: false,
    reverseButtons: true,
})

export const simpleAlert = (icon, title, text) => {
    SwalReact.fire({
        // icon: icon,
        title: title,
        text: text,
        showConfirmButton: false,
        timer: 2000,
    });
}