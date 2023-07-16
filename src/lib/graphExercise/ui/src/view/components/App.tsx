import { ExerciseProvider } from "../../application/ExerciseProvider";
import styles from "./App.module.scss";
import { useExercise } from "../../application/useExercise";
import { Header } from "./Header";
import { ExerciseSelector } from "./ExerciseSelector";
import { RecordsDisplay } from "./RecordsDisplay";
import { ControlPanel } from "./ControlPanel";
import { VariantSelector } from "./VariantSelector";
import { Footer } from "./Footer";

function App() {
  const { exercise } = useExercise();

  return (
    <>
      <Header />

      <main className={styles.main}>
        <div className={styles.leftSidebar}>
          <ExerciseSelector />
        </div>

        <div className={styles.center}>
          {exercise && (
            <>
              <VariantSelector />

              <RecordsDisplay />
            </>
          )}
        </div>

        <div>
          <ControlPanel />
        </div>
      </main>

      <Footer />
    </>
  );
}

const AppWithProviders = () => (
  <ExerciseProvider>
    <App />
  </ExerciseProvider>
);

export default AppWithProviders;
