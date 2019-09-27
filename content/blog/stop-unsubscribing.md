---
title: Stop Unsubscribing in Angular
description: Your templates can manage unsubscribing for you. Your logic will become more declarative. You will feel better too.
tags: ["angular", "rxjs"]
date: 2019-09-26
---

When you start playing with observables, you need to unsubscribe from them otherwise bad things will happen to your program. You'll often see code where we subscribe at the component level and then unsubsribe `ngOnDestroy`. This works, but you can reduce the amount of logic in your component with one easy trick.

Here is a nice component called `NameComponent`. Notice that `handleNameChange` triggers our nameEmitter to emit a name from a form. But it does not subscribe anywhere in the component.

```typescript
export class NameComponent implements OnInit {
  @Output() nameEmitter: EventEmitter<string> = new EventEmitter();
  public nameForm: FormGroup = this.fb.group({
    name: [{value: '', disabled: false}, Validators.required],
  });
  public handleNameChange: Observable<void> = this.passcodeForm.valueChanges.pipe(
    tap(() => this.nameEmitter.emit(this.nameForm.value.name)),
    switchMap(() => EMPTY)
  );
  constructor(private fb: FormBuilder) {}

...

}
```

So how does `handleNameChange` actually have our `nameEmitter` emit when there is no subscription? Let's take a look at the template
You'll see that we can set up our subscription in the template with the `async` pipe. [Here are the docs for it](https://angular.io/api/common/AsyncPipe)

```html
{{handleValueChange | async}}
<form [formGroup]="nameForm">
  <mat-form-field>
    <input matInput formControlName="name" placeholder="Enter Name" />
  </mat-form-field>
</form>
```

The async pipe magically subscribes to our observable and unsubscribes from it when the component is destroyed. [You can see this in the source code for the pipe if you're curious](https://github.com/angular/angular/blob/8.2.8/packages/common/src/pipes/async_pipe.ts#L42-L147). The great part is that we used `tap` as a side effect to talk to other parts of our component!

```typescript
  ...
    tap(() => this.nameEmitter.emit(this.nameForm.value.name)),
  ...
```
