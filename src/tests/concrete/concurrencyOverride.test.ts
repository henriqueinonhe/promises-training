import { describe, expect, it, vi } from "vitest";
import makeConcurrencyOverride from "../../exercises/concrete/concurrencyOverride/exercise.js";
import { match } from "ts-pattern";
import { waitForPromises } from "../../lib/waitForPromises.js";

const setup = () => {
  const firstCallInput = "firstCallInput";
  const secondCallInput = "secondCallInput";
  const firstCallFetchFirstDataResult = "firstCallFetchFirstDataResult";
  const firstCallFetchSecondDataResult = "firstCallFetchSecondDataResult";
  const secondCallFetchFirstDataResult = "secondCallFetchFirstDataResult";
  const secondCallFetchSecondDataResult = "secondCallFetchSecondDataResult";

  const firstCallFetchFirstDataResolverRef: {
    current: (() => void) | undefined;
  } = { current: undefined };
  const firstCallFetchSecondDataResolverRef: {
    current: (() => void) | undefined;
  } = { current: undefined };
  const secondCallFetchFirstDataResolverRef: {
    current: (() => void) | undefined;
  } = { current: undefined };
  const secondCallFetchSecondDataResolverRef: {
    current: (() => void) | undefined;
  } = { current: undefined };

  const fetchFirstData = vi.fn().mockImplementation((input) =>
    match(input)
      .with(
        firstCallInput,
        () =>
          new Promise((resolve) => {
            firstCallFetchFirstDataResolverRef.current = () =>
              resolve(firstCallFetchFirstDataResult);
          })
      )
      .with(
        secondCallInput,
        () =>
          new Promise((resolve) => {
            secondCallFetchFirstDataResolverRef.current = () =>
              resolve(secondCallFetchFirstDataResult);
          })
      )
      .otherwise(() => {
        throw new Error("Error!");
      })
  );

  const fetchSecondData = vi.fn().mockImplementation((input) =>
    match(input)
      .with(
        firstCallFetchFirstDataResult,
        () =>
          new Promise((resolve) => {
            firstCallFetchSecondDataResolverRef.current = () =>
              resolve(firstCallFetchSecondDataResult);
          })
      )
      .with(
        secondCallFetchFirstDataResult,
        () =>
          new Promise((resolve) => {
            secondCallFetchSecondDataResolverRef.current = () =>
              resolve(secondCallFetchSecondDataResult);
          })
      )
      .otherwise(() => {
        throw new Error("Error!");
      })
  );

  const setData = vi.fn();

  const concurrencyOverride = makeConcurrencyOverride({
    fetchFirstData,
    fetchSecondData,
    setData,
  });

  const firstCall = () => concurrencyOverride(firstCallInput);
  const secondCall = () => concurrencyOverride(secondCallInput);

  return {
    firstCallInput,
    secondCallInput,
    firstCallFetchFirstDataResult,
    firstCallFetchSecondDataResult,
    secondCallFetchFirstDataResult,
    secondCallFetchSecondDataResult,
    fetchFirstData,
    fetchSecondData,
    setData,
    concurrencyOverride,
    firstCallFetchFirstDataResolverRef,
    firstCallFetchSecondDataResolverRef,
    secondCallFetchFirstDataResolverRef,
    secondCallFetchSecondDataResolverRef,
    firstCall,
    secondCall,
  };
};

describe("When function is not already running and it finishes", () => {
  const secondSetup = async () => {
    const setupReturnValue = setup();

    const {
      firstCall,
      firstCallFetchFirstDataResolverRef,
      firstCallFetchSecondDataResolverRef,
    } = setupReturnValue;

    const firstCallPromise = firstCall();

    firstCallFetchFirstDataResolverRef.current!();
    await waitForPromises();

    firstCallFetchSecondDataResolverRef.current!();

    await firstCallPromise;

    return {
      ...setupReturnValue,
    };
  };

  it("Calls fetchFirstData with input", async () => {
    const { fetchFirstData, firstCallInput } = await secondSetup();

    expect(fetchFirstData).toHaveBeenCalledWith(firstCallInput);
    expect(fetchFirstData).toHaveBeenCalledTimes(1);
  });

  it("Calls fetchSecondData with fetchFirstData result", async () => {
    const { firstCallFetchFirstDataResult, fetchSecondData } =
      await secondSetup();

    expect(fetchSecondData).toHaveBeenCalledWith(firstCallFetchFirstDataResult);
    expect(fetchSecondData).toHaveBeenCalledTimes(1);
  });

  it("Calls setData with fetchSecondData result", async () => {
    const { firstCallFetchSecondDataResult, setData } = await secondSetup();

    expect(setData).toHaveBeenCalledWith(firstCallFetchSecondDataResult);
    expect(setData).toHaveBeenCalledTimes(1);
  });
});

