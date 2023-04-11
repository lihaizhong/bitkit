export interface JournalConsole {
  group(label: string): void;
  groupEnd(): void;
  log(...args: any[]): void;
  info(...args: any[]): void;
  debug(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
}

export class Journal {
  private inst: JournalConsole;

  private label: string | null = null;

  constructor(inst: JournalConsole = console) {
    this.inst = inst;
  }

  static style(background: string, color: string = '#FFFFFF') {
    return `padding: 2px 4px; background: ${background}; color: ${color}; border-radius: 4px;`
  }

  protected printf(label: string, messages: any[], cb: (message: any) => void) {
    if (messages.length < 2) {
      messages.forEach(cb);
    } else {
      this.inst.group(this.label || label);
      messages.forEach(cb);
      this.inst.groupEnd();
    }
  }

  group(label: string) {
    this.label = label.toLocaleUpperCase();

    return {
      success: this.success.bind(this),
      info: this.info.bind(this),
      debug: this.debug.bind(this),
      warn: this.warn.bind(this),
      error: this.error.bind(this)
    }
  }

  log(...args: any[]) {
    this.inst.log(...args);
  }

  success(...args: any[]) {
    this.printf('SUCCESS', args, (message: any) => {
      this.inst.log('%csuccess', Journal.style('#68B984'), message);
    });
    this.label = null;
  }

  info(...args: any[]) {
    this.printf('INFO', args, (message: any) => {
      this.inst.info('%cinfo', Journal.style('#B2A4FF'), message);
    });
    this.label = null;
  }

  debug(...args: any[]) {
    this.printf('DEBUG', args, (message: any) => {
      this.inst.debug('%cdebug', Journal.style('#3DB2FF'), message);
    });
    this.label = null;
  }

  warn(...args: any[]) {
    this.printf('WARNING', args, (message: any) => {
      this.inst.warn('%cwarning', Journal.style('#FFB830'), message);
    });
    this.label = null;
  }

  error(...args: any[]) {
    this.printf('ERROR', args, (message: any) => {
      this.inst.error('%cerror', Journal.style('#FF2442'), message);
    });
    this.label = null;
  }
}
