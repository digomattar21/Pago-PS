import { Post } from '@prisma/client';
import * as yup from 'yup';

export const validatePost = {
  create: async (payload: Post) => {
    try {
      await yup.object().shape({
        title: yup.string().required('Title is required'),
        content: yup.string().required('Content is required'),
        published: yup.boolean().required('Published is required'),
        authorId: yup.number().required('AuthorId is required'),
      }).validate(payload, { abortEarly: false });
    } catch (error: any) {
      throw new yup.ValidationError(error.errors, payload, 'validateCretePost');
    }
  },
  update: async (payload: Post) => {
    try {
      await yup.object().shape({
        title: yup.string().test('is-string', 'Title must be a string', (value) => typeof value === 'string'),
        content: yup.string().test('is-string', 'Content must be a string', (value) => typeof value === 'string'),
        published: yup.boolean().test('is-boolean', 'Published must be a boolean', (value) => typeof value === 'boolean'),
        authorId: yup.number().test('is-number', 'AuthorId must be a number', (value) => typeof value === 'number')
      }).validate(payload, { abortEarly: false });
    } catch (error: any) {
      throw new yup.ValidationError(error.errors, payload, 'validateUpdatePost');
    }
  }
};