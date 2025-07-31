export async function loginApi(username: string, password: string) {
  return {
    token: 'dummy-token',
    user: {
      id: '1',
      name: 'User',
      username,
    },
  };
}

export async function registerApi(
  username: string,
  password: string,
  name: string,
) {
  return {
    token: 'dummy-token',
    user: {
      id: '1',
      name,
      username,
    },
  };
}