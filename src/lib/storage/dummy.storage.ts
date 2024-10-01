export const dummyStorage: Storage = {
	length: 0,
	clear: function (): void {},
	getItem: function (): string | null {
		return '';
	},
	key: function (): string | null {
		return null;
	},
	removeItem: function (): void {},
	setItem: function (): void {}
};
