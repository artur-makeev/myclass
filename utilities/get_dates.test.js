/* jshint ignore:start */

const get_dates = require('./Get_dates');


// Тесты метода getDatesUsingLastDate

test('Gives dates of Tuesdays and Sundays betweet 2021-09-19 and 2021-09-19 (included)', () => {
	expect(get_dates.getDatesUsingLastDate('2021-09-19', '2021-09-19', [0, 2])).toStrictEqual(['2021-09-19']);
});

test('Gives dates of Tuesdays and Sundays betweet 2021-09-19 and 2021-10-03 (included)', () => {
	expect(get_dates.getDatesUsingLastDate('2021-09-19', '2021-10-03', [0, 2])).toStrictEqual(['2021-09-19', '2021-09-21', '2021-09-26', '2021-09-28', '2021-10-03']);
});


// Тесты метода getDatesUsingLessonCount

test('Gives dates of 1 day (Tuesdays and Sundays) starting on 2021-09-19 (included)', () => {
	expect(get_dates.getDatesUsingLessonCount('2021-09-19', 1, [0, 2])).toStrictEqual(['2021-09-19']);
});

test('Gives dates of 0 days (Tuesdays and Sundays) starting on 2021-09-19 (included)', () => {
	expect(get_dates.getDatesUsingLessonCount('2021-09-19', 0, [0, 2])).toStrictEqual([]);
});

test('Gives dates of 5 days (Tuesdays and Sundays) starting on 2021-09-19 (included)', () => {
	expect(get_dates.getDatesUsingLessonCount('2021-09-19', 5, [0, 2])).toStrictEqual(['2021-09-19', '2021-09-21', '2021-09-26', '2021-09-28', '2021-10-03']);
});




/* jshint ignore:end */