/* Core */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

/* Components */
import { Form, Input } from '@/components/form-elements';

/* Instruments */
import * as gql from '@/graphql';

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = props => {
    const form = useForm<FormShape>({
        mode:          'onTouched',
        resolver:      yupResolver(schema),
        defaultValues: { token: props.token },
    });

    const [
        resetPasswordMutation,
        { loading: isLoading, data, error },
    ] = gql.useResetPasswordMutation({
        variables:      form.getValues(),
        refetchQueries: [{ query: gql.UserDocument }],
    });

    const resetPassword = form.handleSubmit(async (_, event) => {
        event.preventDefault();

        await resetPasswordMutation();
    });

    const successfulError = data?.redeemUserPasswordResetToken?.code
        ? data?.redeemUserPasswordResetToken
        : null;

    useEffect(() => {
        form.setValue('token', props.token);
    }, [ props.token ]);

    return (
        <Form
            // @ts-ignore
            error = { error || successfulError }
            isLoading = { isLoading }
            title = 'Setup New Password'
            onSubmit = { resetPassword }
        >
            {data?.redeemUserPasswordResetToken === null && (
                <p>Success! You can now login.</p>
            )}

            <input hidden name = 'token' ref = { form.register } />

            <Input
                autoComplete = 'email'
                error = { form.errors.email }
                name = 'email'
                placeholder = 'Email'
                register = { form.register }
                text = 'Email'
            />
            <Input
                autoComplete = 'new-password'
                error = { form.errors.password }
                name = 'password'
                placeholder = 'Password'
                register = { form.register }
                text = 'Password'
                type = 'password'
            />
            <Input
                autoComplete = 'new-password'
                error = { form.errors.confirmPassword }
                name = 'confirmPassword'
                placeholder = 'Confirm Password'
                register = { form.register }
                text = 'Confirm Password'
                type = 'password'
            />

            <button disabled = { isLoading } type = 'submit'>
                Send
            </button>
        </Form>
    );
};

/* Helpers */
const schema: yup.SchemaOf<FormShape> = yup.object().shape({
    token:    yup.string().required('is required'),
    email:    yup.string().email('must be valid email').required('is required'),
    password: yup
        .string()
        .min(8, 'must be at lest ${min} symbols long')
        .required('is required'),
    confirmPassword: yup
        .string()
        .min(8, 'must be at lest ${min} symbols long')
        .oneOf([ yup.ref('password'), null ], 'must match password'),
});

/* Types */
interface ResetPasswordFormProps {
    token: string;
}

interface FormShape {
    email: string;
    password: string;
    token: string;
    confirmPassword: string;
}
