import { ExerciseSelector } from "./ExerciseSelector";
import style from "./Sidebar.module.scss";

export const Sidebar = () => {
  return (
    <aside className={style.container}>
      <h2 className={style.header}>Exercises</h2>
      <ExerciseSelector />
    </aside>
  );
};
