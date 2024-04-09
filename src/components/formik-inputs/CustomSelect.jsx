import { ErrorMessage, useField } from 'formik';
import {Dropdown} from 'primereact/dropdown';

export const CustomSelect = ({label, optionLabel='name', optionValue = 'id', ...props}) => {
    const [field] = useField(props);
    const options = props.options;
    return (
        <div className='flex flex-column gap-2'>
            <label htmlFor={props.id || props.name} style={{marginRight:'15px'}}>{label}</label>
            <Dropdown
                className='bg-app'
                {...field}
                options={options}
                optionLabel={optionLabel}
                optionValue={optionValue}
            />
            <ErrorMessage className='text-justify text-red' name={props.name} component='span'/>
        </div>
    );
};