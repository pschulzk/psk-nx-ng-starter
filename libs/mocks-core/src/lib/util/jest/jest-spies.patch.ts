import { DebugElement } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

/**
 * Debug element instance type.
 */
export type DebugElementComponentInstance = DebugElement['componentInstance'];

/**
 * Setup spies function type.
 */
export type SetupJestSpiesFor<T> = (
  component: DebugElementComponentInstance,
) => TComponentSpiesObject<T>;

/**
 * Function member spy.
 */
export type TFunctionSpy = jest.SpyInstance;

/**
 * Streamable member spy object.
 */
export interface IStreamableMemberSpy {
  pipe: jest.SpyInstance;
  subscribe: jest.SpyInstance;
}

/**
 * Component spy.
 */
export type TComponentSpy = TFunctionSpy | IStreamableMemberSpy;

/**
 * Component spies object.
 */
export type TComponentSpiesObject<T> = {
  [K in keyof T]: TComponentSpy;
};

/**
 * Sets up Jest spies for component class members.
 * Scans class for functions, sets up jest spies, and returns an object with class keys and respective spies.
 * Sets spy if component member is:
 * - a function, then function is being spied on;
 * - an observable, then observable's pipe method is being spied on;
 * - a subject or behavior subject, then subject's pipe and subscribe methods are being spied on.
 * @param component debug element component instance
 */
export function setupJestSpiesFor<T>(
  component: DebugElementComponentInstance,
): TComponentSpiesObject<T> {
  const spiesObject: TComponentSpiesObject<T> = Object.keys(component).reduce(
    (accumulator: TComponentSpiesObject<T>, key: string) => {
      let spy: TComponentSpy = null;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const classMember = component[key];
      /**
       * Spy on component functions.
       */
      if (classMember instanceof Function) {
        spy = jest.spyOn(component, key);
      }
      /**
       * Spy on pipe and subscribe methods of observables, subjects, and behavior subjects.
       */
      if (
        classMember instanceof Observable ||
        classMember instanceof Subject ||
        classMember instanceof BehaviorSubject
      ) {
        spy = {
          pipe: jest.spyOn(classMember, 'pipe'),
          subscribe: jest.spyOn(classMember, 'subscribe'),
        };
      }
      accumulator[key] = spy;
      return accumulator;
    },
    {} as TComponentSpiesObject<T>,
  );

  return spiesObject;
}
