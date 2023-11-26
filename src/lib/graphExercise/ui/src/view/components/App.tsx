import { ExerciseProvider } from "../../application/ExerciseProvider.js";
import styles from "./App.module.scss";
import { useExercise } from "../../application/useExercise.js";
import { Header } from "./Header.js";
import { ExerciseSelector } from "./ExerciseSelector.js";
import { RecordsDisplay } from "./RecordsDisplay.js";
import { ControlPanel } from "./ControlPanel.js";
import { VariantSelector } from "./VariantSelector.js";
import { Footer } from "./Footer.js";

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
