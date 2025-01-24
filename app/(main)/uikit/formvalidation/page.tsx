'use client';

import React, { useState, useEffect, useMemo, useActionState, useRef, useTransition } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar } from 'primereact/calendar';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { UserService } from '@/demo/service/UserService';
import { Demo } from '@/types';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';
import { Tag } from 'primereact/tag';

interface DropdownItem {
    name: string;
    code: string;
}

const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
];

// Define the Zod schema for form validation
const userFormSchema = z.object({
    name: z
        .string({
            required_error: 'Name is required.'
        })
        .min(3, 'Name must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z
        .string({
            required_error: 'Password is required.'
        })
        .min(6, 'Password must be at least 6 characters'),
    gender: z.enum(['male', 'female'], {
        errorMap: () => ({ message: 'Gender is required' })
    }),
    dateOfBirth: z.date({
        required_error: 'Date of Birth is required'
    })
});

type FormValues = z.infer<typeof userFormSchema>;
const FormLayoutDemo = () => {
    const [dropdownItem, setDropdownItem] = useState<DropdownItem | null>(null);
    const toast = useRef<Toast>(null);
    const dropdownItems: DropdownItem[] = useMemo(
        () => [
            { name: 'Option 1', code: 'Option 1' },
            { name: 'Option 2', code: 'Option 2' },
            { name: 'Option 3', code: 'Option 3' }
        ],
        []
    );
    const [data, setData] = useState<z.infer<typeof userFormSchema> | null>(null);
    const [response, setResponse] = useState<({ id: string; token: string } | { error: string }) | null>(null);
    const [error, setError] = useState<{ error: string }>({ error: '' });
    const [isPending, startTransition] = useTransition();
    useEffect(() => {
        setDropdownItem(dropdownItems[0]);
    }, [dropdownItems]);
    const {
        control,
        handleSubmit,
        setValue,
        clearErrors,
        trigger,
        formState: { errors, isValid }
    } = useForm<Demo.User>({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            name: '',
            email: '',
            gender: undefined,
            dateOfBirth: undefined,
            password: undefined
        }
    });
    const onSubmit = (formData: FormValues) => {
        setData(formData);
    };
    const onFormSubmit = (prevState: any, queryData: Demo.User) => {
        startTransition(async () => {
            const data = await UserService.register2(prevState, queryData).then((result) => {
                if (result.error) {
                    toast.current?.show({ severity: 'error', summary: 'Error', detail: result.error, life: 3150 });
                }
                if (result.id) {
                    toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Registration was succeeded.', life: 3000 });
                }
                setResponse(result);
                return result;
            });

            setData(queryData);
        });
    };
    const [formState, formAction] = useActionState(onFormSubmit, null);
    const onFillData = () => {
        setValue('email', 'eve.holt@reqres.in');
        setValue('password', 'pistol');
        setValue('name', 'Eve Holt');
        setValue('gender', 'male');
        setValue('dateOfBirth', new Date());
        clearErrors();
        trigger();
    };
    return (
        <div className="flex align-items-center justify-content-center w-full">
            <Toast ref={toast} />

            <div className="col-5 align-items-center justify-content-center">
                <h5>Registration API:</h5>
                <code>
                <mark className='bg-primary'>POST</mark> https://reqres.in/api/register
                </code>
                <Divider align="right">
                    <Button label="Fill" icon="pi pi-clipboard" outlined onClick={onFillData}></Button>
                </Divider>
                <h5>Registration request data:</h5>
                <pre>
                    {JSON.stringify(
                        {
                            email: 'eve.holt@reqres.in',
                            password: 'pistol'
                        },
                        null,
                        2
                    )}
                </pre>
                <Divider layout="horizontal" align="center">
                    <Tag severity={isValid ? 'success' : 'danger'} value={isValid ? 'success' : 'failure'}></Tag>
                </Divider>
                <h5>Submitted form data:</h5>
                <pre>{JSON.stringify(data, null, 2)}</pre>

                <h5>Return data:</h5>
                <pre>{JSON.stringify(response, null, 2)}</pre>
            </div>
            <div className="col-1">
                <Divider layout="vertical">
                    <b>OR</b>
                </Divider>
            </div>
            <div className="col-5 flex align-items-center justify-content-center">
                <div className="card p-fluid w-full">
                    <h5>Register</h5>
                    <hr />
                    <form /* action={formAction} */ onSubmit={handleSubmit(formAction)} className="p-fluid">
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <IconField iconPosition="left">
                                        <InputIcon className="pi pi-user text-green-500"></InputIcon>
                                        <InputText id="name" {...field} className={errors.name ? 'p-invalid' : ''} />
                                    </IconField>
                                )}
                            />
                            {errors.name && <small className="p-error">{errors.name.message}</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="email1">Email</label>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <IconField iconPosition="left">
                                        <InputIcon className="pi pi-at"></InputIcon>
                                        <IconField>
                                            <InputIcon className="pi pi-at"></InputIcon>
                                            <InputText id="email" {...field} />
                                        </IconField>
                                    </IconField>
                                )}
                            />
                            {errors.email && <small className="p-error">{errors.email.message}</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="password">Password</label>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <IconField iconPosition="left">
                                        <InputIcon className="pi pi-lock"></InputIcon>
                                        <Password toggleMask id="password" {...field} />
                                    </IconField>
                                )}
                            />
                            {errors.password && <small className="p-error">{errors.password.message}</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="email1">Gender</label>
                            <Controller name="gender" control={control} render={({ field }) => <Dropdown id="gender" {...field} options={genderOptions} placeholder="Select Gender" className={errors.gender ? 'p-invalid' : 'p-green-500'} />} />
                            {errors.gender && <small className="p-error">{errors.gender.message}</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="age1">Date of Birth</label>
                            <Controller name="dateOfBirth" control={control} render={({ field }) => <Calendar id="dateOfBirth" {...field} showIcon />} />
                            {errors.dateOfBirth && <small className="p-error">{errors.dateOfBirth.message}</small>}
                        </div>
                        <div className="field">
                            {error.error && (
                                <small className="p-error">
                                    {error.error}.<br /> Email must be <strong>eve.holt@reqres.in</strong>
                                </small>
                            )}
                        </div>

                        <div className="field">
                            <Button label="Submit" type="submit" loading={isPending}></Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormLayoutDemo;
