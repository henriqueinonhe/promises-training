import { Router } from "../../../lib/concreteExercise/Router.js";

type Context = {
  router: Router;
};

export default ({ router }: Context) =>
  async (url: string) => {};
