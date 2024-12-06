import { ReactNode, useEffect } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

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
  isSuccess
}: TFormProps) => {
  const formConfig: TFormConfig = {};

  if (defaultValues) {
    formConfig['defaultValues'] = defaultValues;
  }

  const methods = useForm(formConfig);

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
  };

  useEffect(() => {
    if(isSuccess) {
      methods.reset();
    }
  },[isSuccess, methods])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default SSForm;
