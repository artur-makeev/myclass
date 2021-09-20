const sequelize = require('../db');
const { DataTypes } = require('sequelize');


const Lesson = sequelize.define('lesson', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	date: { type: DataTypes.DATEONLY, allowNull: false },
	title: { type: DataTypes.STRING({ length: 100 }) },
	status: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { timestamps: false });

const Student = sequelize.define('student', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING({ length: 10 }) },
}, { timestamps: false });

const Teacher = sequelize.define('teacher', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING({ length: 10 }) },
}, { timestamps: false });

const Lesson_teacher = sequelize.define('lesson_teacher', {
	lesson_id: { type: DataTypes.INTEGER },
	teacher_id: { type: DataTypes.INTEGER },
}, { timestamps: false });
Lesson_teacher.removeAttribute('id');

const Lesson_student = sequelize.define('lesson_student', {
	lesson_id: { type: DataTypes.INTEGER },
	student_id: { type: DataTypes.INTEGER },
	visit: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { timestamps: false });
Lesson_student.removeAttribute('id');

Student.hasMany(Lesson_student, { foreignKey: 'student_id' });
Lesson_student.belongsTo(Student, { foreignKey: 'student_id' });

Lesson.hasMany(Lesson_student, { foreignKey: 'lesson_id' });
Lesson_student.belongsTo(Lesson, { foreignKey: 'lesson_id' });

Lesson.hasMany(Lesson_teacher, { foreignKey: 'lesson_id' });
Lesson_teacher.belongsTo(Lesson, { foreignKey: 'lesson_id' });

Teacher.hasMany(Lesson_teacher, { foreignKey: 'teacher_id' });
Lesson_teacher.belongsTo(Lesson, { foreignKey: 'teacher_id' });



module.exports = { Lesson, Student, Teacher, Lesson_teacher, Lesson_student };
