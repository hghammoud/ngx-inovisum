import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
export class DelayResolver implements Resolve<any> {
  public resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return Observable.create((observer: any) => {
      observer.next(true);
      observer.complete();
    })
      .delay(0);
  }
}
