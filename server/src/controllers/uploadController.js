export const uploadFile = async (ctx) => {
  if (!ctx.file) {
    ctx.throw(400, 'No file uploaded');
  }
  const url = `/uploads/${ctx.file.filename}`;
  ctx.body = {
    code: 0,
    message: 'File uploaded successfully',
    data: { url }
  };
};
