import { Dispatch, SetStateAction, useState } from 'react';

type ChangeField = (e: React.ChangeEvent<HTMLInputElement>) => void;
type ChangeDataForm = (field: string) => ChangeField;

export const useFormState = <T>(
	initialState: T,
): [T, ChangeDataForm, Dispatch<SetStateAction<T>>] => {
	const [form, setForm] = useState(initialState);

	const changeDataForm: ChangeDataForm = (field: string) => {
		return (e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;
			setForm({ ...form, [field]: value });
		};
	};

	return [form, changeDataForm, setForm];
};
