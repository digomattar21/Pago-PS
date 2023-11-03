import { User } from '@prisma/client';
import * as yup from 'yup';

export const validateUser = {
  create: async  (payload:User) => {
    try {
      await yup.object().shape({
        email: yup.string().email().required('Email is required'),
        name: yup.string().required('Name is required'),
      }).validate(payload, { abortEarly: false });
    } catch (error:any) {
      throw new yup.ValidationError(error.errors, payload, 'validateCreateUser');
    }
  },
  update: async  (payload:User) => {
    try {
      await yup.object().shape({
        email: yup.string().email().test('email', 'Email is required', (value) => typeof value === 'string'),
        name: yup.string().test('name', 'Name is required', (value) => typeof value === 'string'),
      }).validate(payload, { abortEarly: false });
    } catch (error:any) {
      throw new yup.ValidationError(error.errors, payload, 'validateUpdateUser');
    }
  }
};

