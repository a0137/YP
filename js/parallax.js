const hero = document.querySelector('.hero');
const father = document.querySelector('.father');
const darth = document.querySelector('.darth');
const son = document.querySelector('.son');
const duration = 1000; // Длительность затухания после остановки мыши (в миллисекундах)
const step = 10; // Шаг перемещения элементов (чем меньше, тем плавнее затухание)
const maxMovement = 30; // Максимальное перемещение

let isMouseMoving = false; // Флаг для отслеживания движения мыши
let mouseMoveTimestamp = 0; // Временная метка последнего движения мыши

hero.addEventListener('mousemove', (e) => {
	const currentTime = new Date().getTime();
	const timeSinceMouseMove = currentTime - mouseMoveTimestamp;

	if (timeSinceMouseMove > duration) {
		// Если мышь не двигалась длительное время, сбрасываем флаг
		isMouseMoving = false;
	} else {
		isMouseMoving = true;
	}

	const x = (e.clientX / window.innerWidth) * maxMovement; // Увеличиваем перемещение
	const curvature = 0.5; // Изгиб параллакса (чем больше, тем сильнее изгиб)

	moveImages(x, curvature);

	// Обновляем временную метку последнего движения мыши
	mouseMoveTimestamp = currentTime;
});

function moveImages(x, curvature) {
	// Используем функцию изгиба (easing) для более плавного движения
	const easing = curvature * Math.sin(x / 100); // Здесь вы можете настроить изгиб
	// Добавляем текущее значение scaleX и изгиб к новому transform
	father.style.transform = `scaleX(-1) translate(${x + easing}px, 0)`;
	darth.style.transform = `scaleX(-1) translate(${(x / 2) + easing}px, 0)`;
	son.style.transform = `scaleX(-1) translate(${(x / 3) + easing}px, 0)`;

	if (!isMouseMoving) {
		// Если мышь не двигается, продолжаем затухание
		const currentTransform = getComputedStyle(father).transform;
		const matrix = new DOMMatrix(currentTransform);
		const currentX = matrix.m41;

		if (Math.abs(currentX) < step) {
			// Если достигнуто начальное положение, завершаем затухание
			return;
		}

		requestAnimationFrame(() => {
			// Продолжаем затухание через requestAnimationFrame
			const newX = currentX > 0 ? currentX - step : currentX + step;
			moveImages(newX, 0); // Используем изгиб 0 для плавного затухания
		});
	}
}

// Добавляем обработчик события для остановки затухания при наведении мыши
hero.addEventListener('mouseenter', () => {
	isMouseMoving = true; // Устанавливаем флаг, чтобы остановить затухание
});

hero.addEventListener('mouseleave', () => {
	isMouseMoving = false; // Сбрасываем флаг, чтобы продолжить затухание
	mouseMoveTimestamp = new Date().getTime(); // Обновляем временную метку
});
