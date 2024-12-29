import { ReactNode, useEffect } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: Record<string, any>;
};

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  isSuccess?: boolean;
} & TFormConfig;

const SSForm = ({
  onSubmit,
  children,
  defaultValues,
  isSuccess,
}: TFormProps) => {
  const formConfig: TFormConfig = { defaultValues };

  const methods = useForm(formConfig);
  const { reset } = methods;

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
  };

  // Reset the form when `isSuccess` is true
  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);

  // Reset the form when `defaultValues` change
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default SSForm;
