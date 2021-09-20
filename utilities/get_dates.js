class Get_dates {
	constructor() { }

	static getDatesUsingLastDate(firstDate, lastDate, days) {
		/*
			Метод рассчитывает даты определенных дней (например: понедельник и среда) в указанном периоде.	
	
			Параметры:
				firstDate
					Строка в формате "ГГГГ-ММ-ДД"
				lastDate
					Строка в формате "ГГГГ-ММ-ДД"
				days
					Массив чисел от 0 до 6 включительно
	
			Возвращает:
				Массив дат в формате строк "ГГГГ-ММ-ДД"
		*/
		const lesson_dates = [];
		const start_date = new Date(firstDate);
		let end_date = new Date(lastDate);
		// Если разница между начальной и конечной датой больше 365 дней, то конечная дада = начальная дата + 365 дней
		if (((end_date - start_date) / 86400000) > 365) {
			end_date = new Date(firstDate);
			end_date.setDate(end_date.getDate() + 365);
		}
		let lesson_date = start_date;
		if (days.includes(lesson_date.getDay())) {
			let lesson_date_str = lesson_date.toISOString().split('T')[0];
			lesson_dates.push(lesson_date_str);
		}


		while (lesson_date < end_date) {
			let lesson_day = lesson_date.getDay();
			let i = 0;
			while (i < (days.length)) {
				let days_to_add;
				lesson_day = lesson_date.getDay();
				if (days[i] > lesson_day) {
					days_to_add = days[i] - lesson_day;
					lesson_date.setDate(lesson_date.getDate() + days_to_add);
					if (lesson_date > end_date) {
						break;
					}
					// Максимум будет создано 300 уроков
					if (lesson_dates.length === 300) {
						return lesson_dates;
					}
					let lesson_date_str = lesson_date.toISOString().split('T')[0];
					lesson_dates.push(lesson_date_str);
				}
				if (i === (days.length - 1)) {
					days_to_add = 7 - days[i] + days[0];
					lesson_date.setDate(lesson_date.getDate() + days_to_add);
					if (lesson_date > end_date) {
						break;
					}
					// Максимум будет создано 300 уроков
					if (lesson_dates.length === 300) {
						return lesson_dates;
					}
					let lesson_date_str = lesson_date.toISOString().split('T')[0];
					lesson_dates.push(lesson_date_str);
				}
				i++;

			}
		}
		return lesson_dates;
	}


	static getDatesUsingLessonCount(firstDate, lessonsCount, days) {
		/*
			Метод рассчитывает запрашиваемое количество дат определенных дней (например: понедельник и среда)
			начиная с указанной даты.

			Параметры:
				firstDate
					Начальная дата (Строка в формате "ГГГГ-ММ-ДД")
				lessonsCount
					Число
				days
					Массив чисел от 0 до 6 включительно

			Возвращает:
				Массив дат в формате строк "ГГГГ-ММ-ДД"
		*/

		const lesson_dates = [];
		if (lessonsCount === 0) {
			return lesson_dates;
		}
		const start_date = new Date(firstDate);
		let lesson_date = start_date;
		if (days.includes(lesson_date.getDay())) {
			let lesson_date_str = lesson_date.toISOString().split('T')[0];
			lesson_dates.push(lesson_date_str);
		}


		while (lessonsCount > lesson_dates.length) {
			let lesson_day = lesson_date.getDay();
			let i = 0;
			while (i < (days.length)) {
				let days_to_add;
				lesson_day = lesson_date.getDay();
				if (days[i] > lesson_day) {
					days_to_add = days[i] - lesson_day;
					lesson_date.setDate(lesson_date.getDate() + days_to_add);
					if (lessonsCount === lesson_dates.length) {
						break;
					}
					// Максимум будет создано 300 уроков
					if (lesson_dates.length === 300) {
						return lesson_dates;
					}
					let lesson_date_str = lesson_date.toISOString().split('T')[0];
					lesson_dates.push(lesson_date_str);
				}
				if (i === (days.length - 1)) {
					days_to_add = 7 - days[i] + days[0];
					lesson_date.setDate(lesson_date.getDate() + days_to_add);
					if (lessonsCount === lesson_dates.length) {
						break;
					}
					// Максимум будет создано 300 уроков
					if (lesson_dates.length === 300) {
						return lesson_dates;
					}
					let lesson_date_str = lesson_date.toISOString().split('T')[0];
					lesson_dates.push(lesson_date_str);
				}
				i++;

			}
		}
		return lesson_dates;
	}



}



module.exports = Get_dates;