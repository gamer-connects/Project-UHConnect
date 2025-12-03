import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
      randomKey?: string;
    };
  }

  interface User {
    id: string;
    randomKey?: string;
  }
}
