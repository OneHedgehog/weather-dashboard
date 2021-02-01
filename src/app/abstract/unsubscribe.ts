import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export abstract class Unsubscribe implements OnDestroy {
  protected ngOnComponentDestroyed$: Subject<void> = new Subject<void>();

  public ngOnDestroy(): void {
    this.ngOnComponentDestroyed$.next();
    this.ngOnComponentDestroyed$.complete();
    this.ngOnComponentDestroyed$.unsubscribe();
  }
}
