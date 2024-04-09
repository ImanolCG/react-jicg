import { ErrorMessage, useField } from 'formik';
import {InputText} from "primereact/inputtext";

export const CustomInput = ({label, ...props}) => {
    const [field] = useField(props);
    return (
        <div className='flex flex-column gap-2'>
            <label className='text-justify' htmlFor={props.id || props.name}>{label}</label>
            <InputText {...field} {...props} className='bg-app'/>
            <ErrorMessage className='text-justify text-red' name={props.name} component='span'/>
        </div>
    );
};