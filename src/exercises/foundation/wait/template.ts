type Context = {
  setTimeout: typeof setTimeout;
};

export default ({ setTimeout }: Context) =>
  (ms: number) => {};
