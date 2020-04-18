export class PrimaryUtils {
  /**
   * Determines Node Environment and if it is not equal to production
   * @returns {Boolean} If node environment is develop or not
   */
  public static isDevelopment(): boolean {
    return process.env.NODE_ENV !== 'production';
  }
}
