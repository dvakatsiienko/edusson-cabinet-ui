/* Core */
import { UseFormMethods, FieldError, RegisterOptions } from 'react-hook-form';

export const Input: React.FC<InputProps> = props => {
    const { text, register, error, ...rest } = props;

    const registerOptions: RegisterOptions = {
        setValueAs: value => {
            if (props.type === 'number') {
                const result = parseInt(value);

                return Number.isNaN(result) ? null : result;
            }
        },
    };

    if (props.type !== 'number') {
        delete registerOptions.setValueAs;
    }

    return (
        <label htmlFor = { props.name }>
            {text} <span className = 'error-message'>{error?.message}</span>
            <input
                name = { props.name }
                placeholder = { props.placeholder }
                ref = { register(registerOptions) }
                type = { props.type }
                { ...rest }
            />
        </label>
    );
};
Input.defaultProps = {
    type: 'text',
};

/* Types */
type HTMLInputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

interface InputProps extends HTMLInputProps, Pick<UseFormMethods, 'register'> {
    text: string;
    error?: FieldError;
}