describe("When function is already running", () => {
  const secondSetup = async () => {
    const setupReturnValue = setup();

    const { firstCall } = setupReturnValue;

    const firstCallPromise = firstCall();

    return {
      ...setupReturnValue,
      firstCallPromise,
    };
  };

  describe("And first call's fetchFirstData has not yet resolved", () => {
    const thirdSetup = () => secondSetup();

    describe("And we make a second call", () => {
      const fourthSetup = async () => {
        const setupReturnValue = await thirdSetup();

        const {
          firstCallPromise,
          secondCall,
          firstCallFetchFirstDataResolverRef,
        } = setupReturnValue;

        const secondCallPromise = secondCall();

        firstCallFetchFirstDataResolverRef.current!();
        await firstCallPromise;

        return {
          ...setupReturnValue,
          secondCallPromise,
        };
      };

      it("First call's fetchSecondData is not called", async () => {
        const { fetchSecondData } = await fourthSetup();

        expect(fetchSecondData).not.toHaveBeenCalled();
      });

      it("First call's setData is not called", async () => {
        const { setData } = await fourthSetup();

        expect(setData).not.toHaveBeenCalled();
      });

      it("Second call's fetchFirstData is called", async () => {
        const { fetchFirstData, secondCallInput } = await fourthSetup();

        expect(fetchFirstData).toHaveBeenCalledWith(secondCallInput);
      });

      describe("And second call finishes", () => {
        const fifthSetup = async () => {
          const setupReturnValue = await fourthSetup();

          const {
            secondCallPromise,
            secondCallFetchFirstDataResolverRef,
            secondCallFetchSecondDataResolverRef,
          } = setupReturnValue;

          secondCallFetchFirstDataResolverRef.current!();
          await waitForPromises();

          secondCallFetchSecondDataResolverRef.current!();
          await secondCallPromise;

          return {
            ...setupReturnValue,
          };
        };

        it("Second call's fetchSecondData is called with fetchFirstData result", async () => {
          const { secondCallFetchFirstDataResult, fetchSecondData } =
            await fifthSetup();

          expect(fetchSecondData).toHaveBeenCalledWith(
            secondCallFetchFirstDataResult
          );
        });

        it("Second call's setData is called with fetchSecondData result", async () => {
          const { secondCallFetchSecondDataResult, setData } =
            await fifthSetup();

          expect(setData).toHaveBeenCalledWith(secondCallFetchSecondDataResult);
        });
      });
    });
  });

  describe("And first call's fetchFirstData has resolved", () => {
    const thirdSetup = async () => {
      const setupReturnValue = await secondSetup();

      const { firstCallFetchFirstDataResolverRef } = setupReturnValue;

      firstCallFetchFirstDataResolverRef.current!();

      return { ...setupReturnValue };
    };

    describe("And first call's fetchSecondData has not yet been called", () => {
      const fourthSetup = () => thirdSetup();

      describe("And we make a second call", () => {
        const fifthSetup = async () => {
          const setupReturnValue = await fourthSetup();

          const { secondCall } = setupReturnValue;

          const secondCallPromise = secondCall();

          return {
            ...setupReturnValue,
            secondCallPromise,
          };
        };

        it("First call's fetchSecondData is not called", async () => {
          const { fetchSecondData } = await fifthSetup();

          expect(fetchSecondData).not.toHaveBeenCalled();
        });

        it("First call's setData is not called", async () => {
          const { setData } = await fifthSetup();

          expect(setData).not.toHaveBeenCalled();
        });

        it("Second call's fetchFirstData is called", async () => {
          const { fetchFirstData, secondCallInput } = await fifthSetup();

          expect(fetchFirstData).toHaveBeenCalledWith(secondCallInput);
        });

        describe("And second call finishes", () => {
          const sixthSetup = async () => {
            const setupReturnValue = await fifthSetup();

            const {
              secondCallPromise,
              secondCallFetchFirstDataResolverRef,
              secondCallFetchSecondDataResolverRef,
            } = setupReturnValue;

            secondCallFetchFirstDataResolverRef.current!();
            await waitForPromises();

            secondCallFetchSecondDataResolverRef.current!();
            await secondCallPromise;

            return {
              ...setupReturnValue,
            };
          };

          it("Second call's fetchSecondData is called with fetchFirstData result", async () => {
            const { secondCallFetchFirstDataResult, fetchSecondData } =
              await sixthSetup();

            expect(fetchSecondData).toHaveBeenCalledWith(
              secondCallFetchFirstDataResult
            );
          });

          it("Second call's setData is called with fetchSecondData result", async () => {
            const { secondCallFetchSecondDataResult, setData } =
              await sixthSetup();

            expect(setData).toHaveBeenCalledWith(
              secondCallFetchSecondDataResult
            );
          });
        });
      });
    });

    describe("And first call's fetchSecondData has not yet resolved", () => {
      const fourthSetup = async () => {
        const setupReturnValue = await thirdSetup();

        await waitForPromises();

        return setupReturnValue;
      };

      describe("And we make a second call", () => {
        const fifthSetup = async () => {
          const setupReturnValue = await fourthSetup();

          const { secondCall } = setupReturnValue;

          const secondCallPromise = secondCall();

          return {
            ...setupReturnValue,
            secondCallPromise,
          };
        };

        it("First call's fetchSecondData is called", async () => {
          const { fetchSecondData, firstCallFetchFirstDataResult } =
            await fifthSetup();

          expect(fetchSecondData).toHaveBeenCalledWith(
            firstCallFetchFirstDataResult
          );
        });

        it("First call's setData is not called", async () => {
          const { setData } = await fifthSetup();

          expect(setData).not.toHaveBeenCalled();
        });

        it("Second call's fetchFirstData is called", async () => {
          const { fetchFirstData, secondCallInput } = await fifthSetup();

          expect(fetchFirstData).toHaveBeenCalledWith(secondCallInput);
        });

        describe("And second call finishes", () => {
          const sixthSetup = async () => {
            const setupReturnValue = await fifthSetup();

            const {
              secondCallPromise,
              secondCallFetchFirstDataResolverRef,
              secondCallFetchSecondDataResolverRef,
            } = setupReturnValue;

            secondCallFetchFirstDataResolverRef.current!();
            await waitForPromises();

            secondCallFetchSecondDataResolverRef.current!();
            await secondCallPromise;

            return setupReturnValue;
          };

          it("Second call's fetchSecondData is called with fetchFirstData result", async () => {
            const { secondCallFetchFirstDataResult, fetchSecondData } =
              await sixthSetup();

            expect(fetchSecondData).toHaveBeenCalledWith(
              secondCallFetchFirstDataResult
            );
          });

          it("Second call's setData is called with fetchSecondData result", async () => {
            const { secondCallFetchSecondDataResult, setData } =
              await sixthSetup();

            expect(setData).toHaveBeenCalledWith(
              secondCallFetchSecondDataResult
            );
          });
        });
      });
    });

    describe("And first call's fetchSecondData has resolved", () => {
      const fourthSetup = async () => {
        const setupReturnValue = await thirdSetup();

        const { firstCallFetchSecondDataResolverRef } = setupReturnValue;

        await waitForPromises();
        firstCallFetchSecondDataResolverRef.current!();

        return {
          ...setupReturnValue,
        };
      };

      describe("And first call's setData has not yet been called", () => {
        const fifthSetup = () => fourthSetup();

        describe("And we make a second call", () => {
          const sixthSetup = async () => {
            const setupReturnValue = await fifthSetup();

            const { secondCall } = setupReturnValue;

            const secondCallPromise = secondCall();

            return { ...setupReturnValue, secondCallPromise };
          };

          it("First call's fetchSecondData is called", async () => {
            const { fetchSecondData, firstCallFetchFirstDataResult } =
              await sixthSetup();

            expect(fetchSecondData).toHaveBeenCalledWith(
              firstCallFetchFirstDataResult
            );
          });

          it("First call's setData is not called", async () => {
            const { setData } = await sixthSetup();

            expect(setData).not.toHaveBeenCalled();
          });

          describe("And second call finishes", () => {
            const seventhSetup = async () => {
              const setupReturnValue = await sixthSetup();

              const {
                secondCallPromise,
                secondCallFetchFirstDataResolverRef,
                secondCallFetchSecondDataResolverRef,
              } = setupReturnValue;

              secondCallFetchFirstDataResolverRef.current!();
              await waitForPromises();

              secondCallFetchSecondDataResolverRef.current!();
              await secondCallPromise;

              return setupReturnValue;
            };

            it("Second call's fetchSecondData is called with fetchFirstData result", async () => {
              const { secondCallFetchFirstDataResult, fetchSecondData } =
                await seventhSetup();

              expect(fetchSecondData).toHaveBeenCalledWith(
                secondCallFetchFirstDataResult
              );
            });

            it("Second call's setData is called with fetchSecondData result", async () => {
              const { secondCallFetchSecondDataResult, setData } =
                await seventhSetup();

              expect(setData).toHaveBeenCalledWith(
                secondCallFetchSecondDataResult
              );
            });
          });
        });
      });
    });
  });
});
