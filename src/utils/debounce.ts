export default function debounce(fn: Function, ms: number) {
    let timer: any = null;
    return () => {
      clearTimeout(timer || undefined);
      timer = setTimeout(() => {
        timer = null;
        fn();
      }, ms);
    };
  }