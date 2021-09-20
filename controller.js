const { response } = require('express');
const { stackTraceLimit } = require('./ApiError');
const ApiError = require('./ApiError');
const { Lesson, Lesson_student, Student, Lesson_teacher, Teacher } = require('./models/models');
const get_dates = require('./utilities/get_dates');


class Controller {

	// Задача №1
	async getData(req, res, next) {
		try {

			// Пагинация
			let { lessonsPerPage, page, date, status, teacherIds, studentsCount } = req.query;
			page = page || 1;
			let limit = lessonsPerPage || 5;
			let offset = page * limit - limit;

			// Фильтрация
			const filter = {};
			if (date) {
				filter.date = date;
			}
			if (status) {
				filter.status = status;
			}



			//Запрос к БД после фильтрации по дате, статусу
			let lessons = await Lesson.findAll({ where: { ...filter }, limit, offset });

			// Количество учеников, посетивших занятие
			for (let lesson of lessons) {
				const lesson_id = lesson.id;
				const visit = true;
				const visited = await Lesson_student.findAll({ where: { lesson_id, visit } });
				lesson.dataValues.visitCount = visited.length;
			}

			// Массив учеников, записанных на занятие
			for (const lesson of lessons) {
				const students_enrolled = [];
				const students_enrolled_ids = [];
				const lesson_id = lesson.id;
				const students_of_lesson = await Lesson_student.findAll({ where: { lesson_id } });

				for (const student of students_of_lesson) {
					students_enrolled_ids.push(student.dataValues.student_id);
				}

				for (const id of students_enrolled_ids) {
					const student = (await Student.findOne({ where: { id } })).dataValues;
					const student_id = id;
					student.visit = (await Lesson_student.findOne({ where: { student_id, lesson_id } })).dataValues.visit;
					students_enrolled.push(student);
				}
				lesson.dataValues.students = students_enrolled;
			}

			// Массив учителей, ведущих занятие
			for (let lesson of lessons) {
				const teachers_enrolled = [];
				const teachers_enrolled_ids = [];
				const lesson_id = lesson.id;
				const lessons_teachers = await Lesson_teacher.findAll({ where: { lesson_id } });
				for (let teacher of lessons_teachers) {
					teachers_enrolled_ids.push(teacher.dataValues.teacher_id);
				}
				for (const id of teachers_enrolled_ids) {
					const teacher = (await Teacher.findOne({ where: { id } })).dataValues;
					teachers_enrolled.push(teacher);
				}
				lesson.dataValues.teachers = teachers_enrolled;
			}


			return res.status(200).json(lessons);
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}

	// Задача №2
	async postData(req, res, next) {
		try {
			const { teacherIds, title, days, firstDate, lessonsCount, lastDate } = req.body;

			// Валидация
			if (!lessonsCount && !lastDate) {
				return next(ApiError.badRequest("Нужно указать либо максимальное количество уроков (lessonsCount)," +
					" либо конечную дату (lastDate)."));
			}



			// Определяем даты занятий
			let lesson_dates = [];

			if (lessonsCount) {
				// Если указано количество уроков
				lesson_dates = get_dates.getDatesUsingLessonCount(firstDate, lessonsCount, days);
			} else if (lastDate) {
				// Если указана конечная дата
				lesson_dates = get_dates.getDatesUsingLastDate(firstDate, lastDate, days);

			}

			// Записываем создаваемые уроки в таблицу lessons
			const created_lessons_ids = [];
			for (const lesson_date of lesson_dates) {

				const date = lesson_date;
				const status = 0;

				const lesson = await Lesson.create({ title, status, date });

				const lesson_id = lesson.dataValues.id;
				created_lessons_ids.push(lesson_id);

				// Записываем id уроков и учителей в таблицу lesson_teachers

				// teacher Ids может быть как массивом, так и числом

				if (Array.isArray(teacherIds)) {
					for (const teacher_id of teacherIds) {
						const teacher = await Lesson_teacher.create({ lesson_id, teacher_id });
					}
				} else {
					const teacher = await Lesson_teacher.create({ lesson_id, teacher_id: teacherIds });
				}

			}






			return res.status(200).json(created_lessons_ids);

		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}




	/*
	{
		teacherIds: [1,2], // id учителей, ведущих занятия
		title: ‘Blue Ocean’, // Тема занятия. Одинаковая на все создаваемые занятия
		days: [0,1,3,6], // Дни недели, по которым нужно создать занятия, где 0 - это воскресенье
		firstDate: ‘2019-09-10’, // Первая дата, от которой нужно создавать занятия
		lessonsCount: 9, // Количество занятий для создания
		lastDate: ‘2019-12-31’, // Последняя дата, до которой нужно создавать занятия.
	}

	req.body
	{
	"teacherIds": [1,2], +
	"title": "Blue Ocean", +
	"days": [0, 1, 3, 6], +
	"firstDate": "2019-09-10", +
	"lessonsCount": 9, +
	"lastDate": "2019-12-31" +

	}
	*/


}

module.exports = new Controller();

