import { History, createBrowserHistory } from "history";

/**
 * history service
 */
export class HistoryService {
  /**
   * get history
   */
  public static getHistory(): History<any> {
    if (!this.history) {
      this.history = createBrowserHistory();
    }
    return this.history;
  }

  private static history: History<any>;
  private constructor() {}
}
