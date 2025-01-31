export const sleep = (ms: number = 30000): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
