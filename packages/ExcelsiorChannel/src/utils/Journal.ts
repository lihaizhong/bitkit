export class Journal {
  private inst: Console;

  constructor(inst: Console = console) {
    this.inst = inst;
  }

  static style(background: string, color: string = '#FFFFFF') {
    return `padding: 2px 4px; background: ${background}; color: ${color}; border-radius: 4px;`
  }

  private printf(label: string, messages: any[], cb: (message: any) => void) {
    if (messages.length < 2) {
      messages.forEach(cb);
    } else {
      this.inst.group(label);
      messages.forEach(cb);
      this.inst.groupEnd();
    }
  }

  log(...args: any[]) {
    this.inst.log(...args);
  }

  success(...args: any[]) {
    this.printf('SUCCESS', args, (message: any) => {
      this.inst.log('%csuccess', Journal.style('#68B984'), message);
    });
  }

  info(...args: any[]) {
    this.printf('INFO', args, (message: any) => {
      this.inst.info('%cinfo', Journal.style('#B2A4FF'), message);
    });
  }

  debug(...args: any[]) {
    this.printf('DEBUG', args, (message: any) => {
      this.inst.debug('%cdebug', Journal.style('#3DB2FF'), message);
    })
  }

  warn(...args: any[]) {
    this.printf('WARNING', args, (message: any) => {
      this.inst.warn('%cwarning', Journal.style('#FFB830'), message);
    });
  }

  error(...args: any[]) {
    this.printf('ERROR', args, (message: any) => {
      this.inst.error('%cerror', Journal.style('#FF2442'), message);
    });
  }
}

export const journal = new Journal();
