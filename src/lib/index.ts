import { type Subscriber, type Writable } from 'svelte/store';
export type { WebStorageWrapper } from './storage/browser.storage';
export { local, session } from './storage/browser.storage';
const dummy: () => void = () => {};
const updateStore = <T>(store: Writable<T>, callback: (state: T) => void) => {
	store.update((state) => {
		callback(state);
		return state;
	});
};

export abstract class SvelteStore<T> {
	protected abstract store: Writable<T>;
	constructor() {}
	subscribe(callback: Subscriber<T>) {
		return this.store.subscribe(callback);
	}
	update(callback?: (state: T) => void) {
		updateStore(this.store, callback || dummy);
	}
	protected set<T extends SvelteStore<T>>() {
		this.update();
	}
}
