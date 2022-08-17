export const parseViewerIdFromJwt = (token: string) => {
  if (!token) {
    return null;
  }
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const parsedToken = JSON.parse(window.atob(base64));
    const id = +parsedToken.sub;

    return id;
  } catch (err) {
    return null;
  }
};
