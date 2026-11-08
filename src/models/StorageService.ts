// localStorage-ის ერთი "კარიბჭე" ნებისმიერი ტიპისთვის
export class StorageService<T> {
  private readonly key: string;
  private readonly isValid: (value: unknown) => value is T;

  constructor(key: string, isValid: (value: unknown) => value is T) {
    this.key = key;
    this.isValid = isValid;
  }

  get(): T | null {
    try {
      const saved = localStorage.getItem(this.key);
      if (saved === null) return null;
      const parsed: unknown = JSON.parse(saved);
      return this.isValid(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }

  set(value: T): void {
    try {
      localStorage.setItem(this.key, JSON.stringify(value));
    } catch {
      // localStorage შეიძლება სავსე ან მიუწვდომელი იყოს
    }
  }

  remove(): void {
    try {
      localStorage.removeItem(this.key);
    } catch {
      // იგივე მიზეზი
    }
  }
}