export type Viewer = {
  id: number;
  username: string;
  email: string;
};

export type GetViewerInputs = {
  id: number;
};

export type GetViewerResponse = Viewer & {
  password: string;
};
