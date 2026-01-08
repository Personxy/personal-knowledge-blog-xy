import * as userService from '../services/userService.js';

export const getUsers = async (ctx) => {
  const users = await userService.getAllUsers();
  ctx.body = {
    code: 0,
    message: 'Success',
    data: users
  };
};

export const getUser = async (ctx) => {
  const { id } = ctx.params;
  const user = await userService.getUserById(id);
  ctx.body = {
    code: 0,
    message: 'Success',
    data: user
  };
};

export const createUser = async (ctx) => {
  const user = await userService.createUser(ctx.request.body);
  ctx.status = 201;
  ctx.body = {
    code: 0,
    message: 'User created successfully',
    data: user
  };
};
