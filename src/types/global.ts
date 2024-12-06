export type TError = {
  status: number;
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
};

