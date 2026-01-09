export const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const isDev = process.env.NODE_ENV === 'development';
    const originalStatusCode = err.statusCode || 500;

    // 业务错误（Operational Error）: HTTP 200，前端通过 code 判断
    if (err.isOperational) {
      ctx.status = 200;
      ctx.body = {
        code: originalStatusCode,
        message: err.message,
        data: null,
        ...(isDev && { stack: err.stack })
      };
    } else {
      // 编程错误或其他未知错误: HTTP 500
      console.error('ERROR 💥', err);
      ctx.status = 500;
      ctx.body = {
        code: 500,
        message: 'Something went very wrong!',
        data: null,
        ...(isDev && { stack: err.stack })
      };
    }
  }
};
