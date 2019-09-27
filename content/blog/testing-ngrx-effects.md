---
title: Testing NgRx Effects
description: You are walking down the street sipping some coffee and you ask yourself, “How can I test my ngrx@7.4.0 effects?”. If you’re asking that question then this might help you.
tags: ["ngrx", "angular", "rxjs"]
date: 2019-04-19
---

You are walking down the street sipping some coffee and you ask yourself, “How can I test my ngrx@7.4.0 effects?”. If you’re asking that question because you're not satisfied with the developer experience of jasmine-marbles then this might help you.

<!--more-->

<div class="img-container">
  <img src="https://thepracticaldev.s3.amazonaws.com/i/6542w0qedk4bb6xakmji.png">
</div>

```typescript
@Injectable()
export class RouterHistoryEffects {
  @Effect()
  addRouteToHistory = this.actions.pipe(
    ofType(ROUTER_NAVIGATED),
    map((action: RouterNavigatedAction) => action.payload.routerState.url),
    switchMap((url: string) => {
      return of(new fromRouterHistoryActions.AddRouteToHistory(url));
    })
  );

  constructor(private actions: Actions<RouterHistoryActions>) {}
}
```

Here we have an action that is dispatched from somewhere. It’s supposed to return a new action. When this is consumed by ngrx, `addRouteToHistory` subscribes to the action stream and can publish to your action stream. [More reading here](https://medium.com/@tanya/understanding-ngrx-effects-and-the-action-stream-1a74996a0c1c)

Knowing this, our test should perform the same scenario. We should subscribe to `addRouteToHistory` and listen for events to happen.

```typescript
import { TestBed, async } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { ReplaySubject } from "rxjs";

import { RouterHistoryEffects } from "./router-history.effects";
import { AddRouteToHistory } from "./router-history.actions";
import { ROUTER_NAVIGATED } from "@ngrx/router-store";

describe("RouterHistoryEffects", () => {
  let actions: ReplaySubject<any>;
  let effects: RouterHistoryEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouterHistoryEffects, provideMockActions(() => actions)]
    });

    effects = TestBed.get(RouterHistoryEffects);
  });

  it("should be created", async () => {
    expect(effects).toBeTruthy();
  });

  it("#addRouteToHistory should dispatch fromRouterHistoryActions.AddRouteToHistory with a url", async(async () => {
    actions = new ReplaySubject(1);
    const routerNavigatedAction = {
      type: ROUTER_NAVIGATED,
      payload: {
        routerState: {
          url: "/member"
        }
      }
    };
    actions.next(routerNavigatedAction);
    effects.addRouteToHistory.subscribe((result: AddRouteToHistory) => {
      expect(result.payload).toEqual("/member");
    });
  }));
});
```

We have a standard operating procedure for creating our testing module except for `provideMockActions`. This function ([which looks like this](https://github.com/ngrx/platform/blob/master/modules/effects/testing/src/testing.ts)) accepts an Observable, or a function that returns an Observable. Here, we are creating a factory that generates a [ReplaySubject](https://www.learnrxjs.io/subjects/replaysubject.html). We can publish to the ReplaySubject stream, and listen to it. This is exactly what our effect does:

```typescript
…
 @Effect()
 addRouteToHistory = this.actions.pipe( // do stuff then return an observable )
…
```

In our test, we can create a subscription to our effect `addRouteToHistory` and replay an action that was ‘dispatched’.

```typescript
actions = new ReplaySubject(1);
const routerNavigatedAction = {
  type: ROUTER_NAVIGATED,
  payload: {
    routerState: {
      url: "/member"
    }
  }
};
actions.next(routerNavigatedAction);
effects.addRouteToHistory.subscribe((result: AddRouteToHistory) => {
  expect(result.payload).toEqual("/member");
});
```

Hopefully this helps you. Depending if your store obtains slices of state from your store, you may need to create a mock store too! I’ll spare you the details, but it’s very similar to providing mock actions:

```typescript
//use provideMockStore to provide an instance of MockStore:
//https://ngrx.io/api/store/testing/MockStore


// configure testing module in before each


import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';

//...
    TestBed.configureTestingModule({
      providers: [
        YourEffect
        provideMockStore({ initialState }),
        provideMockActions(() => actions)
      ]
   })

    mockStore = TestBed.get(Store);
//...


 it('redirect to privacy policy page', async( () => {
// set testing state
   mockStore.setState({ [ROUTER_HISTORY_FEATURE_KEY]: { previousRoutes: [] } });

// dispatch your action
actions = new ReplaySubject(1);
   actions.next({
     type: ROUTER_REQUEST,
     payload: {
       routerState: {
         url: `/${NavigationRoutes.PrivacyPolicy}`
       },
     }
   });
// listen for stream to emit.
   sub = effects.redirectToHome.subscribe((data) => {
    expect(navigationServiceSpy.navigateToPrivacyPolicy).toHaveBeenCalled();
    expect(data).toBeTruthy(); // or whatever you’re testing
   });

 }));


```
