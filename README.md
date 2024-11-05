# Svelte Store Class

It provides a wrapper for Svelte store.

## Example

This is a simple example of a **store class for a todo app**

```typescript
// todo.store.ts
import { writable } from 'svelte/store';
import { SvelteStore } from 'svelte-store-class';

export class TodoModel extends SvelteStore<TodoModel> {
	protected store = writable(this as TodoModel);
	constructor() {
		super();
	}
}
```

- As shown above, we prepare a class to store the state of a typical `Todo app`.
- This is the minimum implementation required to function as a Svelte Store.

We add implementations necessary to manage TODO items.

```typescript
// todo.store.ts
import { writable } from 'svelte/store';

export class TodoItem {
	constructor(readonly label: string) {}
}

export class TodoModel extends SvelteStore<TodoModel> {
	protected store = writable(this as TodoModel);
	constructor(readonly items: TodoItem[] = []) {
		super();
	}
}
```

## View

In a Svelte component, use it as follows:

```html
<script>
	import { TodoModel } from './todo.store.js';

	const todo = new TodoModel();
</script>

<ul>
	{#each $todo.items as item}
	<li>{item.label}</li>
	{/each}
</ul>
```

- The variable `todo` is an instance of the class and also acts as a svelte store.

Implement the functionality to add a Todo item.

```typescript
// todo.store.ts
...

export class TodoModel extends SvelteStore<TodoModel> {
	protected store = writable(this as TodoModel);
	constructor(readonly items: TodoItem[] = []) {
		super();
	}
	addItem(itemLabel: string) {
		this.items.push(new TodoItem(itemLabel));
		this.update(); // (+)
	}
}
```

- `this.update()` - Internally calls `store.update(...)`.

Implement the functionality to add a Todo item in the UI.

```html
<script>
	import { TodoModel } from './todo.store.js';

	const todo = new TodoModel();

	function addItem() {
		const label = 'This is a todo item';
		todo.addItem(label);
	}
</script>

<button on:click="{addItem}">New Item</button>
<ul>
	{#each $todo.items as item}
	<li>{item.label}</li>
	{/each}
</ul>
```

By inheriting from **SvelteStore**, the custom store instance hides the store object and increases programming flexibility.

---

Tranlated by chatgpt
