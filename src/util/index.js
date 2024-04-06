export const callbackWithMinDuration = (fn, initTime, minRunTime = 3000) => {
	const currTime = Date.now();
	const buffer = minRunTime - (currTime - (initTime === true ? Date.now() : initTime));
	setTimeout(() => fn(), buffer >= 0 ? buffer : 0);
};
