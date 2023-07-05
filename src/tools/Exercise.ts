import { Context } from "./Context";

export type MakeExercise = (context: Context) => () => Promise<void>;

export type Exercise = () => Promise<void>;
