import { useState } from 'react';

type TUseFormReturn<T extends Record<string, string>> = {
  values: T;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setValues: React.Dispatch<React.SetStateAction<T>>;
};

export function useForm<T extends Record<string, string>>(
  inputValues: T
): TUseFormReturn<T> {
  const [values, setValues] = useState<T>(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}
