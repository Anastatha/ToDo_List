export default function debounce<T extends (...args: any) => any>(
	func: T,
	delay: number,
) {
	let timer: NodeJS.Timeout;
	return (...args: Parameters<T>) => {
		clearTimeout(timer);
		timer = setTimeout(() => func(...args), delay);
	};
}
