import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
// https://www.codeproject.com/Articles/1175263/Why-to-Build-Your-Own-CSV-Parser-or-Maybe-Not
class Context {
  private state: State;
  public parsed: string[][] = [];
  public line: string[] = [];
  public field: string = '';
  public quotedField: string = '';
  public i: number = 0;
  constructor() {
    this.state = new StartLine();
    this.state.setContext(this);
  }
  public transitionTo(state: State): void {
    this.state = state;
    this.state.setContext(this);
  }

  public parse(str: string): string[][] {
    str = str.trim();
    while (this.i < str.length) {
      this.state.readNext(str[this.i++]);
    }
    this.transitionTo(new EndLine());
    this.state.readNext(str[this.i]);
    const parsed = this.parsed;
    this.parsed = [];
    for (let i = 1, prevLength = parsed[0].length; i < parsed.length; i++) {
      if (parsed[i].length !== prevLength) {
        throw SyntaxError(
          'CSV Parsing Error: Lines have different number of columns'
        );
      }
    }

    return parsed;
  }
}

abstract class State {
  protected ctx!: Context;

  public abstract readNext(str: string): void;

  public setContext(ctx: Context): void {
    this.ctx = ctx;
  }
}

class StartLine extends State {
  public readNext(c: string): void {
    if (c == '\n') {
      this.ctx.transitionTo(new EndLine());
      return;
    }
    this.ctx.i--;
    this.ctx.transitionTo(new StartField());
  }
}

class StartField extends State {
  public readNext(c: string): void {
    if (c == '"') {
      this.ctx.transitionTo(new QuotedField());
      return;
    }
    if (c == '\n') {
      this.ctx.transitionTo(new EndLine());
      return;
    }
    if (c == ' ') {
      return;
    }
    this.ctx.i--;
    this.ctx.transitionTo(new RegularField());
  }
}
class RegularField extends State {
  public readNext(c: string): void {
    if (c == '\n') {
      this.ctx.transitionTo(new EndLine());
      return;
    }
    if (c == ',') {
      this.ctx.line.push(this.ctx.field.trim());
      this.ctx.field = '';
      this.ctx.transitionTo(new StartField());
      return;
    }
    if (c == '"') {
      throw new SyntaxError(
        'CSV Parsing Error: Unescaped double quote at position ' +
          (this.ctx.i - 1)
      );
    }
    this.ctx.field += c;
  }
}
class QuotedField extends State {
  public readNext(c: string): void {
    if (c == '"') {
      this.ctx.transitionTo(new DoubleQuote());
      return;
    }
    this.ctx.quotedField += c;
  }
}
class DoubleQuote extends State {
  public readNext(c: string): void {
    if (c == '"') {
      this.ctx.quotedField += c;
      this.ctx.transitionTo(new QuotedField());
      return;
    }
    if (c == ',') {
      this.ctx.line.push(this.ctx.quotedField);
      this.ctx.quotedField = '';
      this.ctx.transitionTo(new StartField());
      return;
    }
    if (c == '\n') {
      this.ctx.transitionTo(new EndLine());
      return;
    }
    throw new SyntaxError(
      'CSV Parsing Error: Double quote, comma, or new line character expected at position ' +
        (this.ctx.i - 1)
    );
  }
}
class EndLine extends State {
  public readNext(c: string): void {
    if (this.ctx.quotedField) {
      this.ctx.line.push(this.ctx.quotedField);
      this.ctx.quotedField = '';
    } else {
      this.ctx.line.push(this.ctx.field.trim());
      this.ctx.field = '';
    }
    this.ctx.parsed.push(this.ctx.line);
    this.ctx.line = [];
    this.ctx.i--;
    this.ctx.transitionTo(new StartLine());
  }
}

export class CsvConverterService {
  constructor() {}
  parse(str: string): string[][] {
    const ctx = new Context();
    return ctx.parse(str);
  }
}
