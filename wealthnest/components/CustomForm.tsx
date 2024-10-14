import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Control, FieldPath, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { authFormSchema } from '@/lib/utils';
const formSchema = authFormSchema('sign-up');

function CustomForm({
  control,
  name,
  label,
  type = 'text',
  placeholder,
}: {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  type?: string;
  placeholder: string;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="form-item">
            <FormLabel className="form-label">{label}</FormLabel>
            <div className="flex w-full flex-col">
              <FormControl>
                <Input
                  className="input-class"
                  placeholder={placeholder}
                  type={type}
                  {...field}
                />
              </FormControl>
              <FormMessage className="form-message mt-2" />
            </div>
          </div>
        </FormItem>
      )}
    />
  );
}

export default CustomForm;
