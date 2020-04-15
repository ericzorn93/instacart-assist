export class PrimaryUtils {
  public static isDevelopment(): boolean {
    return process.env.NODE_ENV !== 'production';
  }
}
