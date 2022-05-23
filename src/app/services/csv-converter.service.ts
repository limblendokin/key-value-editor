import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * The Context defines the interface of interest to clients. It also maintains a
 * reference to an instance of a State subclass, which represents the current
 * state of the Context.
 */
 class Context {
  /**
   * @type {State} A reference to the current state of the Context.
   */
  private state: State;
  public str:string
  public i:number;
  public parsed: string[][];
  constructor(str:string) {
      this.str = str;
  }

  /**
   * The Context allows changing the State object at runtime.
   */
  public transitionTo(state: State): void {
      console.log(`Context: Transition to ${(<any>state).constructor.name}.`);
      this.state = state;
      this.state.setContext(this);
  }

  /**
   * The Context delegates part of its behavior to the current State object.
   */
  public parse(): void {
    while(this.i < this.str.length){
      this.state.readNext();
    }
  }
}

/**
* The base State class declares methods that all Concrete State should
* implement and also provides a backreference to the Context object, associated
* with the State. This backreference can be used by States to transition the
* Context to another State.
*/
abstract class State {
  protected context: Context;

  public setContext(context: Context) {
      this.context = context;
  }

  public abstract readNext(str:string): void;

}

/**
* Concrete States implement various behaviors, associated with a state of the
* Context.
*/
class StartLine extends State {
  public readNext(): void {
    const c = this.context.str[this.context.i];
    if(c == '\n'){
      this.context.i++;
      this.context.transitionTo(new EndLine());
      return;
    }
    this.context.transitionTo(new StartField());
    
  }
}

class StartField extends State {
  public readNext(): void {
    const c = this.context.str[this.context.i];
    if(c == '"'){
      this.context.transitionTo(new QuotedField());
      return;
    }
    if(c == '\n'){
      this.context.transitionTo(new EndLine());
      return;
    }
    this.context.transitionTo(new RegularField());
  }
}
class RegularField extends State{
  public readNext(): void {
    const c = this.context.str[this.context.i];
    if(c=='\n'){
      this.context.transitionTo(new EndLine());
    }
  }
  
}
class QuotedField extends State{
  public readNext(): void {
      this.context.transitionTo(new ConcreteStateB());
  }
  
}
class DoubleQuote extends State{
  public readNext(): void {
      this.context.transitionTo(new ConcreteStateB());
  }
  
}
class RegularField extends State{
  public readNext(): void {
      this.context.transitionTo(new ConcreteStateB());
  }
  
}
class EndLine extends State{
  public readNext(): void {
      this.context.transitionTo(new ConcreteStateB());
  }
  
}


/**
* The client code.
*/
const context = new Context(new ConcreteStateA());
context.request1();
context.request2();

export class CsvConverterService {
  constructor() { 
    
  }
  private readLine(){
    const line = []
    if(c == '\n'){
      return line;
    }
    else{
      this.readField()
    }

  }
  private readField(){
    const field = [];
    if(c==','){
      return field.join();
    }
    else if()
  }
}
