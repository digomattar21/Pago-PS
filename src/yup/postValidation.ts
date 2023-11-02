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
        title: yup.string(),
        content: yup.string(),
        published: yup.boolean(),
        authorId: yup.number(),
      }).validate(payload, { abortEarly: false });
    } catch (error: any) {
      throw new yup.ValidationError(error.errors, payload, 'validateUpdatePost');
    }
  }
};