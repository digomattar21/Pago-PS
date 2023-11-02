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
        email: yup.string().email(),
        name: yup.string(),
      }).validate(payload, { abortEarly: false });
    } catch (error:any) {
      throw new yup.ValidationError(error.errors, payload, 'validateUpdateUser');
    }
  }
};

