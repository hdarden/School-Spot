// Creating our Task model
module.exports = function (sequelize, DataTypes) {
	var Task = sequelize.define("Task", {
		taskDetail: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		dueDate: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		completed: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		graded: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		taskGrade: {
			type: DataTypes.DECIMAL(5,2),
			allowNull: true,
		}
	});
	// Student has many Tasks
	User.hasMany(Task, {as: "Tasks"});
};