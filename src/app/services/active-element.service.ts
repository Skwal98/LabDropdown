import { DOCUMENT } from "@angular/common";
import { inject, InjectionToken } from "@angular/core";
import { fromEvent, merge, Observable, of, timer } from "rxjs";
import { takeUntil, map, repeatWhen, switchMap, take, mapTo, distinctUntilChanged, share, filter, startWith } from 'rxjs/operators';


//factory created only once!
export const ACTIVE_ELEMENT = new InjectionToken(
    'An element that user is currently interacting with',
    {
      factory: () => {
        const documentRef = inject(DOCUMENT);
        const windowRef = documentRef.defaultView;

        const focusout$ = fromEvent(windowRef, 'focusout');
        const focusin$ = fromEvent(windowRef, 'focusin');
        const mousedown$ = fromEvent(windowRef, 'mousedown');
        const mouseup$ = fromEvent(windowRef, 'mouseup');
  
        const loss$ = focusout$.pipe(
            takeUntil(mousedown$),
            repeatWhen(() => mouseup$),
            filter(e => isValidFocusout(getActualTarget(e))),
            map(x => x as FocusEvent),
            map(({ relatedTarget }) => relatedTarget)
        );
       
        //WITHOUT SHADOWDOM
        //const gain$ = focusin$.pipe(map(({ target }) => target));

        const gain$ = focusin$.pipe(
            switchMap(event => {
              const target = getActualTarget(event);
              const root = getDocumentOrShadowRoot(target as Node);
          
              return root === documentRef
                ? of(target)
                : shadowRootActiveElement(root).pipe(startWith(target));
            }),
          );

        const mouse$ = mousedown$.pipe(
            switchMap(({ target }) =>
              documentRef.activeElement === documentRef.body
                ? of(target)
                : focusout$.pipe(
                  take(1),
                  takeUntil(timer(0)),
                  mapTo(target)
                )
              )
          );
          
          const iframe$ = fromEvent(windowRef, 'blur').pipe(
            map(() => documentRef.activeElement),
            filter(element => !!element && element.matches('iframe')),
          );
          
          return merge(loss$, gain$, mouse$, iframe$).pipe( 
            distinctUntilChanged(),
            share() 
          );
      }
    },
  );

  function getActualTarget(event: Event): EventTarget {
    return event.composedPath()[0];
  }
  
  function getDocumentOrShadowRoot(node: Node): Node {
    return node.isConnected ? node.getRootNode() : node.ownerDocument;
  }

  function shadowRootActiveElement(root: Node): Observable<EventTarget> {
    return merge(
      fromEvent(root, 'focusin').pipe(map(({target}) => target)),
      fromEvent(root, 'focusout').pipe(map(x => x as FocusEvent), map(({relatedTarget}) => relatedTarget)),
    );
  }

  function isValidFocusout(target: any): boolean {//, removedElement: Element | null): boolean {
    return (
      // Not due to switching tabs/going to DevTools
      //target.ownerDocument?.activeElement !== target &&
      // Not due to button/input becoming disabled
      !target.disabled //&&
      // Not due to element being removed from DOM
      //(!removedElement || !removedElement.contains(target))
    );
  }