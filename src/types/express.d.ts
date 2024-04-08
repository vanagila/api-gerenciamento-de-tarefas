declare namespace Express {
  interface Request {
    authorizedUser: {
      id: string;
      email: string;
    };
  }
}
