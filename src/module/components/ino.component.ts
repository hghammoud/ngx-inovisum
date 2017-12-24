import { ISubscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core';
export class InoComponent implements OnDestroy {

    // This will track all subscriptions and will be used to unsubscribe on destroy
    public subscriptions: ISubscription[] = [];

    public addSubscription(sub: ISubscription) {
        this.subscriptions.push(sub);
    }
    public ngOnDestroy() {
        // Destroying all created subscriptions
        this.subscriptions.forEach((sub) => {
            sub.unsubscribe();
        });
    }
}
