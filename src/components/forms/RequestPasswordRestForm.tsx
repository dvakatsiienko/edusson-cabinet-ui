/* Core */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

/* Components */
import { Form, Input } from '@/components/form-elements';

/* Instruments */
import * as gql from '@/graphql';

export const RequestPasswordRestForm: React.FC = () => {
    const form = useForm<FormShape>({
        mode:     'onTouched',
        resolver: yupResolver(schema),
    });

    const [
        requestResetPasswordMutation,
        { loading: isLoading, data, error },
    ] = gql.useRequestPasswordResetMutation({
        variables:      form.getValues(),
        refetchQueries: [{ query: gql.UserDocument }],
    });

    const requestResetPassword = form.handleSubmit(async (_, event) => {
        event.preventDefault();

        await requestResetPasswordMutation();
    });

    return (
        <Form
            isLoading = { isLoading }
            networkError = { error }
            title = 'Reset Password'
            onSubmit = { requestResetPassword }
        >
            {data?.sendUserPasswordResetLink === null && (
                <p>Success! Check you email for a link!</p>
            )}

            <Input
                autoComplete = 'email'
                error = { form.errors.email }
                name = 'email'
                placeholder = 'Email'
                register = { form.register }
                text = 'Email'
            />

            <button disabled = { isLoading } type = 'submit'>
                Send
            </button>
        </Form>
    );
};

/* Helpers */
const schema: yup.SchemaOf<FormShape> = yup.object().shape({
    email: yup.string().email('must be valid email').required('is required'),
});

/* Types */
interface FormShape {
    email: string;
}
