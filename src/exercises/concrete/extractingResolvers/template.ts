import { Router } from "../../../lib/concreteExercise/Router";

type Context = {
  router: Router;
};

export default ({ router }: Context) =>
  async (url: string) => {};
